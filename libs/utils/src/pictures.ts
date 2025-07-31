import * as exifr from "exifr";

export async function fixImageOrientation(file: File): Promise<Blob | File> {
  const orientation = await exifr.orientation(file);

  if (typeof orientation !== "number" || orientation === 1) {
    return file;
  }

  const imageBitmap = await createImageBitmap(file);
  const autoOriented = isAutoOriented(imageBitmap, orientation);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Impossible d'obtenir le contexte 2D du canvas.");

  if (autoOriented) {
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    ctx.drawImage(imageBitmap, 0, 0);
  } else {
    applyManualOrientation(ctx, canvas, imageBitmap, orientation);
  }

  return await new Promise<Blob | File>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        const fallbackBlob = dataURLToBlob(canvas.toDataURL(file.type));
        resolve(fallbackBlob ?? file);
      }
    }, file.type);
  });
}

function isAutoOriented(bitmap: ImageBitmap, orientation: number): boolean {
  if (orientation === 6 || orientation === 8) {
    return bitmap.height > bitmap.width;
  }

  if (orientation === 5 || orientation === 7) {
    return bitmap.height > bitmap.width;
  }

  if (orientation === 2 || orientation === 4) {
    return true;
  }

  return false;
}

function applyManualOrientation(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  image: ImageBitmap,
  orientation: number,
) {
  const width = image.width;
  const height = image.height;

  switch (orientation) {
    case 2: {
      canvas.width = width;
      canvas.height = height;
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      break;
    }
    case 3: {
      canvas.width = width;
      canvas.height = height;
      ctx.translate(width, height);
      ctx.rotate(Math.PI);
      break;
    }
    case 4: {
      canvas.width = width;
      canvas.height = height;
      ctx.translate(0, height);
      ctx.scale(1, -1);
      break;
    }
    case 5: {
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(Math.PI / 2);
      ctx.translate(0, -height);
      ctx.scale(1, -1);
      break;
    }
    case 6: {
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(Math.PI / 2);
      ctx.translate(0, -height);
      break;
    }
    case 7: {
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(Math.PI / 2);
      ctx.translate(0, -height);
      ctx.scale(-1, 1);
      break;
    }
    case 8: {
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(-Math.PI / 2);
      ctx.translate(-width, 0);
      break;
    }
    default: {
      canvas.width = width;
      canvas.height = height;
      break;
    }
  }

  ctx.drawImage(image, 0, 0);
}

function dataURLToBlob(dataURL: string): Blob | null {
  const parts = dataURL.split(",");
  const byteString = atob(parts[1]);
  const mime = /:(.*?);/.exec(parts[0])?.[1] ?? "image/jpeg";
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    const codePoint = byteString.codePointAt(i);
    ia[i] = codePoint ?? 0;
  }

  return new Blob([ab], { type: mime });
}

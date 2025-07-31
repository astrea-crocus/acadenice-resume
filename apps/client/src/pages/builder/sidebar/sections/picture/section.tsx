import { t } from "@lingui/macro";
import { Aperture, Trash, UploadSimple } from "@phosphor-icons/react";
import {
  Avatar,
  AvatarImage,
  buttonVariants,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@reactive-resume/ui";
import { cn, fixImageOrientation } from "@reactive-resume/utils";
import { motion } from "framer-motion";
import { useMemo, useRef } from "react";
import { z } from "zod";

import { useUploadImage } from "@/client/services/storage";
import { useResumeStore } from "@/client/stores/resume";

import { PictureOptions } from "./options";

export const PictureSection = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useUploadImage();

  const setValue = useResumeStore((state) => state.setValue);
  const picture = useResumeStore((state) => state.resume.data.basics.picture);

  const isValidUrl = useMemo(() => z.string().url().safeParse(picture.url).success, [picture.url]);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 Mo
  const ALLOWED_TYPES = new Set(["image/png", "image/jpeg"]);

  const onSelectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // eslint-disable-next-line no-console
    console.log("Début de onSelectImage", file);

    if (!file) return;

    // Vérifie le type MIME
    if (!ALLOWED_TYPES.has(file.type)) {
      alert(t`Format d'image non supporté. Utilisez PNG, JPG ou JPEG.`);
      return;
    }

    // Vérifie la taille du fichier
    if (file.size > MAX_FILE_SIZE) {
      alert(t`Image trop volumineuse. Taille maximale : 5 Mo.`);
      return;
    }

    try {
      // Corrige l’orientation (JPEG uniquement)
      const correctedBlob = file.type === "image/jpeg" ? await fixImageOrientation(file) : file;

      // Si le blob a été corrigé, on le retransforme en File
      const correctedFile =
        correctedBlob instanceof Blob && !(correctedBlob instanceof File)
          ? new File([correctedBlob], file.name, {
              type: file.type,
              lastModified: file.lastModified,
            })
          : correctedBlob;

      const response = await uploadImage(correctedFile);
      const url = response.data;

      setValue("basics.picture.url", url);
    } catch {
      alert(t`Une erreur est survenue lors de l'envoi de l'image.`);
    }
  };

  const onAvatarClick = () => {
    if (isValidUrl) {
      setValue("basics.picture.url", "");
    } else {
      inputRef.current?.click();
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <div className="group relative cursor-pointer" onClick={onAvatarClick}>
        <Avatar className="size-14 bg-secondary">
          <AvatarImage src={picture.url} alt="" />
        </Avatar>

        {isValidUrl ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-background/30 opacity-0 transition-opacity group-hover:opacity-100">
            <Trash size={16} weight="bold" />
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-background/30 opacity-0 transition-opacity group-hover:opacity-100">
            <UploadSimple size={16} weight="bold" />
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-y-1.5">
        <Label htmlFor="basics.picture.url">{t`Picture`}</Label>
        <div className="flex items-center gap-x-2">
          <input ref={inputRef} hidden type="file" onChange={onSelectImage} />

          <Input
            id="basics.picture.url"
            placeholder="https://..."
            value={picture.url}
            onChange={(event) => {
              setValue("basics.picture.url", event.target.value);
            }}
          />

          {isValidUrl && (
            <Popover>
              <PopoverTrigger asChild>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
                >
                  <Aperture />
                </motion.button>
              </PopoverTrigger>
              <PopoverContent className="w-[360px]">
                <PictureOptions />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

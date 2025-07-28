import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@reactive-resume/utils";
import { forwardRef } from "react";

export const Slider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
      <SliderPrimitive.Range className="absolute h-full bg-acade-secondary-500" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block size-5 rounded-full border-2 transition-colors disabled:pointer-events-none disabled:opacity-50",
        "border-acade-secondary-500 bg-background ring-offset-background focus-visible:ring-acade-secondary-500",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      )}
    />
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

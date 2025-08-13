import { forwardRef } from "react";

import { BASE_URL } from "@/preview/constants";

type BrandIconProps = {
  slug: string;
};

export const BrandIcon = forwardRef<HTMLImageElement, BrandIconProps>(({ slug }, ref) => {
  if (slug === "linkedin") {
    return (
      <img
        ref={ref}
        alt="LinkedIn"
        className="size-4"
        src={`${BASE_URL}/support-logos/linkedin.svg`}
      />
    );
  }

  return (
    <img ref={ref} alt={slug} className="size-4" src={`https://cdn.simpleicons.org/${slug}`} />
  );
});

BrandIcon.displayName = "BrandIcon";

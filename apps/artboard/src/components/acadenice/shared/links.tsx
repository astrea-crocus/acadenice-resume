import type { URL } from "@reactive-resume/schema";
import { cn, isUrl } from "@reactive-resume/utils";

/**
 * Link
 *
 * Composant utilitaire pour afficher un lien externe avec une icône.
 * - Affiche une icône à gauche ou à droite du lien selon la prop iconOnRight.
 * - Si aucune icône n'est fournie, une icône de lien par défaut est utilisée.
 * - Le label du lien peut être personnalisé, sinon l'URL ou son label est affiché.
 * - La classe CSS peut être personnalisée via la prop className.
 *
 * Props :
 * - url : Objet URL à utiliser pour le lien.
 * - icon : Icône à afficher (optionnelle).
 * - iconOnRight : Place l'icône à droite du texte si true.
 * - label : Texte à afficher pour le lien (optionnel).
 * - className : Classe CSS optionnelle pour personnaliser le style.
 */

type LinkProps = {
  url: URL;
  icon?: React.ReactNode;
  iconOnRight?: boolean;
  label?: string;
  className?: string;
};

export const Link = ({ url, icon, iconOnRight, label, className }: LinkProps) => {
  if (!isUrl(url.href)) return null;

  return (
    <div className="flex items-center gap-x-1.5">
      {/* Icône à gauche si iconOnRight est false */}
      {!iconOnRight &&
        (icon ?? (
          <i aria-hidden className="ph ph-bold ph-link text-primary group-[.sidebar]:text-white" />
        ))}
      <a
        href={url.href}
        target="_blank"
        rel="noreferrer noopener nofollow"
        className={cn("inline-block", className)}
      >
        {label ?? (url.label || url.href)}
      </a>
      {/* Icône à droite si iconOnRight est true */}
      {iconOnRight &&
        (icon ?? (
          <i aria-hidden className="ph ph-bold ph-link text-primary group-[.sidebar]:text-white" />
        ))}
    </div>
  );
};

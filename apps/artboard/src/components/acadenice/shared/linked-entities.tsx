import type { URL } from "@reactive-resume/schema";
import { isUrl } from "@reactive-resume/utils";

import { Link } from "./links";

/**
 * LinkedEntity
 *
 * Composant utilitaire pour afficher un nom d'entité (ex : entreprise, école, éditeur)
 * avec un lien externe si une URL est fournie.
 *
 * - Si `separateLinks` est false et que l'URL est valide, le nom est affiché comme un lien cliquable avec une icône globe.
 * - Sinon, le nom est affiché en texte simple.
 *
 * Props :
 * - name : Nom de l'entité à afficher.
 * - url : Objet URL à utiliser pour le lien.
 * - separateLinks : Si true, le lien est affiché séparément (utilisé dans certains templates).
 * - className : Classe CSS optionnelle pour personnaliser le style.
 */

type LinkedEntityProps = {
  name: string;
  url: URL;
  separateLinks: boolean;
  className?: string;
};

export const LinkedEntity = ({ name, url, separateLinks, className }: LinkedEntityProps) => {
  return !separateLinks && isUrl(url.href) ? (
    <Link
      url={url}
      label={name}
      icon={<i aria-hidden className="ph ph-bold ph-globe text-primary" />}
      iconOnRight={true}
      className={className}
    />
  ) : (
    <div className={className}>{name}</div>
  );
};

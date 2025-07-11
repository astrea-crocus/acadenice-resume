import { cn } from "@reactive-resume/utils";

/**
 * Rating
 *
 * Composant utilitaire pour afficher un niveau sous forme de points (ex : compétences, langues).
 * - Affiche 5 points alignés horizontalement.
 * - Les points remplis (colorés) correspondent au niveau passé en prop (level).
 * - Personnalise le style via Tailwind et la classe group-[.sidebar] pour l'affichage en sidebar.
 *
 * Props :
 * - level : Nombre de points à remplir (de 0 à 5).
 */

type RatingProps = { level: number };

export const Rating = ({ level }: RatingProps) => (
  <div className="flex items-center gap-x-1.5">
    {Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className={cn(
          "size-2 rounded-full border border-primary group-[.sidebar]:border-background",
          level > index && "bg-primary group-[.sidebar]:bg-background",
        )}
      />
    ))}
  </div>
);

import { cn, isUrl } from "@reactive-resume/utils";

/**
 * Composants utilitaires pour l'en-tête du CV
 *
 * Ces composants permettent d'afficher le nom, le titre, les informations principales
 * et les champs personnalisés dans l'en-tête du CV. Ils sont conçus pour être réutilisables
 * et facilement personnalisables via les props ou les classes CSS.
 */

// Props génériques pour les blocs de texte (nom, titre, etc.)
type TextProps = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Name
 * Affiche le nom du candidat avec une taille et un style prédéfinis.
 * Personnalise la classe via la prop className si besoin.
 */
export const Name: React.FC<TextProps> = ({ className, children }) => (
  <div className={cn("text-2xl font-bold", className)}>{children}</div>
);

/**
 * Headline
 * Affiche le titre ou la fonction du candidat.
 * Personnalise la classe via la prop className si besoin.
 */
export const Headline: React.FC<TextProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

// Props pour un item d'information (ex : email, téléphone, localisation)
type InfoItemProps = {
  icon: string; // Nom de l'icône à afficher (phosphor-icons)
  children: React.ReactNode;
  className?: string;
};

/**
 * InfoItem
 * Affiche une information avec une icône à gauche.
 * Utilisé pour les coordonnées, la localisation, etc.
 */
export const InfoItem: React.FC<InfoItemProps> = ({ icon, children, className }) => (
  <div className={cn("flex items-center gap-x-1.5", className)}>
    <i aria-hidden className={cn(`ph ph-bold ph-${icon}`, "text-primary")} />
    {children}
  </div>
);

/**
 * CustomFieldItem
 * Affiche un champ personnalisé dans l'en-tête (ex : site web, portfolio, autre info).
 * Si la valeur est une URL, elle est affichée comme lien cliquable.
 * Sinon, le nom et la valeur sont affichés en texte simple.
 */
export const CustomFieldItem: React.FC<{
  icon: string;
  name?: string;
  value: string;
}> = ({ icon, name, value }) => (
  <InfoItem icon={icon}>
    {isUrl(value) ? (
      <a href={value} target="_blank" rel="noreferrer noopener nofollow">
        {name ?? value}
      </a>
    ) : (
      <span>{[name, value].filter(Boolean).join(": ")}</span>
    )}
  </InfoItem>
);

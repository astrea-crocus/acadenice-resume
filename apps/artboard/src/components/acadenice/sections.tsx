/**
 * Composants utilitaires pour afficher les sections du CV
 *
 * Ce fichier propose des composants réutilisables pour structurer chaque section du CV :
 * - SectionTitle : Titre de section stylisé.
 * - SectionContent : Conteneur en grille pour organiser les éléments d'une section.
 * - Section : Composant générique pour afficher une section complète avec ses items.
 *
 * Personnalise le rendu de chaque section en passant des props ou en modifiant les composants.
 */

import type { CustomSectionGroup, SectionWithItem, URL } from "@reactive-resume/schema";
import { cn, isEmptyString, sanitize } from "@reactive-resume/utils";
import get from "lodash.get";

import { Link } from "./shared/links";
import { Rating } from "./shared/ratings";

// Props pour le titre de section (ex : "Expérience", "Formation")
type SectionTitleProps = {
  className?: string;
  children: React.ReactNode;
};

/**
 * SectionTitle
 * Affiche le titre d'une section avec un style prédéfini.
 * Personnalise la classe via la prop className si besoin.
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({ className, children }) => (
  <h4 className={cn("mb-2 border-b pb-0.5 text-sm font-bold", className)}>{children}</h4>
);

// Props pour le contenu d'une section (grille d'items)
type SectionContentProps = {
  className?: string;
  columns?: number;
  children: React.ReactNode;
};

/**
 * SectionContent
 * Conteneur en grille pour organiser les éléments d'une section.
 * Définit le nombre de colonnes via la prop columns.
 */
export const SectionContent: React.FC<SectionContentProps> = ({ className, columns, children }) => (
  <div
    className={cn("grid gap-x-6 gap-y-3", className)}
    style={{ gridTemplateColumns: columns ? `repeat(${columns}, 1fr)` : undefined }}
  >
    {children}
  </div>
);

// Props pour le composant Section générique
type SectionProps<T> = {
  section: SectionWithItem<T> | CustomSectionGroup;
  children?: (item: T) => React.ReactNode;
  className?: string;
  urlKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
};

/**
 * Section
 * Composant générique pour afficher une section du CV (ex : expériences, diplômes, compétences).
 * Personnalise la structure, le style ou les champs affichés via les props et le rendu des items.
 * Utilise SectionTitle et SectionContent pour organiser le contenu.
 */
export const Section = <T,>({
  section,
  children,
  className,
  urlKey,
  levelKey,
  summaryKey,
  keywordsKey,
}: SectionProps<T>) => {
  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id}>
      <SectionTitle>{section.name}</SectionTitle>

      <SectionContent columns={section.columns}>
        {section.items
          .filter((item) => item.visible)
          .map((item) => {
            // Récupère les propriétés optionnelles pour chaque item
            const url = (urlKey && get(item, urlKey)) as URL | undefined;
            const level = (levelKey && get(item, levelKey, 0)) as number | undefined;
            const summary = (summaryKey && get(item, summaryKey, "")) as string | undefined;
            const keywords = (keywordsKey && get(item, keywordsKey, [])) as string[] | undefined;

            return (
              <div key={item.id} className={cn("space-y-2", className)}>
                <div>
                  {/* Affiche le contenu personnalisé de l'item */}
                  {children?.(item as T)}
                  {/* Affiche le lien externe si séparé */}
                  {url && section.separateLinks && <Link url={url} />}
                </div>

                {/* Affiche le résumé si présent */}
                {summary && !isEmptyString(summary) && (
                  <div
                    dangerouslySetInnerHTML={{ __html: sanitize(summary) }}
                    className="wysiwyg group-[.sidebar]:prose-invert"
                  />
                )}

                {/* Affiche la note/évaluation si présente */}
                {level !== undefined && level > 0 && <Rating level={level} />}

                {/* Affiche les mots-clés si présents */}
                {keywords && keywords.length > 0 && (
                  <p className="text-sm">{keywords.join(", ")}</p>
                )}
              </div>
            );
          })}
      </SectionContent>
    </section>
  );
};

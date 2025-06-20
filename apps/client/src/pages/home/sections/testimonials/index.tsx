/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */

import { Quotes } from "@phosphor-icons/react";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";

const url = "https://acadenice.fr/parcours-de-formation/";

type Testimonial = {
  quote: string;
  name: string;
};

const testimonials: Testimonial[][] = [
  [
    {
      name: "Lucas Martin",
      quote:
        "Grâce à l’outil de création de CV d’AcadéNice, j’ai pu faire un CV clair et professionnel en un rien de temps. J’ai décroché une alternance en marketing facilement !",
    },
    {
      name: "Léna Dubois",
      quote:
        "Je n’avais jamais vraiment su comment structurer mon CV. Ce site m’a vraiment simplifié la tâche et m’a aidée à valoriser mes compétences comme il faut.",
    },
    {
      name: "Mathis Rossi",
      quote:
        "J’ai adoré la simplicité du générateur. En quelques clics, mon CV était prêt et compatible avec les logiciels de recrutement. Merci AcadéNice !",
    },
  ],
  [
    {
      name: "Chloé Morel",
      quote:
        "J’ai trouvé un stage rapidement grâce au CV que j’ai créé ici. Le site est super intuitif, parfait pour les étudiants comme nous.",
    },
    {
      name: "Antoine Lefebvre",
      quote:
        "Ce que j’ai aimé, c’est qu’on est guidés étape par étape. Même sans expérience, j’ai pu faire un CV propre qui a plu aux recruteurs.",
    },
  ],
  [
    {
      name: "Manon Bouchard",
      quote:
        "Merci AcadéNice pour cet outil qui m’a vraiment aidée à structurer mon CV. J’ai eu plusieurs réponses positives après l’avoir utilisé.",
    },
    {
      name: "Thomas Garcia",
      quote:
        "Simple, rapide, efficace. Le générateur d’AcadéNice m’a permis de créer un CV professionnel sans stress. Je recommande à tous les étudiants !",
    },
    {
      name: "Sarah Nguyen",
      quote:
        "Je suis impressionnée par la facilité d’utilisation. Le site m’a guidée pour créer un CV compatible ATS, ce qui m’a aidée à trouver mon premier emploi.",
    },
  ],
];

export const TestimonialsSection = () => (
  <section id="testimonials" className="container relative space-y-12 py-24 sm:py-32">
    <div className="space-y-6 text-center">
      <h1 className="text-4xl font-bold">Témoignages</h1>
      <h3 className="text-xl">
        Ils étaient étudiants à AcadéNice, ils ont testé l’outil CV, et voici ce qu’ils en pensent.
      </h3>
      <p className="mx-auto max-w-2xl leading-relaxed">
        Pour en savoir plus sur les formations proposées par AcadéNice, c'est{" "}
        <a href={url} className="underline">
          ici
        </a>{" "}
        !
      </p>
    </div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-y-0">
      {testimonials.map((columnGroup, groupIndex) => (
        <div key={groupIndex} className="space-y-8">
          {columnGroup.map((testimonial, index) => (
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0, transition: { delay: index * 0.25 } }}
              className={cn(
                "relative overflow-hidden rounded-lg bg-primary p-5 text-primary-foreground shadow-lg",
                index > 0 && "hidden lg:block",
              )}
            >
              <Quotes size={64} className="absolute -right-3 bottom-0 opacity-20" />
              <blockquote className="italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 font-medium">{testimonial.name}</figcaption>
            </motion.figure>
          ))}
        </div>
      ))}
    </div>
  </section>
);

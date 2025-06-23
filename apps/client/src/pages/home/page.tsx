/* eslint-disable lingui/no-unlocalized-strings */
import { Helmet } from "react-helmet-async";

// import { ContributorsSection } from "./sections/contributors";
import { FAQSection } from "./sections/faq";
// import { FeaturesSection } from "./sections/features";
import { HeroSection } from "./sections/hero";
// import { LogoCloudSection } from "./sections/logo-cloud";
// import { StatisticsSection } from "./sections/statistics";
// import { SupportSection } from "./sections/support";
import { TemplatesSection } from "./sections/templates";
import { TestimonialsSection } from "./sections/testimonials";

export const HomePage = () => {
  return (
    <main className="relative isolate bg-background">
      <Helmet prioritizeSeoTags>
        <title>AcadéNice - Créer son CV en ligne</title>

        <meta
          name="description"
          content="Créer votre CV en ligne avec AcadéNice et son génerateur de CV !"
        />
      </Helmet>

      <HeroSection />
      {/* <LogoCloudSection /> */}
      {/* <StatisticsSection /> */}
      {/* <FeaturesSection /> */}
      <TemplatesSection />
      <TestimonialsSection />
      {/* <SupportSection /> */}
      <FAQSection />
      {/* <ContributorsSection /> */}
    </main>
  );
};

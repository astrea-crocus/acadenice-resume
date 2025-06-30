import { t } from "@lingui/macro";

// import { Link } from "react-router";
import { Copyright } from "@/client/components/copyright";
import { LocaleSwitch } from "@/client/components/locale-switch";
// import { Logo } from "@/client/components/logo";
import { ThemeSwitch } from "@/client/components/theme-switch";

export const Footer = () => (
  <footer className="bg-background">
    <div className="container grid py-12 sm:grid-cols-3 lg:grid-cols-4">
      <div className="flex flex-col gap-y-2">
        {/* <Logo size={96} className="-ml-2" /> */}
        <img src="/logo/logo.png" alt="" height={96} className="rounded-sm" />

        <a href="https://acadenice.fr/">
          <h2 className="text-xl font-medium">{t`AcadéNice`}</h2>
        </a>

        <Copyright className="mt-6" />
      </div>

      <div className="relative col-start-4 flex flex-col items-end justify-end">
        {/* <div className="mb-14 space-y-6 text-right">
          <Link to="/meta/privacy-policy" className="block text-sm font-medium">
            Politique de confidentialité
          </Link>
        </div> */}

        <div className="absolute bottom-0 right-0 lg:space-x-2">
          <LocaleSwitch />
          <ThemeSwitch />
        </div>
      </div>
    </div>
  </footer>
);

import { Link } from "react-router";

import { Logo } from "@/client/components/logo";

const size = 48;
const fadeClass = "animate-fade-in";

export const AnimatedLogo = () => {
  return (
    <Link to="/" aria-label="homepage">
      {/* Desktop XL logo */}
      <img
        src="/logo/teal.png"
        alt=""
        width={size}
        height={size}
        className={`hidden xl:block ${fadeClass}`}
      />

      {/* Logo SVG for LG screens */}
      <Logo size={size} className={`hidden lg:block xl:hidden ${fadeClass}`} />

      {/* Mobile logo */}
      <img
        src="/logo/light.png"
        alt=""
        width={size}
        height={size}
        className={`lg:hidden ${fadeClass}`}
      />
    </Link>
  );
};

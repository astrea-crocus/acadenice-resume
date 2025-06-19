/* eslint-disable lingui/no-unlocalized-strings */
import { Button } from "@reactive-resume/ui";
import { Link } from "react-router";

import { useLogout } from "@/client/services/auth";
import { useAuthStore } from "@/client/stores/auth";

export const HeroCTA = () => {
  const { logout } = useLogout();

  const isLoggedIn = useAuthStore((state) => !!state.user);

  if (isLoggedIn) {
    return (
      <>
        <Button asChild size="lg">
          <Link to="/dashboard">Panneau de contrôle</Link>
        </Button>

        <Button size="lg" variant="link" onClick={() => logout()}>
          Se déconnecter
        </Button>
      </>
    );
  }

  return (
    <>
      <Button asChild size="lg">
        <Link to="/auth/login">Se connecter</Link>
      </Button>

      <Button size="lg">
        <Link to="/auth/register">S'inscrire</Link>
      </Button>
    </>
  );
};

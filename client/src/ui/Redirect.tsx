import { useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// U kojim rutama se koristi ova komponenta
// - /prijava

// Cemu sluzi ova komponenta?
// - Da redirektuje ulogovane usere sa login/signup stranice

// Korisnik ne treba da moze da pristupi login/singup ukoliko je ulogovan
// - Kako ovo mogu da proverim, ne mogu preko useUserData jer pravi asinhroni zahtev za dovhatanjem korisnikovih podataka
// - Resenje je da proveravam da li podaci postoje u react query cache-u
// Da bi korisnik mogao da pristupi login/singup

type Props = {
  children: ReactNode;
};

export default function Redirect({ children }: Props): ReactNode {
  const queryClient = useQueryClient();
  const cachedUser = queryClient.getQueryData(["user"]);

  if (cachedUser) {
    // ako postoje podaci o useru onda radi redirect
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
}

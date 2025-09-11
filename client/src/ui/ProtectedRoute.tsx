import { ReactNode } from "react";
import useGetUser from "../hooks/user/useGetUser";
import { Navigate } from "react-router-dom";

type Props = {
  allowedRoles: [string];
  children: ReactNode;
};

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const { data: user } = useGetUser();

  // ako je user null onda nije ulogovan
  if (user === null) {
    // korisnik nema role, uopste nije ulogovan
    // replace je ovde koristan jer moze da se desi da korisnik pristupa /profil i onda da se uradi redirekcija na login , i onda da pokusa da klikne back strelicu u browseru i da upadne u loop redirektova
    return <Navigate replace to="/prijava" />;
  }

  // ako role ispunjava uslov onda ima pristup
  if (allowedRoles.includes(user?.role ? user.role : "")) {
    return children;
  } else {
    // ovde znam da je ulogovan ali nema dozvolu za pristup
    return <Navigate replace to="/" />;
  }
}

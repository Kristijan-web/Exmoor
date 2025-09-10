import { ReactNode } from "react";
import useGetUser from "../hooks/user/useGetUser";
import { Navigate } from "react-router-dom";

type Props = {
  allowedRoles: [string];
  children: ReactNode;
};

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const { data: user, isLoading } = useGetUser();

  // ako je user null onda nije ulogovan
  if (user === null) {
    // korisnik nema role, uopste nije ulogovan
    // replace je ovde koristan jer moze da se desi da korisnik pristupa /profil i onda da se uradi redirekcija na login , i onda da pokusa da klikne back strelicu u browseru i da upadne u loop redirektova
    return <Navigate replace to="/prijava" />;
  }

  // Zasto && pravi problem za ts a || ne?
  // - Ako je user undefined a isloading false onda se moze izvrsiti undefined.role
  if (isLoading || user === undefined) return <p>Loading...</p>;

  // ako role ispunjava uslov onda ima pristup
  if (allowedRoles.includes(user.role)) {
    return children;
  } else {
    // ovde znam da je ulogovan ali nema dozvolu za pristup
    return <Navigate replace to="/" />;
  }
}

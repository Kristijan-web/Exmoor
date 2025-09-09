import { ReactNode } from "react";
import useGetUser from "../hooks/user/useGetUser";
import { useNavigate } from "react-router-dom";

type Props = {
  allowedRoles: [string];
  children: ReactNode;
  redirectIfLoggedIn?: boolean;
};

export default function ProtectedRoute({
  allowedRoles,
  children,
  redirectIfLoggedIn,
}: Props): ReactNode {
  const { data: user, isLoading } = useGetUser();
  const navigate = useNavigate();

  // Ukoliko postoje podaci o user-u i naveden je redirectIfLoggedIn onda je zabranjen pristup stranici
  // Kada se koristi?
  // - Za login/singup stranicu gde nema smisla dati pristup ako je korisnik vec ulogovan
  if (redirectIfLoggedIn && user) {
    navigate("/");
  }

  // Zasto && pravi problem za ts a || ne?
  // - Ako je user undefined a isloading false onda se moze izvrsiti undefined.role
  if (isLoading || user === undefined) return <p>Loading...</p>;

  // ako role ispunjava uslov onda ima pristup
  if (allowedRoles.includes(user.role) || allowedRoles.includes("all")) {
    return children;
  } else {
    navigate("/");
  }
}

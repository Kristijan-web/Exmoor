import { useQuery } from "@tanstack/react-query";
import getUser from "../../services/User/getUser";

// Iskoristi type safety od ts-a

type User = {
  name: string;
  email: string;
  role: string;
  phoneNumber?: number;
  city?: string;
  postalCode?: number;
  adress?: string;
};

type GetUserResult = {
  isLoading: boolean;
  data: User | null | undefined;
};

// Zasto ts upozorava da data moze biti undefined kod return {data, isLoading} i ako sam tipizirao getUser
// - Data je undefined dok podaci ne stignu iz api call-a
// - Zato ts upozora da kada se poziva useGetUser nece se odmah imati pristup data objektu, vec ce prvo biti undefined dok podaci ne stignu

// Da li ima potrebe da tipizujem useQuery<User> ako sam tipizirao getUser funkciju?
// - Ne
function useGetUser(): GetUserResult {
  // ovde se pravi select za react query
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    // ocekuje asinhronu funkciju
    queryFn: getUser,
    // onError: (error: unknown) => {
    //   // Ovde možeš da hendlaš grešku
    //   console.error("Došlo je do greške:", error);

    //   // Ako koristiš toast
    //   // if (error instanceof AppError) toast.error(error.message);
    // },
  });

  // data je undefined dok podaci ne stignu iz api call-a
  return { data, isLoading };
}

export default useGetUser;

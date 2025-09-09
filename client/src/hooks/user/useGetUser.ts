import { useQuery } from "@tanstack/react-query";
import getUser from "../../services/User/getUser";

// Iskoristi type safety od ts-a

type User = {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
};

type GetUserResult = {
  isLoading: boolean;
  data: User | undefined;
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
  });

  // data je undefined dok podaci ne stignu iz api call-a
  return { data, isLoading };
}

export default useGetUser;

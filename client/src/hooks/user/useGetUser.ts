import { useQuery } from "@tanstack/react-query";
import getUser from "../../services/User/getUser";

// Iskoristi type safety od ts-

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

function useGetUser(): GetUserResult {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    // ocekuje asinhronu funkciju
    queryFn: getUser,
  });

  // data je undefined dok podaci ne stignu iz api call-a
  return { data, isLoading };
}

export default useGetUser;

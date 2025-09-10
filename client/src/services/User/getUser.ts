import { API_URL } from "../../utills/constants";

type User = {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
};

const getUser = async function (): Promise<User | null> {
  const fetchData = await fetch(`${API_URL}/api/v1/users/me`, {
    method: "GET",
    credentials: "include",
  });

  const response = await fetchData.json();

  if (!fetchData.ok) {
    // toast.error(response.message);

    // ako je null znaci da korisnik nije ulogovan
    return null;
  }

  return response.data;
};

export default getUser;

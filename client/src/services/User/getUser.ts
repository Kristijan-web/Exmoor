import { API_URL } from "../../utills/constants";

type User = {
  name: string;
  email: string;
  role: string;
  phoneNumber?: number;
  city?: string;
  postalCode?: number;
  adress?: string;
};

const getUser = async function (): Promise<User | null> {
  // RADIM FETCH A NEMAM TRY CATCH!!!!!
  // Ovaj getUser mora da pozove useCatchASync nekako
  const fetchData = await fetch(`${API_URL}/api/v1/users/me`, {
    method: "GET",
    credentials: "include",
  });

  const response = await fetchData.json();

  if (!fetchData.ok) {
    // toast.error(response.message);

    // ako je null znaci da korisnik nije ulogovan, to jest da nema JWT u httpOnly cookie-u
    return null;
  }

  return response.data;
};

export default getUser;

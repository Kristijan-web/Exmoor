import toast from "react-hot-toast";
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
  // Ovaj getUser mora da pozove useCatchASync nekako

  try {
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
  } catch (err) {
    toast.error("Greska u sistemu...");
    return null;
  }
};

export default getUser;

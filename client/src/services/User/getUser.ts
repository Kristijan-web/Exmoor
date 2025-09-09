import { API_URL } from "../../utills/constants";

type User = {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
};

const getUser = async function (): Promise<User> {
  const fetchData = await fetch(`${API_URL}/api/v1/users/me`, {
    method: "GET",
    credentials: "include",
  });

  const response = await fetchData.json();

  if (!fetchData.ok) {
    // Radim ovako jer sam ja radio backend i znam sta vraca u slucaju greske
    throw response;
  }

  return response.data;
};

export default getUser;

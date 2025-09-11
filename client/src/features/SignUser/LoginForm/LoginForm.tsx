import { useState } from "react";
import { API_URL } from "../../../utills/constants";
import useCatchAsync from "../../../utills/useCatchAsync";
import Loader from "../../../ui/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  isLoginActive: boolean;
};

export default function LoginForm({ isLoginActive }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Problem je sto ovde kada je uspesan login samo se upise HtppOnly cookie nigde nema setovanja podataka!!!!

  const handleSubmit = useCatchAsync(async (signal, e) => {
    e?.preventDefault();
    // api zahtev ka endpoint-u za login\
    const fetchData = await fetch(`${API_URL}/api/v1/users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      signal,
    });

    const response = await fetchData.json();

    if (!fetchData.ok) {
      // response je objekat greske
      throw response;
    }
    queryClient.setQueryData(["user"], response.data);
    toast.success("Uspesno logovanje!");
    navigate("/");
  }, setLoading);

  return (
    <div
      className={`w-full bg-white transition-all duration-400 ease-in-out md:absolute md:h-full md:w-1/2 ${isLoginActive ? "md:left-1/2 md:translate-x-0" : "md:left-1/2 md:translate-x-full"} ${isLoginActive ? "px-6 py-6 md:p-10" : "hidden"} md:block`}
    >
      <div className="flex h-full flex-col">
        <h2 className="mb-4 text-xl font-bold text-gray-800 md:mb-6 md:text-2xl">
          Tvoj nalog
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-grow flex-col justify-center space-y-4 md:space-y-5"
        >
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700 md:mb-2"
              htmlFor="login-email"
            >
              Email
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700 md:mb-2"
              htmlFor="login-password"
            >
              Šifra
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Šifra"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 text-blue-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-600"
              >
                Zapamti me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Zaboravili ste sifru?
            </a>
          </div>
          <div className="mt-4 md:mt-auto">
            {loading ? (
              <Loader />
            ) : (
              <button className="btn 0 w-full transition-colors" type="submit">
                Prijava
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

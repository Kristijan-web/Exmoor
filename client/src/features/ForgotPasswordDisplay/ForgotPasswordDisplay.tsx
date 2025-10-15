import { useState } from "react";
import { API_URL } from "../../utills/constants";
import useCatchAsync from "../../utills/useCatchAsync";
import toast from "react-hot-toast";
import useDisplayGlobalLoader from "../../hooks/ui2/useDisplayGlobalLoader";

export default function ForgotPasswordDisplay() {
  // Kada se klikne na dugme gadja se api za koji se salje email

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useDisplayGlobalLoader("Molimo sacekajte...", loading);

  const sendEmail = useCatchAsync(async (signal, e) => {
    e?.preventDefault();
    const fetchData = await fetch(`${API_URL}/api/v1/users/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
      signal,
    });

    const response = await fetchData.json();

    if (!fetchData.ok) {
      throw response;
    }

    toast.success("Link za povratak naloga poslat na email");
  }, setLoading);

  // Da li useEffect mogu da stavim u poseban hook, tipa usePendingMessage, da samo posaljem loading

  return (
    <div className="flex h-120 items-center justify-center">
      <form onSubmit={(e) => sendEmail(e)} className="mx-auto max-w-xs p-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-xl">
              Email za oporavak naloga:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xs border-1 p-2"
              id="email"
              type="email"
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Pošalji
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCatchAsync from "../../utills/useCatchAsync";
import { API_URL } from "../../utills/constants";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import useDisplayGlobalLoader from "../../hooks/ui/useDisplayGlobalLoader";

export default function NewPasswordPageDisplay() {
  const { id } = useParams();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useDisplayGlobalLoader("Molimo sacekajte...", loading);

  const setNewPassword = useCatchAsync(async (signal, e) => {
    e?.preventDefault();

    const fetchData = await fetch(`${API_URL}/api/v1/users/newPassword/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        password,
        confirmPassword,
      }),
      credentials: "include",
      signal,
    });

    const response = await fetchData.json();

    if (!fetchData.ok) {
      throw response;
    }
    toast.success("Šifra je promenjena.");
    // morao bih da upisem korisnikove podatke u cache
    queryClient.setQueryData(["user"], response.data);
    navigate("/");
  }, setLoading);

  // stavi loader dok se salje asinhron zahtev

  return (
    <div className="flex h-120 items-center justify-center">
      <form
        onSubmit={(e) => setNewPassword(e)}
        className="mx-auto max-w-xs p-5"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <label htmlFor="new-password">Nova sifra</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xs border-1 p-1"
              id="new-password"
              type="text"
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="repeat-new-password">Ponovi novu sifru</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-xs border-1 p-1"
              id="repeat-new-password"
              type="text"
              disabled={loading}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Posalji
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

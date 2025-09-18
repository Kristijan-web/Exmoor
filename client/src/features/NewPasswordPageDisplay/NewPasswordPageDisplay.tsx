import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCatchAsync from "../../utills/useCatchAsync";
import { API_URL } from "../../utills/constants";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import useDisplayGlobalLoader from "../../hooks/ui/useDisplayGlobalLoader";

type Errors = {
  password?: string;
  confirmPassword?: string;
};

export default function NewPasswordPageDisplay() {
  const { token } = useParams();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Errors>({});

  // prikazuje se kada se izvrsava asinhrona operacija
  useDisplayGlobalLoader("Molimo sacekajte...", loading);

  function regCheckPassword() {
    const regex = /^[A-z\d]{8,}/;

    if (!regex.test(password)) {
      setErrors((errors) => {
        return { ...errors, password: "Minimalno 8 karaktera" };
      });
    } else {
      setErrors((errors) => {
        return { ...errors, password: undefined };
      });
    }
  }

  function checkIfPasswordsMatch() {
    if (password !== confirmPassword) {
      setErrors((errors) => {
        return { ...errors, confirmPassword: "Sifre se ne poklapaju" };
      });
    } else {
      setErrors((errors) => {
        return { ...errors, confirmPassword: undefined };
      });
    }
  }

  function checkInputsBeforeSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (errors.password || errors.confirmPassword) return;
    setNewPassword(e);
  }

  const setNewPassword = useCatchAsync(async (signal) => {
    const fetchData = await fetch(
      `${API_URL}/api/v1/users/newPassword/${token}`,
      {
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
      },
    );

    const response = await fetchData.json();

    if (!fetchData.ok) {
      throw response;
    }
    toast.success("Šifra je promenjena.");
    // morao bih da upisem korisnikove podatke u cache
    queryClient.setQueryData(["user"], response.data);
    navigate("/");
  }, setLoading);

  return (
    <div className="flex h-120 items-center justify-center">
      <form
        onSubmit={(e) => checkInputsBeforeSubmit(e)}
        className="mx-auto max-w-xs p-5"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <label htmlFor="new-password">Nova sifra</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onBlur={() => regCheckPassword()}
              className="rounded-xs border-1 p-1"
              id="new-password"
              type="text"
              disabled={loading}
            />
            {errors?.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="repeat-new-password">Ponovi novu sifru</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => checkIfPasswordsMatch()}
              className="rounded-xs border-1 p-1"
              id="repeat-new-password"
              type="text"
              disabled={loading}
            />
            {errors?.confirmPassword && (
              <p className="text-red-500">Šifre se ne poklapaju</p>
            )}
          </div>
          <div>
            <button className="btn" type="submit" disabled={loading}>
              Posalji
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

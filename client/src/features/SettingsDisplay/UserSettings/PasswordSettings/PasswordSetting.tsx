import { useForm } from "react-hook-form";
import useCatchAsync from "../../../../utills/useCatchAsync";
import { API_URL } from "../../../../utills/constants";
import toast from "react-hot-toast";
import useDisplayGlobalLoader from "../../../../hooks/Ui/useDisplayGlobalLoader";
import { useState } from "react";

type FormData = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export default function PasswordSetting() {
  // Pravi ponvo useForm() i salji request
  // updatePassword endpoint

  const { register, handleSubmit, getValues, formState } = useForm<FormData>({
    mode: "onBlur",
  });
  const { errors } = formState;
  const [loading, isLoading] = useState<boolean>(false);

  useDisplayGlobalLoader("Molimo sacekajte...", loading);

  const onSuccess = (data: FormData) =>
    useCatchAsync(async (signal) => {
      const fetchData = await fetch(`${API_URL}/api/v1/users/updatePassword`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
        signal,
      });
      const response = await fetchData.json();

      if (!fetchData.ok) {
        throw response;
      }
      toast.success("Sifra uspesno promenjena.");
    }, isLoading)();

  return (
    <div className="mx-auto flex h-full justify-center sm:p-7">
      <form
        onSubmit={handleSubmit(onSuccess)}
        className="flex flex-col items-start justify-start gap-5 p-12"
      >
        <h3 className="mb-10 text-start">Promena šifre</h3>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="old-password " className="text-xl">
              Stara šifra
            </label>
            <input
              {...register("currentPassword", {
                required: "Polje je obavezno",
              })}
              type="text"
              id="old-password"
              placeholder="Stara šifra"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors?.currentPassword?.message && (
              <p className="text-red-500">{errors.currentPassword.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="new-password" className="text-xl">
              Nova šifra
            </label>
            <input
              {...register("password", {
                required: "Polje je obavezno",
                pattern: {
                  value: /^.{8,}$/,
                  message: "Minimalno 8 karaktera",
                },
              })}
              type="text"
              id="new-password"
              placeholder="Nova šifra"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors?.password?.message && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="retype-new-password" className="text-xl">
              Ponovi novu šifru
            </label>
            <input
              {...register("confirmPassword", {
                required: "Polje je obavezno",
                validate: (value) => {
                  return (
                    value === getValues().password || "Sifre se ne poklapaju"
                  );
                },
              })}
              type="text"
              id="retype-new-password"
              placeholder="Ponovi novu šifru"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors?.confirmPassword?.message && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="btn mt-4 flex h-10 w-25 items-center justify-center"
            >
              Potvrdi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

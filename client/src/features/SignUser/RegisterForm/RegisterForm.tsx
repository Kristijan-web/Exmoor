import { useForm } from "react-hook-form";
import useCatchAsync from "../../../utills/useCatchAsync";
import { useState } from "react";
import { API_URL } from "../../../utills/constants";
import Loader from "../../../ui/Loader";

type Props = {
  isLoginActive: boolean;
};

type FormTypes = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Treba napisati regexe

export default function RegisterForm({ isLoginActive }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, getValues, formState } = useForm<FormTypes>({
    mode: "onBlur",
  });
  const { errors } = formState;
  function onSuccess(data: FormTypes) {
    console.log("UPA U SUCCESS");
    useCatchAsync(async (signal) => {
      const fetchData = await fetch(`${API_URL}/api/v1/users/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
        signal,
      });

      console.log("dosao do ove linije");
      const response = await fetchData.json();

      if (!fetchData.ok) {
        // salji operatinal gresku catch-u
        // const error = new Error(response.message);
        // error.status = "isOperation";
        // throw error;
        console.log("Upao u not ok");
        throw { isOperational: true, message: response.message };
      }
      console.log("Sve je super");
    }, setLoading)();
  }
  return (
    <div
      className={`w-full bg-white transition-all duration-400 ease-in-out md:absolute md:h-full md:w-1/2 ${isLoginActive ? "md:right-1/2 md:translate-x-[-100%]" : "md:right-1/2 md:translate-x-0"} ${isLoginActive ? "hidden" : "px-6 pt-8 pb-8 md:p-10 md:pt-4"} md:block`}
    >
      <div className="flex h-full flex-col">
        <h2 className="mb-4 text-xl font-bold text-gray-800 md:mb-6 md:text-2xl">
          Napravite nalog
        </h2>
        <form
          onSubmit={handleSubmit(onSuccess)}
          className="flex flex-grow flex-col justify-center space-y-4 md:space-y-5"
        >
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700 md:mb-2"
              htmlFor="register-name"
            >
              Ime
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              id="register-name"
              type="text"
              autoComplete="username"
              placeholder="Ime"
              {...register("name", {
                required: "Ime je obavezno",
                pattern: {
                  value: /^[A-Z][a-z]{1,15}/,
                  message: "Ime mora poceti sa velikim slovom",
                },
              })}
            />
            {errors?.name?.message && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700 md:mb-2"
              htmlFor="register-email"
            >
              Email
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              {...register("email", {
                required: "Email je obavezan",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email nije u dobrom formatu",
                },
              })}
            />

            {errors?.email?.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700 md:mb-2"
              htmlFor="register-password"
            >
              Šifra
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              id="register-password"
              type="password"
              placeholder="Šifra"
              autoComplete="current-password"
              {...register("password", {
                required: "Šifra je obavezna",
                pattern: {
                  value: /^[A-Za-z\d]{8,20}$/,
                  message: "Minimalno 8 karaktera",
                },
              })}
            />
            {errors?.password?.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700 md:mb-2"
              htmlFor="repeat-password"
            >
              Potvrdi šifru
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              id="repeat-password"
              type="password"
              placeholder="Potvrdi šifru  "
              autoComplete="password"
              {...register("confirmPassword", {
                required: "Ponoviti šifru je obavezno",
                validate: (val) => {
                  return (
                    val === getValues().password || "Šifre se ne poklapaju"
                  );
                },
              })}
            />
            {errors?.confirmPassword?.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-blue-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Zapamti me
            </label>
          </div>
          <div className="mt-4 md:mt-auto">
            {loading ? (
              <Loader />
            ) : (
              <button className="btn w-full" type="submit">
                Registruj se
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

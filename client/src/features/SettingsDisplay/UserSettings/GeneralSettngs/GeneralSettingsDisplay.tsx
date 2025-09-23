import { useForm } from "react-hook-form";
import useGetUser from "../../../../hooks/User/useGetUser";
import useCatchAsync from "../../../../utills/useCatchAsync";
import { API_URL } from "../../../../utills/constants";
import useDisplayGlobalLoader from "../../../../hooks/Ui/useDisplayGlobalLoader";
import { useState } from "react";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  role: string;
  phoneNumber?: number;
  city?: string;
  postalCode?: number;
  address?: string;
};

export default function GeneralSettings() {
  // popuni useForm sa korisnikovim podacima
  const { data: user } = useGetUser();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: user ? user : undefined,
    mode: "onBlur",
  });
  useDisplayGlobalLoader("Molimo sačekajte...", loading);

  const onSuccess = function (data: FormData) {
    console.log(data);
    useCatchAsync(async (signal) => {
      const fetchData = await fetch(`${API_URL}/api/v1/users`, {
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
      toast.success("Ažuziranje gotovo");
    }, setLoading)();
  };

  return (
    <div
      data-testid="generalSettings"
      className="mx-auto mt-10 h-full sm:p-7 lg:mt-0"
    >
      <form
        onSubmit={handleSubmit(onSuccess)}
        className="flex h-full flex-col items-start justify-start gap-5 p-7 sm:p-12"
      >
        <h3 className="mb-10">Vaše postavke</h3>
        <div className="grid-cols-1s grid w-full gap-5 sm:grid-cols-2 sm:gap-15">
          <div className="items-star flex flex-col gap-2">
            <label htmlFor="username">Ime i prezime</label>
            <input
              disabled={loading}
              {...register("name", {
                required: "Ime i prezime su obavezni",
                pattern: {
                  value: /^[A-Za-zÀ-ž' -]{2,50}$/,
                  message: "Unesite valjano ime (slova, razmaci, - i ')",
                },
              })}
              id="username"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors.name && (
              <small className="text-red-600">{errors.name.message}</small>
            )}
          </div>
          <div className="items-star flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              disabled={loading}
              {...register("email", {
                required: "Email je obavezan",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Unesite ispravan email",
                },
              })}
              id="email"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && (
              <small className="text-red-600">{errors.email.message}</small>
            )}
          </div>
          <div className="items-star flex flex-col gap-2">
            <label htmlFor="city">Grad</label>
            <input
              disabled={loading}
              {...register("city", {
                pattern: {
                  value: /^[A-Za-zÀ-ž' \-]{2,40}$/,
                  message: "Unesite valjan naziv grada",
                },
              })}
              id="city"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors.city && (
              <small className="text-red-600">{errors.city.message}</small>
            )}
          </div>
          <div className="items-star flex flex-col gap-2">
            <label htmlFor="postalCode">Poštanski broj</label>
            <input
              disabled={loading}
              {...register("postalCode", {
                pattern: {
                  value: /^\d{2,6}$/,
                  message: "Poštanski broj mora biti 2-6 cifara",
                },
              })}
              id="postalCode"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors.postalCode && (
              <small className="text-red-600">
                {errors.postalCode.message}
              </small>
            )}
          </div>
          <div className="items-star flex flex-col gap-2">
            <label htmlFor="address">Adresa</label>
            <input
              disabled={loading}
              {...register("address", {
                pattern: {
                  value: /^[A-Za-z0-9À-ž' \-.,/]{4,50}$/,
                  message: "Unesite valjanu adresu",
                },
              })}
              id="address"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors.address && (
              <small className="text-red-600">{errors.address.message}</small>
            )}
          </div>
          <div className="items-star flex flex-col gap-2">
            <label htmlFor="phone">Broj telefona</label>
            <input
              disabled={loading}
              {...register("phoneNumber", {
                pattern: {
                  value: /^[0-9+()\- ]{6,20}$/,
                  message:
                    "Unesite valjan broj (cifre, +, (), - i razmaci, 6-20 znakova)",
                },
              })}
              id="phone"
              type="tel"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors.phoneNumber && (
              <small className="text-red-600">
                {errors.phoneNumber.message}
              </small>
            )}
          </div>
          <div className="col-span-full flex items-center justify-start text-center">
            <button
              type="submit"
              disabled={loading}
              className="btn flex h-10 w-25 items-center justify-center"
            >
              Potvrdi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

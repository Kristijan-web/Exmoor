export default function RegisterForm({
  isLoginActive,
}: {
  isLoginActive: boolean;
}) {
  return (
    <div
      className={`w-full bg-white transition-all duration-400 ease-in-out md:absolute md:h-full md:w-1/2 ${isLoginActive ? "md:right-1/2 md:translate-x-[-100%]" : "md:right-1/2 md:translate-x-0"} ${isLoginActive ? "hidden" : "px-6 pt-8 pb-8 md:p-10 md:pt-4"} md:block`}
    >
      <div className="flex h-full flex-col">
        <h2 className="mb-4 text-xl font-bold text-gray-800 md:mb-6 md:text-2xl">
          Napravite nalog
        </h2>
        <form className="flex flex-grow flex-col justify-center space-y-4 md:space-y-5">
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
            />
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
            />
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
            />
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
              autoComplete="tel"
            />
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
            <button className="btn w-full" type="button">
              Registruj se
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

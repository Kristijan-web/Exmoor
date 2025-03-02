export default function LoginForm({
  isLoginActive,
}: {
  isLoginActive: boolean;
}) {
  return (
    <div
      className={`bg-white transition-all duration-400 ease-in-out md:absolute md:h-full md:w-1/2 ${isLoginActive ? "md:left-1/2 md:translate-x-0" : "md:left-1/2 md:translate-x-full"} ${isLoginActive ? "px-6 pt-56 pb-8 sm:pt-64 md:p-10" : "hidden"} md:block`}
    >
      <div className="flex h-full flex-col">
        <h2 className="mb-4 text-xl font-bold text-gray-800 md:mb-6 md:text-2xl">
          Sign In
        </h2>
        <form className="flex flex-grow flex-col justify-center space-y-4 md:space-y-5">
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
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700 md:mb-2"
              htmlFor="login-password"
            >
              Password
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              id="login-password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="mt-4 md:mt-auto">
            <button className="btn 0 w-full transition-colors" type="button">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

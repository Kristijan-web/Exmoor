import { useState } from "react";

export default function SignUserLayout() {
  const [isLoginActive, setIsLoginActive] = useState(false);

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-lg shadow-lg"
        style={{ minHeight: "550px" }}
      >
        {/* Colored panel - repositions based on screen size */}
        <div
          className={`absolute flex flex-col items-center justify-center p-6 text-white transition-all duration-400 ease-in-out md:h-full md:w-1/2 md:p-10 ${isLoginActive ? "bg-blue-500 md:left-0" : "bg-purple-600 md:right-0"} ${isLoginActive ? "top-0 h-48 w-full sm:h-56" : "bottom-0 h-48 w-full"} md:top-0 md:bottom-auto`}
        >
          {isLoginActive ? (
            <>
              <h2 className="mb-2 text-xl font-bold md:mb-3 md:text-2xl">
                Don't have an account?
              </h2>
              <p className="mb-4 text-center text-sm text-white/80 md:mb-8 md:text-base">
                Sign up to start your journey
              </p>
              <button
                onClick={toggleForm}
                className="rounded-md bg-white px-6 py-1.5 font-medium text-blue-500 transition-colors hover:bg-blue-50 md:px-8 md:py-2"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <h2 className="mb-2 text-xl font-bold md:mb-3 md:text-2xl">
                Already have an account?
              </h2>
              <p className="mb-4 text-center text-sm text-white/80 md:mb-8 md:text-base">
                Sign in to stay connected
              </p>
              <button
                onClick={toggleForm}
                className="rounded-md bg-white px-6 py-1.5 font-medium text-purple-600 transition-colors hover:bg-purple-50 md:px-8 md:py-2"
              >
                Sign in
              </button>
            </>
          )}
        </div>

        {/* Register Form */}
        <div
          className={`bg-white transition-all duration-400 ease-in-out md:absolute md:h-full md:w-1/2 ${isLoginActive ? "md:right-1/2 md:translate-x-[-100%]" : "md:right-1/2 md:translate-x-0"} ${isLoginActive ? "hidden" : "px-6 pb-8 md:p-10"} md:block`}
        >
          <div className="flex h-full flex-col">
            <h2 className="mb-4 text-xl font-bold text-gray-800 md:mb-6 md:text-2xl">
              Create Account
            </h2>
            <form className="flex flex-grow flex-col justify-center space-y-4 md:space-y-5">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-gray-700 md:mb-2"
                  htmlFor="register-name"
                >
                  Name
                </label>
                <input
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  id="register-name"
                  type="text"
                  placeholder="Enter your full name"
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
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-gray-700 md:mb-2"
                  htmlFor="register-password"
                >
                  Password
                </label>
                <input
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                />
              </div>
              <div className="mt-4 md:mt-auto">
                <button
                  className="w-full rounded-md bg-purple-600 py-2 text-white transition-colors hover:bg-purple-700"
                  type="button"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Login Form */}
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
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="mt-4 md:mt-auto">
                <button
                  className="w-full rounded-md bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600"
                  type="button"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

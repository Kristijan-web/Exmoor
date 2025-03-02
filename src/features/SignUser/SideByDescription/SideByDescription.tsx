type checkProps = {
  isLoginActive: boolean;
  toggleForm: () => void;
};

export default function SideByDescription({
  isLoginActive,
  toggleForm,
}: checkProps) {
  return (
    <div
      className={`absolute flex flex-col items-center justify-center p-6 text-white transition-all duration-400 ease-in-out md:h-full md:w-1/2 md:p-10 ${isLoginActive ? "bg-main-color-shade md:left-0" : "bg-main-color-shade md:right-0"} ${isLoginActive ? "top-0 h-48 w-full sm:h-56" : "bottom-0 w-full"} md:top-0 md:bottom-auto`}
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
            className="text-main-color-shade rounded-md bg-white px-6 py-1.5 font-medium transition-colors hover:bg-blue-50 md:px-8 md:py-2"
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
            className="text-main-color-shade rounded-md bg-white px-6 py-1.5 font-medium transition-colors hover:bg-purple-50 md:px-8 md:py-2"
          >
            Sign in
          </button>
        </>
      )}
    </div>
  );
}

export default function UserSettings() {
  return (
    <section className="col-span-full hidden lg:col-start-5 lg:col-end-13 lg:inline-block xl:col-start-4 2xl:col-start-3">
      <div className="mx-auto h-full max-w-4xl sm:p-7">
        <form className="bg-secondary-new flex h-full flex-col items-start justify-start gap-5 p-12">
          <h3 className="mb-10">Vase postavke</h3>
          <div className="grid-cols-1s grid w-full gap-15 sm:grid-cols-2">
            <div className="items-star flex flex-col gap-2">
              <label htmlFor="username">Ime i prezime</label>
              <input
                id="username"
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="items-star flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="items-star flex flex-col gap-2">
              <label htmlFor="city">Grad</label>
              <input
                id="city"
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="items-star flex flex-col gap-2">
              <label htmlFor="postalCode">Postanski broj</label>
              <input
                id="postalCode"
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="items-star flex flex-col gap-2">
              <label htmlFor="address">Adresa</label>
              <input
                id="address"
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="items-star flex flex-col gap-2">
              <label htmlFor="phone">Broj telefona</label>
              <input
                id="phone"
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="col-span-full flex items-center justify-start text-center">
              <button className="btn flex h-10 w-25 items-center justify-center">
                Potvrdi
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

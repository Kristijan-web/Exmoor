export default function OtherSettings() {
  return (
    <section className="col-start-4 col-end-15 mt-15">
      <div className="mx-auto max-w-4xl px-7">
        <form className="bg-secondary-new flex flex-col items-start justify-start gap-5 p-12">
          <h3 className="mb-10">Vase postavke</h3>
          <div className="grid w-full grid-cols-2 gap-15">
            <div className="items-star flex flex-col gap-2">
              <label htmlFor="username">Ime i prezime</label>
              <input
                id="username"
                type="text"
                className="h-10 rounded-xs border-none bg-white p-3"
              />
            </div>
            <div className="items-star flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                className="h-10 rounded-xs border-none bg-white p-3"
              />
            </div>
            <div className="items-star flex flex-col gap-2">
              <label htmlFor="city">Grad</label>
              <input
                id="city"
                type="text"
                className="h-10 rounded-xs border-none bg-white p-3"
              />
            </div>
            <div className="items-star flex flex-col gap-2">
              <label htmlFor="postalCode">Postanski broj</label>
              <input
                id="postalCode"
                type="text"
                className="h-10 rounded-xs border-none bg-white p-3"
              />
            </div>
            <div className="items-star flex flex-col gap-2">
              <label htmlFor="address">Adresa</label>
              <input
                id="address"
                type="text"
                className="h-10 rounded-xs border-none bg-white p-3"
              />
            </div>
            <div className="items-star flex flex-col gap-2">
              <label htmlFor="phone">Broj telefona</label>
              <input
                id="phone"
                type="text"
                className="h-10 rounded-xs border-none bg-white p-3"
              />
            </div>
            <div className="flex items-center justify-start gap-5 text-center">
              <button className="btn flex h-10 w-25 items-center justify-center">
                Odustani
              </button>
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

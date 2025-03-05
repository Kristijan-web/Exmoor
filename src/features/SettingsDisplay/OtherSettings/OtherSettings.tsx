export default function OtherSettings() {
  return (
    <section className="mt-24">
      <div className="mx-auto max-w-5xl px-7">
        <h2 className="mb-15">Vas nalog</h2>
        <form className="flex flex-col items-start justify-start gap-5 p-12">
          <h3 className="mb-10">Vase postavke</h3>
          <div className="flex w-110 items-center justify-between">
            <label htmlFor="fullName">Ime i prezime</label>
            <input
              id="fullName"
              type="text"
              className="rounded-xs border-1 border-black"
            />
          </div>
          <div className="flex w-110 items-center justify-between">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="rounded-xs border-1 border-black"
            />
          </div>
          <div className="mb-10 flex w-110 items-center justify-between">
            <label htmlFor="number">Telefon</label>
            <input
              id="number"
              type="number"
              className="rounded-xs border-1 border-black"
            />
          </div>
          <div className="flex w-110 items-center justify-end gap-5">
            <button className="btn flex h-10 w-25 items-center justify-center">
              Odustani
            </button>
            <button className="btn flex h-10 w-25 items-center justify-center">
              Potvrdi
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

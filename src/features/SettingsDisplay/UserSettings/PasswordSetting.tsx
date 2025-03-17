export default function PasswordSetting() {
  return (
    <section className="col-span-full hidden lg:col-start-5 lg:col-end-13 lg:inline-block xl:col-start-4 2xl:col-start-3">
      <div className="bg-secondary-new mx-auto flex h-full max-w-4xl items-start justify-center sm:p-7">
        <form className="flex flex-col items-start justify-start gap-5 p-12">
          <h3 className="mb-10">Promena sifre</h3>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="old-password " className="text-xl">
                Stara sifra
              </label>
              <input
                type="text"
                id="old-password"
                placeholder="Stara sifra"
                className="w-70 rounded-xs border-1 border-black p-1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="old-password" className="text-xl">
                Nova sifra
              </label>
              <input
                type="text"
                id="old-password"
                placeholder="Nova sifra"
                className="w-70 rounded-xs border-1 border-black p-1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="old-password" className="text-xl">
                Ponovi novu sifru
              </label>
              <input
                type="text"
                id="old-password"
                placeholder="Ponovi novu sifru"
                className="w-70 rounded-xs border-1 border-black p-1"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

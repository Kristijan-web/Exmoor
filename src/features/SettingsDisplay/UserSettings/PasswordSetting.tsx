export default function PasswordSetting() {
  return (
    <div className="mx-auto flex h-full justify-center sm:p-7">
      <form className="flex flex-col items-start justify-start gap-5 p-12">
        <h3 className="mb-10 text-start">Promena šifre</h3>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="old-password " className="text-xl">
              Stara šifra
            </label>
            <input
              type="text"
              id="old-password"
              placeholder="Stara šifra"
              className="w-70 rounded-xs border-1 border-black p-1"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="new-password" className="text-xl">
              Nova šifra
            </label>
            <input
              type="text"
              id="new-password"
              placeholder="Nova šifra"
              className="w-70 rounded-xs border-1 border-black p-1"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="retype-new-password" className="text-xl">
              Ponovi novu šifru
            </label>
            <input
              type="text"
              id="retype-new-password"
              placeholder="Ponovi novu šifru"
              className="w-70 rounded-xs border-1 border-black p-1"
            />
          </div>
          <div>
            <button className="btn mt-4 flex h-10 w-25 items-center justify-center">
              Potvrdi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

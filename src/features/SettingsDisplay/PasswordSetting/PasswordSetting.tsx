export default function PasswordDisplay() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-7">
        <form className="flex flex-col items-start justify-start gap-5 p-12">
          <h3>Promena sifre</h3>
          <div className="flex w-110 items-center justify-between">
            <label htmlFor="old-password">Stara sifra</label>
            <input
              id="oldPassword"
              type="text"
              className="rounded-xs border-1 border-black"
            />
          </div>
          <div className="flex w-110 items-center justify-between">
            <label htmlFor="newPassword">Nova sifra</label>
            <input
              id="newPassword"
              type="text"
              className="rounded-xs border-1 border-black"
            />
          </div>
          <div className="mb-10 flex w-110 items-center justify-between">
            <label htmlFor="newPasswordRepeat">Ponovite Novu sifru</label>
            <input
              id="newPasswordRepeat"
              type="text"
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

export default function Form() {
  return (
    // Napravi da bude form-a grid
    // Radi mobile-first
    <section className="mt-20 mb-8">
      <div className="mx-auto max-w-3xl px-7">
        <form
          className="flex flex-col justify-start gap-5 rounded-xs bg-[#F3F3F3] p-7"
          aria-labelledby="contact-form-heading"
        >
          <h1 className="text-center text-2xl">Kontakt</h1>
          <div>
            <label htmlFor="ime">Ime</label>
            <input
              placeholder="Ime"
              id="ime"
              type="text"
              className="h-10 w-full rounded-xs bg-white p-3"
            />
          </div>
          <div>
            <label htmlFor="prezime">Prezime</label>
            <input
              id="prezime"
              placeholder="Prezime"
              type="text"
              className="h-10 w-full rounded-xs bg-white p-3"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="h-10 w-full rounded-xs bg-white p-3"
            />
          </div>
          <div>
            <textarea
              maxLength={250}
              placeholder="Unesite razlog"
              className="h-40 w-full rounded-xs bg-white p-3 lg:h-20"
            ></textarea>
          </div>
          <button type="submit" className="btn lg:w-30">
            Pošalji
          </button>
        </form>
      </div>
    </section>
  );
}

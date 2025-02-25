export default function FormItem() {
  return (
    // Napravi da bude form-a grid
    // Radi mobile-first
    <form
      className="flex w-full flex-col justify-start gap-5 bg-[#F3F3F3] p-6"
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
          className="h-20 w-full rounded-xs bg-white p-3"
        ></textarea>
      </div>
      <button type="submit" className="btn lg:w-30">
        Submit
      </button>
    </form>
  );
}

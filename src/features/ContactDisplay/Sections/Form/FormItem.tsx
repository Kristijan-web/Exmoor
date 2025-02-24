export default function FormItem() {
  return (
    // Napravi da bude form-a grid
    // Radi mobile-first
    <form className="bg-red-300 p-6">
      <div>
        <label>Ime</label>
        <input type="text" className="border-1 border-black" />
      </div>
      <div>
        <label>Prezime</label>
        <input type="text" className="border-1 border-black" />
      </div>
      <div>
        <label>Broj telefona</label>
        <input type="text" className="border-1 border-black" />
      </div>
    </form>
  );
}

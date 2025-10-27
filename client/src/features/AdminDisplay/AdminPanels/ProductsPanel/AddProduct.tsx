// import { useForm } from "react-hook-form";

import { useState } from "react";

export default function AddProduct() {
  //   const { formData } = useForm();
  const [enabled, setEnabled] = useState(false);
  return (
    <section className="col-start-1 col-end-3 flex h-full items-center justify-center p-4 lg:col-start-2 lg:col-end-3">
      <div className="flex flex-col gap-6 rounded-lg border-1 border-gray-400 p-6">
        <h2 className="text-3xl font-medium">Dodaj novi proizvod</h2>
        <form
          className="flex flex-col items-start gap-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* Pocetak */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="naziv" className="font-semibold">
                Naziv *
              </label>
              <input
                id="naziv"
                type="text"
                placeholder="npr. Icy, Cool, Smooth"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="naziv" className="font-semibold">
                Brend *
              </label>
              <input
                id="brend"
                type="text"
                placeholder="npr. Zara, Davidoff"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="gender">Pol *</label>
              <select
                id="gender"
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="default">Izaberi...</option>
                <option value="muski">Muški</option>
                <option>Ženski</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="water_type">Vrsta vode *</label>
              <select
                id="water_type"
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="Parfem">Parfemska voda</option>
                <option value="Toaletna">Toaletna voda</option>
                <option value="Kolonjska">Kolonjska voda</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Cena *</label>
              <input
                placeholder="npr. 1999"
                id="price"
                type="number"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="quantity">Kolicina</label>
              <input
                placeholder="npr. 100"
                id="quantity"
                type="number"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          {/* // Kraj */}
          <div className="flex flex-col items-start gap-2">
            <p>Proizvod je na akciji?</p>
            <div className="flex items-center justify-start gap-3">
              <button
                onClick={() => setEnabled(!enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  enabled ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span>{enabled ? "Da" : "Ne"}</span>
            </div>
          </div>

          {/* Ispod je div koji je grid i sadrzi 4 grid-item-a */}
          <div
            className={`grid grid-cols-1 gap-5 lg:grid-cols-2 lg:grid-rows-2 ${enabled ? "grid" : "hidden"}`}
          >
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="popust" className="font-semibold">
                Popust(%) *
              </label>
              <input
                placeholder="npr. 10"
                id="popust"
                type="text"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="pocetak_akcije" className="font-semibold">
                Pocetak akcije *
              </label>
              <input
                id="pocetak_akcije"
                type="date"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="naziv" className="font-semibold">
                Kraj akcije *
              </label>
              <input
                id="kraj_akcije"
                type="date"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
          <div>
            <button className="btn mt-4">Pošalji</button>
          </div>
        </form>
      </div>
    </section>
  );
}

import { useForm } from "react-hook-form";
import { useState } from "react";

type Sale = {
  discount: number;
  sale_start: string;
  sale_end: string;
  sold: number;
};

type FormData = {
  title: string;
  brand: string;
  gender: string;
  water: string;
  price: number;
  quantity: number;
  image: FileList;
  sale: Sale | null;
};

export default function AddProduct() {
  const { register, formState, handleSubmit } = useForm<FormData>();
  const { errors } = formState;
  const [showSale, setshowSale] = useState(false);

  function onSuccess(data: FormData) {
    console.log("Evo podataka iz forme", data);
  }

  // Fix bitan
  // - Kada sale nije oznacen onda polja ispod njega ne treba da budu obavezna

  return (
    <section className="col-start-1 col-end-3 flex h-full items-center justify-center p-4 lg:col-start-2 lg:col-end-3">
      <div className="flex flex-col gap-6 rounded-lg border-1 border-gray-400 p-6">
        <h2 className="text-3xl font-medium">Dodaj novi proizvod</h2>
        <form
          className="flex flex-col items-start gap-4"
          onSubmit={handleSubmit(onSuccess)}
        >
          {/* Pocetak */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="naziv" className="font-semibold">
                Naziv *
              </label>
              <input
                id="naziv"
                type="text"
                placeholder="npr. Icy, Cool, Smooth"
                className="rounded-md border border-gray-300 px-3 py-2"
                {...register("title", { required: "Ovo polje je obavezno" })}
              />
              {errors?.title?.message && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="naziv" className="font-semibold">
                Brend *
              </label>
              <input
                id="brend"
                type="text"
                placeholder="npr. Zara, Davidoff"
                className="rounded-md border border-gray-300 px-3 py-2"
                {...register("brand", { required: "Ovo polje je obavezno" })}
              />
              {errors?.brand?.message && (
                <p className="text-red-500">{errors.brand.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="gender">Pol *</label>
              <select
                id="gender"
                className="rounded-md border border-gray-300 px-3 py-2"
                {...register("gender", {
                  required: "Ovo polje je obavezno",
                  validate: (value) =>
                    value === "Izaberi..." || "Ovo polje je obavezno",
                })}
              >
                <option value="default">Izaberi...</option>
                <option value="muski">Muški</option>
                <option>Ženski</option>
              </select>
              {errors?.gender?.message && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="water_type">Vrsta vode *</label>
              <select
                id="water_type"
                className="rounded-md border border-gray-300 px-3 py-2"
                {...register("water", {
                  required: "Ovo polje je obavezno",
                  validate: (value) =>
                    value === "Izaberi..." || "Ovo polje je obavezno ",
                })}
              >
                <option>Izaberi...</option>
                <option value="Parfem">Parfemska voda</option>
                <option value="Toaletna">Toaletna voda</option>
                <option value="Kolonjska">Kolonjska voda</option>
              </select>
              {errors?.water?.message && (
                <p className="text-red-500">{errors.water.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Cena *</label>
              <input
                placeholder="npr. 1999"
                id="price"
                type="number"
                className="rounded-md border border-gray-300 px-3 py-2"
                {...register("price", { required: "Ovo polje je obavezno" })}
              />
              {errors?.price?.message && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="quantity">Kolicina</label>
              <input
                placeholder="npr. 100"
                id="quantity"
                type="number"
                className="rounded-md border border-gray-300 px-3 py-2"
                {...register("quantity", { required: "Ovo polje je obavezno" })}
              />
              {errors?.quantity?.message && (
                <p className="text-red-500">{errors.quantity.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label>Slika *</label>
              <input
                type="file"
                className="rounded-md border border-gray-300 px-3 py-2"
                {...register("image", { required: "Ovo polje je obavezno" })}
              />
              {errors?.image?.message && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>
          </div>

          {/* // Kraj */}
          <div className="flex flex-col items-start gap-2">
            <p>Proizvod je na akciji?</p>
            <div className="flex items-center justify-start gap-3">
              <button
                onClick={() => setshowSale(!showSale)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  showSale ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    showSale ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span>{showSale ? "Da" : "Ne"}</span>
            </div>
          </div>

          {/* Ispod je div koji je grid i sadrzi 4 grid-item-a */}
          <div
            className={`items-senter grid w-full grid-cols-1 justify-center gap-5 lg:grid-cols-3 lg:grid-rows-1 ${showSale ? "grid" : "hidden"}`}
          >
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="popust" className="font-semibold">
                Popust(%) *
              </label>
              <input
                placeholder="npr. 10"
                id="popust"
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                {...register("sale.discount", {
                  required: "Ovo polje je obavezno",
                })}
              />
              {errors?.sale?.discount?.message && (
                <p className="text-red-500">{errors.sale.discount.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="pocetak_akcije" className="font-semibold">
                Pocetak akcije *
              </label>
              <input
                id="pocetak_akcije"
                type="date"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                {...register("sale.sale_start", {
                  required: "Ovo polje je obavezno",
                })}
              />
              {errors?.sale?.sale_start?.message && (
                <p className="text-red-500">{errors.sale.sale_start.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="naziv" className="font-semibold">
                Kraj akcije *
              </label>
              <input
                id="kraj_akcije"
                type="date"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                {...register("sale.sale_end", {
                  required: "Ovo polje je obavezno",
                })}
              />
              {errors?.sale?.sale_end?.message && (
                <p className="text-red-500">{errors.sale.sale_end.message}</p>
              )}
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

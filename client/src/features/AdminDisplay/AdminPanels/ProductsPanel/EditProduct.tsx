import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loader from "../../../../ui/Loader";
import { Product } from "./DisplayProducts";
import useGetProducts from "../../../../hooks/Products/useGetProducts";
import { useParams } from "react-router-dom";
import useUpdateProduct from "../../../../hooks/Products/useUpdateProduct";

export default function EditProduct() {
  // Uzimaju se svi proizvodi i filtrira se onaj koji  je izabran
  const { data: products } = useGetProducts();
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const { register, formState, handleSubmit, reset } = useForm<Product>();
  const { errors } = formState;
  const { id } = useParams();
  const [showSale, setshowSale] = useState(false);

  const productToEdit = products?.filter((product) => product.id === id)[0];

  useEffect(
    function fillFormInputs() {
      if (productToEdit) {
        reset(productToEdit);
      }
    },
    [productToEdit, reset],
  );

  function onSuccess(data: Product) {
    const formData = new FormData();

    formData.append("id", data.id);
    formData.append("image", data.image[0]);
    formData.append("title", data.title);
    formData.append("brand", data.brand);
    formData.append("gender", data.gender);
    formData.append("water", data.water);
    formData.append("price", data.price.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("sale", JSON.stringify(data.sale));

    console.log(data);

    updateProduct(formData);
  }

  return (
    <section className="col-start-1 col-end-3 flex h-full items-center justify-center p-4 lg:col-start-2 lg:col-end-3">
      <div className="flex flex-col gap-6 rounded-lg border-1 border-gray-400 p-6">
        <h2 className="text-3xl font-medium">Izmeni proizvod</h2>
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
                  validate: (value) => {
                    if (value === "default") {
                      return "Ovo polje je obavezno";
                    }
                  },
                })}
              >
                <option value="default">Izaberi...</option>
                <option value="Muški">Muški</option>
                <option value="Ženski">Ženski</option>
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
                  validate: (value) => {
                    if (value === "default") {
                      return "Ovo polje je obavezno";
                    }
                  },
                })}
              >
                <option value="default">Izaberi...</option>
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
                step="any"
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
                {...register("image")}
              />
              {errors?.image?.message && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
              <div className="flex flex-col items-start justify-center">
                <div className="group relative inline-block">
                  <img
                    className="w-20 rounded-xs group-hover:opacity-90 group-hover:blur-xs"
                    src={productToEdit?.image}
                  />
                  <div className="absolute top-[50%] left-[50%] hidden translate-x-[-50%] translate-y-[-50%] group-hover:block">
                    <button
                      type="button"
                      className="cursor-pointer rounded-xs bg-red-600 p-1 text-white hover:bg-red-700 active:bg-red-800"
                    >
                      Obrisi
                    </button>
                  </div>
                </div>
              </div>
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
                  required: showSale ? "Ovo polje je obavezno" : false,
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
                  required: showSale ? "Ovo polje je obavezno" : false,
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
                  required: showSale ? "Ovo polje je obavezno" : false,
                })}
              />
              {errors?.sale?.sale_end?.message && (
                <p className="text-red-500">{errors.sale.sale_end.message}</p>
              )}
            </div>
          </div>
          <div>
            <button className="btn mt-4 w-25">
              {isPending ? <Loader size={30} borderColor="white" /> : "Izmeni"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

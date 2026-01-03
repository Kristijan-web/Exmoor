import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loader from "../../../../ui/Loader";
import useGetProducts from "../../../../hooks/Products/useGetProducts";
import { useParams } from "react-router-dom";
import useUpdateProduct from "../../../../hooks/Products/useUpdateProduct";
import { Product } from "../../../../types/products/productsType";
import toast from "react-hot-toast";
import { API_URL } from "../../../../utills/constants";
import useCatchAsync from "../../../../utills/useCatchAsync";

export default function EditProduct() {
  // Uzimaju se svi proizvodi i filtrira se onaj koji  je izabran
  const { data: products } = useGetProducts();
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
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

  if (!productToEdit) {
    return <Loader size={35} />;
  }

  async function handleImageDelete(public_id: string) {
    // Dodaj loader
    // Vidi da li cu da pravim posebnu componentu za slike
    return useCatchAsync(async (signal) => {
      const fetchData = await fetch(
        `${API_URL}/api/v1/products/images/${public_id}`,
        {
          method: "DELETE",
          credentials: "include",
          signal,
        },
      );
      const response = await fetchData.json();
      if (!fetchData.ok || fetchData.status !== 200) {
        throw response;
      }
    }, setIsDeleteLoading);

    // poslace request na localhost:3000/api/v1/products/image/id_slike
    // Da li treba da se invalidiraju podaci u react-query cache-u?
    // - Da inace podaci se nece videti na frontu
    // Da li da pravim poseban custom hook za slike?
    // - Ne, samo ce se raditi brisanje slike
    // Resenje
    // 1. Najbolje da posaljem request i ako je successful invalidiram cache i ponovo dohvatim producte
    // 2. Ili nakon sto je request successful odem to cache-a i rucno izbrisem tu sliku umesto da sve ponovo refatch-ujem
    // Sta su dobici i gubici odluke 1.?
    // Gubici:
    // Opterecenje baze:
    // - nakon invalidiranja cache-a ako ima dosta product-a koje vracam, moze dosta da optereti bazu, mada da li bi se cesto izvrsala ta operacija, izvrsala bi se svaki put kada korisnik obrise sliku (ako ima 5 slika i 1000000 zapisa to je opterecenje za bazu, mada na front ne bih vracao sve zapise iz baze vec deo samo jer bih tad imao paginaciju). Conclusion, opterecenje za bazu ne bi bilo veliko i ne bi mnogo ugrozilo performanse, po meni.
    // Dobici:
    // - Laksa logika, samo se invalidira cache i to je to
    //
    // Sta su dobici i gubici odluke 2.?
    // Gubici:
    // - Vise logike
    // Dobici:
    // - Manje opterecenje baze
    // Admin ce ovo videti kod sebe, dal cu da invalidiram ceo query ili da rucno menjam cache, ako hocu da ostali korisnici vide izmene odmah cim admin doda slike ili ih obrise onda mora web socket
    // Glavno pitanje je: Dal opteretiti bazu svaki put kada admin izbrise sliku, ili obrisati samo njegov cache
    // Kroz vreme nece biti cestog brisanja slika tako da opterecenje na bazu nece biti veliko, mada svakako necu opterecivati bazu
    // Resenje
    // - Koristi setQueryData da rucno izmenim cache

    // Ova funkcija bi trebalo da bude wrap-ovano u catchAsync
  }

  function onSuccess(data: Product) {
    const formData = new FormData();

    if (!productToEdit) {
      toast.error("Doslo je do greske, pokusajte ponovo.");
      return;
    }

    if (typeof data.mainImage[0] !== "string") {
      formData.append("mainImage", data.mainImage[0]);
    }

    // ovde se nalaze stare slike
    for (const fileLocation of productToEdit.images) {
      formData.append("oldImages", fileLocation);
    }

    formData.append("id", data.id);
    formData.append("title", data.title);
    formData.append("brand", data.brand);
    formData.append("gender", data.gender);
    formData.append("water", data.water);
    formData.append("price", data.price.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("sale", JSON.stringify(data.sale));
    for (const file of data.images) {
      formData.append("images", file);
    }

    updateProduct(formData);

    // Treba da se doda .oldImages polje ovde
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
              <label>Glavna Slika *</label>
              <input
                type="file"
                className="rounded-md border border-gray-300 px-3 py-2"
                {...register("mainImage")}
              />
              {errors?.mainImage?.message && (
                <p className="text-red-500">{errors.mainImage.message}</p>
              )}
              <div className="flex flex-col items-start justify-center">
                <div className="group relative inline-block">
                  <img
                    className="w-20 rounded-xs group-hover:opacity-90 group-hover:blur-xs"
                    src={
                      typeof productToEdit?.mainImage === "string"
                        ? productToEdit?.mainImage
                        : undefined
                    }
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

            {/* part 2 */}
            <div className="flex flex-col gap-2">
              <label>Ostale Slike *</label>
              <input
                type="file"
                multiple={true}
                className="rounded-md border border-gray-300 px-3 py-2"
                {...register("images")}
              />
              {errors?.images?.message && (
                <p className="text-red-500">{errors.images.message}</p>
              )}
              {/* flex items-start justify-start gap-3 */}
              <div className="grid grid-cols-4 items-start justify-start gap-3">
                {/* Problem je sto ts i dalje misli da ce images biti FileList a ne niz stringova */}
                {Array.isArray(productToEdit?.images) &&
                  productToEdit?.images.map((image) => {
                    return (
                      <div className="group relative inline-block" key={image}>
                        <img
                          className="w-20 rounded-xs group-hover:opacity-90 group-hover:blur-xs"
                          src={image}
                        />
                        <div className="absolute top-[50%] left-[50%] hidden translate-x-[-50%] translate-y-[-50%] group-hover:block">
                          <button
                            onClick={handleImageDelete}
                            type="button"
                            className="cursor-pointer rounded-xs bg-red-600 p-1 text-white hover:bg-red-700 active:bg-red-800"
                          >
                            Obrisi
                          </button>
                        </div>
                      </div>
                    );
                  })}
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

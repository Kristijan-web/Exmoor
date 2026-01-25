import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loader from "../../../../ui/Loader";
import useCreateProduct from "../../../../hooks/Products/useCreateProduct";
import { Product } from "../../../../types/productsType";
import { API_URL } from "../../../../utills/constants";
import { brandDB } from "../../../../types/brandsType";

// Ako je showSale true onda polja nisu obavezna!!!

export default function AddProduct() {
  const { register, formState, handleSubmit, reset } = useForm<Product>();
  const { errors } = formState;
  const [showSale, setshowSale] = useState(false);
  const { mutateAsync: createProduct, isPending } = useCreateProduct();
  const [brands, setBrands] = useState<brandDB[]>([]);

  console.log("Evo brand-ova");

  async function onSuccess(data: Product) {
    const formData = new FormData();
    formData.append("mainImage", data.mainImage[0]);
    for (const file of data.images) {
      formData.append("images", file);
    }
    formData.append("title", data.title);
    formData.append("brand", data.brand);
    formData.append("gender", data.gender);
    formData.append("water", data.water);
    formData.append("price", data.price.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("sale", JSON.stringify(data.sale));

    await createProduct(formData);

    reset();
  }

  useEffect(() => {
    async function getBrands() {
      console.log("UPAO OVDE");
      const fetchData = await fetch(`${API_URL}/api/v1/brands`);
      const response = await fetchData.json();
      if (!fetchData.ok || fetchData.status !== 200) {
        throw response;
      }
      setBrands(response.data);
    }
    getBrands();
  }, []);

  // Zasto je brands pravio gresku u dependency array-u
  // - Zato sto je objekat i svaki put kada stigne promeni referencu
  // - Na primer kada dohvatimo brands oni se promene i dobiju novu referencu sto trigeurje re-render, oni stignu ali opet sa novom referencom i opet se trigeruje re-render

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
              <select
                {...register("brand", { required: "Ovo polje je obavezno" })}
              >
                <option>Izaberite brend</option>
                {brands?.map((brandDB) => {
                  console.log("EVO BRAND_A", brandDB);
                  return <option key={brandDB.id}>{brandDB.name}</option>;
                })}
              </select>
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
              {/* // OVAJ SELECT ISPOD MORA DA SE OBRISE i DA SE UPISE ID u value a
              ne "parfem", "toaltna" itd... */}
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
              <label>Glavna slika *</label>
              <input
                type="file"
                className="rounded-md border border-gray-300 px-3 py-2"
                {...register("mainImage", {
                  required: "Ovo polje je obavezno",
                })}
              />
              {errors?.mainImage?.message && (
                <p className="text-red-500">{errors.mainImage.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label>Ostale slike (opciono) *</label>
              <input
                type="file"
                multiple
                className="rounded-md border border-gray-300 px-3 py-2"
                {...register("images")}
              />
              {errors?.images?.message && (
                <p className="text-red-500">{errors.images.message}</p>
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
            <button disabled={isPending} className="btn mt-4 w-25">
              {isPending ? <Loader size={30} borderColor="white" /> : "Posalji"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

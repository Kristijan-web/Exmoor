import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loader from "../../../../../ui/Loader";
import useGetProducts from "../../../../../hooks/Products/useGetProducts";
import { useParams } from "react-router-dom";
import useUpdateProduct from "../../../../../hooks/Products/useUpdateProduct";
import { Product } from "../../../../../types/products/productsType";
import toast from "react-hot-toast";
import EditProductImages from "./EditProductImages";
import useCatchAsync from "../../../../../utills/useCatchAsync";
import { API_URL } from "../../../../../utills/constants";
import { useQueryClient } from "@tanstack/react-query";

export default function EditProduct() {
  // Uzimaju se svi proizvodi i filtrira se onaj koji  je izabran
  const { data: products } = useGetProducts();
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const { register, formState, handleSubmit, reset } = useForm<Product>();
  const { errors } = formState;
  const { id } = useParams();
  const [showSale, setshowSale] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const queryClient = useQueryClient();

  const productToEdit = products?.filter((product) => product.id === id)[0];

  // sta ako neko uploaduje image u mainImage onda dolazi do bug-a ovde

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

  async function handleImageDelete(
    typeOfImage: string,
    product_id: string,
    public_id: string,
    loaderSetter: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    // sends async reqest and deletes image from the react-query cache
    // Dodaj loader
    // Vidi da li cu da pravim posebnu componentu za slike
    return useCatchAsync(async (signal) => {
      const fetchData = await fetch(
        `${API_URL}/api/v1/products/${product_id}`,
        {
          method: "PATCH",
          credentials: "include",
          signal,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            typeOfImage,
            public_id,
            oldImages: productToEdit?.images,
          }),
        },
      );
      if (!fetchData.ok || fetchData.status !== 200) {
        const response = await fetchData.json();
        throw response;
      }
      queryClient.setQueryData(["products"], (currentData: Product[]) => {
        // PROBLEM:
        // RUCNO MUTIRANJE Reference cache-a izaziva bug
        return currentData.map((cachedProduct) => {
          // mora da se prodje kroz cached product images
          if (typeOfImage === "images" && Array.isArray(cachedProduct.images)) {
            const filteredImages = cachedProduct.images.filter((cacheImage) => {
              return cacheImage.includes(public_id) === false;
            });
            return { ...cachedProduct, images: filteredImages };
          }
          if (typeOfImage === "mainImage" && typeof typeOfImage === "string") {
            return {
              ...cachedProduct,
              mainImage:
                cachedProduct.id === product_id ? "" : cachedProduct.mainImage,
            };
          }
        });
      });
      toast.success("Slika uspesno obrisana");
      console.log("evo ga current product", productToEdit);
    }, loaderSetter)();
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
              {isDeleteLoading ? (
                <p>Loading...</p>
              ) : (
                <div className="flex flex-col items-start justify-center">
                  <div
                    className="group relative inline-block"
                    onClick={() => {
                      if (typeof productToEdit?.mainImage === "string") {
                        const index =
                          productToEdit?.mainImage.indexOf("products");
                        const public_id = productToEdit?.mainImage
                          .slice(index)
                          .split(".")[0];
                        // mozer biti problem sto ce public_id sadrzati ekstenziju .jpg
                        handleImageDelete(
                          "mainImage",
                          productToEdit.id,
                          public_id,
                          setIsDeleteLoading,
                        );
                      }
                    }}
                  >
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
              )}
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
                {Array.isArray(productToEdit?.images) &&
                  productToEdit?.images.map((image, i) => (
                    <EditProductImages
                      image={image}
                      key={i}
                      product_id={productToEdit.id}
                      handleImageDelete={handleImageDelete}
                    />
                  ))}
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

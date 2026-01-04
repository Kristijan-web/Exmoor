import { useState } from "react";
import useCatchAsync from "../../../../../utills/useCatchAsync";
import { API_URL } from "../../../../../utills/constants";
import toast from "react-hot-toast";

type Props = {
  image: string;
};

export default function EditProductImages({ image }: Props) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const index = image.indexOf("products");

  const public_id = image.slice(index);

  console.log("EVO PUBLIC_ID-a", public_id);

  async function handleImageDelete() {
    // Dodaj loader
    // Vidi da li cu da pravim posebnu componentu za slike
    return useCatchAsync(async (signal) => {
      const fetchData = await fetch(
        `${API_URL}/api/v1/products/images/${encodeURIComponent(public_id)}`,
        {
          method: "DELETE",
          credentials: "include",
          signal,
        },
      );
      if (!fetchData.ok || fetchData.status !== 204) {
        const response = await fetchData.json();
        throw response;
      }
      toast.success("Slika uspesno obrisana");
    }, setIsDeleteLoading)();

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
  }

  if (isDeleteLoading) return <p>Loading...</p>;

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
}

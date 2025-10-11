import toast from "react-hot-toast";
import { API_URL } from "../../utills/constants";

type Product = {
  title: string;
  brand: string;
  water: string;
  price: number;
  quantity: number;
};

// Zbog cega sam ovde stavio null umesto undefiend?
// - Zato sto sam ja pravio logiku ove funkcije i znam situaciju u kojoj ce funkcija vratiti neocekivanu vrednost, i samim tim govorim onome ko koristi ovu funkciju "Ej vodi racuna ova funkcija moze da vrati neocekivanu vrednost, i samim tim sto to ocekujem zato oznacavam sa null"
// Sta uopste znaci null?
// - undefined znaci da nije dodeljena vrednost
// - null znaci da promenljiva nema vrednost (namerno prazna vrednost)
//  Ako API poziv ne vraca Promise proizvoda sta onda vraca u slucaju greske?
// - Vratice nesto, neko objekat sa poruko, ali nije null nije prazno jer poruka o gresci je neka vrednost
async function getProducts(): Promise<Product[] | null> {
  try {
    const fetchData = await fetch(`${API_URL}/api/v1/products`);

    const response = await fetchData.json();

    if (!fetchData.ok) {
      toast.error("Dohvatanje proizvoda nije uspelo, osvezite stranicu");
      return null;
    }

    return response;
  } catch (err) {
    toast.error("Greska u sistemu...");
    return null;
  }
}

export default getProducts;

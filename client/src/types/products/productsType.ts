export type Sale = {
  discount: number;
  sale_start: Date;
  sale_end: Date;
  sold: number;
};

export type Product = {
  id: string;
  title: string;
  brand: string;
  gender: string;
  water: string;
  price: number;
  quantity: number;
  images: FileList | string[]; // Ako saljem stare slike bazi onda ih saljem kao stringove, a ako su nove slike onda su one u FileList-i
  mainImage: FileList | string | null;
  oldImages?: string;
  sale?: Sale | null;
};

// MainImage je tipa File ako korisnik nije izabrao novu sliku
// MainImage moze biti string samo kada se proizvod update-uje a korisnik nije izabrao novu sliku

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
  images: FileList | string;
  mainImage: FileList | string;
  oldImages?: string;
  sale?: Sale | null;
};

// MainImage je tipa File ako korisnik nije izabrao novu sliku
// MainImage moze biti string samo kada se proizvod update-uje a korisnik nije izabrao novu sliku

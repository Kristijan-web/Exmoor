// import { useForm } from "react-hook-form";

export default function AddProduct() {
  //   const { formData } = useForm();
  return (
    <section className="col-start-1 col-end-3 flex h-full items-center justify-center">
      <div className="flex flex-col gap-6 rounded-lg border-1 border-gray-400 p-6">
        <h2 className="text-3xl font-medium">Dodaj novi proizvod</h2>
        <form className="flex flex-col items-start gap-4">
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
              placeholder="npr. Zara"
              className="rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          {/* Ispod je div koji je grid i sadrzi 4 grid-item-a */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 lg:grid-rows-2">
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="naziv" className="font-semibold">
                Pol *
              </label>
              <input
                id="brend"
                type="text"
                placeholder="npr. Zara"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="naziv" className="font-semibold">
                Pol *
              </label>
              <input
                id="brend"
                type="text"
                placeholder="npr. Zara"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="naziv" className="font-semibold">
                Pol *
              </label>
              <input
                id="brend"
                type="text"
                placeholder="npr. Zara"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="naziv" className="font-semibold">
                Pol *
              </label>
              <input
                id="brend"
                type="text"
                placeholder="npr. Zara"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

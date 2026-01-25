import { useState } from "react";

type Props = {
  image: string;
  product_id: string;
  handleImageDelete: (
    typeOfImage: string,
    product_id: string,
    public_id: string,
    loaderSetter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
};

export default function EditProductImages({
  image,
  product_id,
  handleImageDelete,
}: Props) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const index = image.indexOf("products");

  const public_id = image.slice(index).split(".")[0];

  if (isDeleteLoading) return <p>Loading...</p>;

  return (
    <div className="group relative inline-block" key={image}>
      <img
        className="w-20 rounded-xs group-hover:opacity-90 group-hover:blur-xs"
        src={image}
      />
      <div className="absolute top-[50%] left-[50%] hidden translate-x-[-50%] translate-y-[-50%] group-hover:block">
        <button
          onClick={() =>
            handleImageDelete(
              "images",
              product_id,
              public_id,
              setIsDeleteLoading,
            )
          }
          type="button"
          className="cursor-pointer rounded-xs bg-red-600 p-1 text-white hover:bg-red-700 active:bg-red-800"
        >
          Obrisi
        </button>
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";

export default function NewPasswordPageDisplay() {
  const { id } = useParams();
  console.log(`Poslat id ${id}`);

  return (
    <div className="flex h-120 items-center justify-center">
      <form className="mx-auto max-w-xs p-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <label htmlFor="new-password">Nova sifra</label>
            <input
              className="border-xs border-1"
              id="new-password"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="repeat-new-password">Ponovi novu sifru</label>
            <input
              className="border-xs border-1"
              id="repeat-new-password"
              type="text"
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Posalji
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

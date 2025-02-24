import FormItem from "./FormItem.tsx";

export default function FormLayout() {
  // mobile-first radi
  return (
    <section className="mt-20 mb-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center bg-yellow-300 px-7">
        <FormItem />
        {/* u divu ispod bice iconice  */}
        <div className="grid grid-cols-12"></div>
      </div>
    </section>
  );
}

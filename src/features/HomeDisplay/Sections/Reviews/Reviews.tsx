export default function Reviews() {
  return (
    <section className="mb-24">
      <div className="mb-40 grid grid-cols-12">
        <div className="bg-first-review col-span-full flex h-24 items-center justify-center px-4 xl:col-start-1 xl:col-end-4">
          <h3 className="text-6xl lg:text-7xl">Recenzije</h3>
        </div>
        <div className="bg-second-review hidden h-24 xl:col-start-4 xl:col-end-8 xl:block"></div>
        <div className="bg-main-color-shade hidden h-24 xl:col-start-8 xl:col-end-13 xl:block"></div>
      </div>
      {/* ovo ispod su kartice za reviewers */}
      <div className="grid grid-cols-1 gap-20 px-7 md:grid-cols-3 xl:px-24">
        <div className="bg-first-review relative flex flex-col items-center justify-center gap-8 rounded-sm p-9">
          <p className="mt-8 text-center text-xl lg:text-start">
            Sjajan miris za muškarce, traje dugo, lepo miriše i ne razočarava!
            Definitivno bih svima preporučio Exmoor parfeme!
          </p>
          <b className="text-2xl">Miloš</b>
          <img
            className="w-40"
            src="Images/HomePage/Reviewers/five-star.png"
            alt="star_rating"
          />
          <img
            className="absolute top-[-60px] left-[50%] w-20 translate-x-[-50%] transform rounded-full"
            src="/Images/HomePage/Reviewers/model-1.png"
            alt="reviewer_image"
          />
        </div>
        <div className="bg-second-review relative flex flex-col items-center justify-center gap-8 rounded-sm p-9">
          <p className="mt-8 text-center text-xl lg:text-start">
            Bio sam zaista iznenađen, jedan od najboljih mirisa koje sam ikada
            kupio. Upravo sam naručio jedan za svog prijatelja. #ExmoorFan
          </p>
          <b className="text-2xl">Nikola</b>
          <img
            className="w-40"
            src="Images/HomePage/Reviewers/five-star.png"
            alt="star_rating"
          />
          <img
            className="absolute top-[-60px] left-[50%] w-20 translate-x-[-50%] transform rounded-full"
            src="/Images/HomePage/Reviewers/model-2.png"
            alt="reviewer_image"
          />
        </div>
        <div className="bg-main-color-shade text-secondary-color relative flex flex-col items-center justify-center gap-8 rounded-sm p-9">
          <p className="mt-8 text-center text-xl lg:text-start">
            Čuo sam za Exmoor od svog prijatelja, jedan od njegovih najboljih
            saveta ikada. Exmoor je jedini miris za mene. #ExmoorFan
          </p>
          <b className="text-2xl">Bojan</b>
          <img
            className="w-40"
            src="Images/HomePage/Reviewers/five-star.png"
            alt="star_rating"
          />
          <img
            className="absolute top-[-60px] left-[50%] w-20 translate-x-[-50%] transform rounded-full"
            src="/Images/HomePage/Reviewers/model-3.png"
            alt="reviewer_image"
          />
        </div>
      </div>
    </section>
  );
}

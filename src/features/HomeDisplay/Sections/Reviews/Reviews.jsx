export default function Reviews() {
  return (
    <section>
      <div className="mb-40 grid grid-cols-12 px-7">
        <div className="bg-first-review col-start-1 col-end-4 flex h-24 items-center justify-center">
          <h3 className="text-8xl">Reviews</h3>
        </div>
        <div className="bg-second-review col-start-4 col-end-8 h-24"></div>
        <div className="bg-main-color-shade col-start-8 col-end-13 h-24"></div>
      </div>
      {/* ovo ispod su kartice za reviewers */}
      <div className="grid grid-cols-1 gap-20 px-7 md:grid-cols-3 xl:px-24">
        <div className="relative flex flex-col items-center justify-center gap-8 bg-orange-500/50 p-9">
          <p className="mt-8 text-center lg:text-start">
            Awesome fragrance for man, it lasts long, smells good and it does
            not dissapoint! Would definitely recommend!
          </p>
          <b>Rodrigo</b>
          <img
            className="w-40"
            src="Images/Reviewers/five-star.png"
            alt="star_rating"
          />
          <img
            className="absolute top-[-60px] left-[50%] w-20 translate-x-[-50%] transform rounded-full"
            src="/Images/Reviewers/model-1.png"
            alt="reviewer_image"
          />
        </div>
        <div className="relative flex flex-col items-center justify-center gap-8 bg-yellow-500/50 p-9">
          <p className="mt-8 text-center lg:text-start">
            Was really suprised, one of the best fragrances i have ever bought.
            Just ordered one for my friend. #ExmoorFan
          </p>
          <b>Rodrigo</b>
          <img
            className="w-40"
            src="Images/Reviewers/five-star.png"
            alt="star_rating"
          />
          <img
            className="absolute top-[-60px] left-[50%] w-20 translate-x-[-50%] transform rounded-full"
            src="/Images/Reviewers/model-2.png"
            alt="reviewer_image"
          />
        </div>
        <div className="relative flex flex-col items-center justify-center gap-8 bg-purple-500/50 p-9">
          <p className="mt-8 text-center lg:text-start">
            Heard about Exmoor from my friend, one of his best advices ever.
            Exmoor is the only fragrance for me.
          </p>
          <b>Rodrigo</b>
          <img
            className="w-40"
            src="Images/Reviewers/five-star.png"
            alt="star_rating"
          />
          <img
            className="absolute top-[-60px] left-[50%] w-20 translate-x-[-50%] transform rounded-full"
            src="/Images/Reviewers/model-3.png"
            alt="reviewer_image"
          />
        </div>
      </div>
    </section>
  );
}

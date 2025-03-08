export default function AboutUs() {
  return (
    <section className="bg-secondary-new mb-24 h-120 xl:pb-2">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center gap-20 px-7 xl:px-7">
        <div className="w-full xl:w-[50%]">
          <h3 className="mb-8 text-center xl:text-start">About us</h3>
          <p className="mb-4 text-center text-xl tracking-wide xl:text-start">
            Welcome to Exmoor, your premier destination for luxury fragrances.
            At Exmoor, we offer an exquisite selection of perfumes from
            world-renowned brands like Dior, Calvin Klein, and many others. Our
            mission is to provide you with an exceptional fragrance experience,
            bringing you the most iconic scents that elevate your presence and
            leave a lasting impression.
          </p>
          <div className="text-center xl:text-start">
            <button className="btn">Products</button>
          </div>
        </div>
        <div className="hidden xl:flex xl:w-[50%] xl:justify-center">
          <img
            className="inline-block w-[72%] rounded-full"
            src="/Images/HomePage/AboutUs/about-us.webp"
          />
        </div>
      </div>
    </section>
  );
}

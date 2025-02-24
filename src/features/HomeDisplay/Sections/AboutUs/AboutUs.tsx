export default function AboutUs() {
  return (
    <section className="bg-secondary-color mx-auto mb-24 max-w-6xl rounded-sm pt-10 pb-10 lg:pb-2">
      <div className="flex w-full items-start gap-20 px-4 lg:px-8">
        <div className="w-full lg:w-[50%]">
          <h3 className="mb-8 text-center lg:text-start">About us</h3>
          <p className="mb-4 text-center text-xl tracking-wide lg:text-start">
            Welcome to Exmoor, your premier destination for luxury fragrances.
            At Exmoor, we offer an exquisite selection of perfumes from
            world-renowned brands like Dior, Calvin Klein, and many others. Our
            mission is to provide you with an exceptional fragrance experience,
            bringing you the most iconic scents that elevate your presence and
            leave a lasting impression.
          </p>
          <div className="text-center lg:text-start">
            <button className="btn">Products</button>
          </div>
        </div>
        <div className="hidden lg:flex lg:w-[50%] lg:justify-center">
          <img
            className="inline-block w-[72%] rounded-full"
            src="/Images/HomePage/AboutUs/about-us.webp"
          />
        </div>
      </div>
    </section>
  );
}

export default function AboutUs() {
  return (
    <section className="bg-secondary-new mb-24 h-140 sm:h-120 xl:pb-2">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center gap-20 px-7 py-5 sm:py-0 xl:px-7">
        <div className="w-full xl:w-[50%]">
          <h3 className="mb-8 text-center xl:text-start">O Nama</h3>
          <p className="mb-4 text-center text-xl tracking-wide xl:text-start">
            Dobrodošli u Exmoor, vašu premijernu destinaciju za luksuzne mirise.
            U Exmoor-u nudimo izuzetan izbor parfema od svetski poznatih
            brendova kao što su Dior, Calvin Klein i mnogi drugi. Naša misija je
            da vam pružimo izuzetno mirisno iskustvo, donoseći vam najikoničnije
            mirise koje podižu vaše prisustvo i ostavljaju trajan utisak.
          </p>
          <div className="text-center xl:text-start">
            <button className="btn">Proizvodi</button>
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

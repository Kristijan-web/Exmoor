import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="mx-auto grid h-100 max-w-6xl grid-cols-12 items-start justify-items-center p-15">
        <div className="text-secondary-color col-start-1 col-end-4">
          <h4 className="mb-4 text-2xl font-semibold">Popular Links</h4>
          <nav>
            <ul className="flex flex-col gap-4 text-xl">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/shop">Shop</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/cart">Cart</NavLink>
              </li>
              <li>
                <NavLink to="/settings">Settings</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="text-secondary-color col-start-4 col-end-9 flex flex-col gap-4 text-xl">
          <h4 className="text-2xl font-semibold">Contact us</h4>
          <address>
            <p>Zdravka Celara 1, Novi grad, Beograd</p>
          </address>
          <a className="block" href="tel:111-222-333">
            +111 222-333
          </a>
          <a className="block" href="mailto:kristijanstojanovic8@gmail.com">
            kristijanstojanovic8@gmail.com
          </a>
          <p>RSS & SITEMAP</p>
        </div>
        <div className="col-start-9 col-end-13">
          <h4 className="text-secondary-color mb-4 text-2xl font-semibold">
            Socials
          </h4>
          <div className="text-secondary-color flex gap-6 text-4xl">
            <ion-icon name="logo-instagram"></ion-icon>
            <ion-icon name="mail-outline"></ion-icon>
            <ion-icon name="logo-youtube"></ion-icon>
            <ion-icon name="logo-github"></ion-icon>
          </div>
        </div>
      </div>
    </footer>
  );
}

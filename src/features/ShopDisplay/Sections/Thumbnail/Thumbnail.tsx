import { useEffect, useRef } from "react";
import { useHeader } from "../../../../contexts/GlobalContexts/HeaderContext";

export default function Thumbnail() {
  const headerContext = useHeader();
  const intersectionElement = useRef(null);
  if (!headerContext) throw new Error("global context nije postavljen");
  const { dispatch, isBurgerMenuOpen } = headerContext;
  useEffect(
    function setIntersectionElement() {
      dispatch({
        type: "setInterceptingElement",
        payload: intersectionElement.current,
      });
    },
    [dispatch],
  );
  // Kada je burger menu prikazan treba ukloniti css klase

  return (
    <section
      ref={intersectionElement}
      className={`h-thumbnail gradient_image_shop bg-start ${!isBurgerMenuOpen && "relative"} mb-24 w-full bg-cover bg-no-repeat sm:bg-center`}
    >
      <div
        className={`text-secondary-color mx-auto max-w-7xl ${!isBurgerMenuOpen && "absolute top-[50%] translate-y-[-50%]"} px-7 sm:left-[10%]`}
      >
        <div className="flex w-full flex-col gap-4 sm:w-[70%] sm:gap-3">
          <h1 className="font-semi text-start text-4xl">
            Choose from one of the best perfume sellers in the world
          </h1>
          <p className="text-2xl">
            High-quality and unique olfactory compositions
          </p>
          <p className="">
            Born to our collaborations with famous Master perfumers.
          </p>
        </div>
      </div>
    </section>
  );
}

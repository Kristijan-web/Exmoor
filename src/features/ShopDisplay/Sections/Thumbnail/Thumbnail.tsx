import { useEffect, useRef } from "react";
import { useHeader } from "../../../../contexts/GlobalContexts/HeaderContext";

export default function Thumbnail() {
  const { dispatch } = useHeader();
  const intersectionElement = useRef(null);
  useEffect(
    function setIntersectionElement() {
      dispatch({
        type: "setInterceptingElement",
        payload: intersectionElement.current,
      });
    },
    [dispatch],
  );
  return (
    <section
      ref={intersectionElement}
      className={`h-thumbnail gradient_image_shop bg-start relative mb-24 w-full bg-cover bg-no-repeat sm:bg-center`}
    >
      <div
        className={`text-secondary-color absolute top-[50%] mx-auto max-w-7xl translate-y-[-50%] px-7 sm:left-[10%]`}
      >
        <div className="flex w-full flex-col gap-4 sm:w-[70%] sm:gap-3">
          <h1 className="font-semi text-start text-4xl">
            Izaberite jednog od najboljih prodavaca parfema na svetu.
          </h1>
          <p className="text-2xl">
            Visoko kvalitetni parfemi od poznatih brendova
          </p>
          <p className="text-xl">Mirisi koji govore vise od hiljadu reci</p>
        </div>
      </div>
    </section>
  );
}

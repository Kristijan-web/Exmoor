import { useEffect, useRef } from "react";
import { useHeader } from "../../../../contexts/GlobalContexts/HeaderContext";

export default function Thumbnail() {
  const headerContext = useHeader();
  const intersectionElement = useRef(null);
  if (!headerContext) {
    throw new Error("Nije povezan context u root-u");
  }
  const { dispatch } = headerContext;
  useEffect(
    function setIntersectionElement() {
      dispatch({
        type: "setinterceptingElement",
        payload: intersectionElement.current,
      });
    },
    [dispatch],
  );
  return (
    <div
      ref={intersectionElement}
      className="h-thumbnail mb-24 inline-block w-full bg-[url(/Images/HomePage/thumbnail2.webp)] bg-cover bg-center bg-no-repeat"
    ></div>
  );
}

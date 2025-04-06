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
    <div
      data-testid="thumbnail"
      ref={intersectionElement}
      className="h-thumbnail mb-24 inline-block w-full bg-[url(/Images/HomePage/thumbnail2.webp)] bg-cover bg-center bg-no-repeat"
    ></div>
  );
}

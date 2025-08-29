import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTopOnURLChange() {
  const location = useLocation();
  useEffect(
    function scrollToTopWhenURLChanges() {
      window.scrollTo(0, 0);
    },
    [location.pathname],
  );
  return null;
}

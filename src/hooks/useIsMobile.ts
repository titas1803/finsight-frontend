import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(992);

  useEffect(() => {
    const updateVal = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowWidth(window.innerWidth);
    };
    updateVal();

    window.addEventListener("resize", updateVal);

    return () => {
      window.removeEventListener("resize", updateVal);
    };
  }, []);

  return { isMobile, windowWidth };
};

// deno-lint-ignore-file no-window no-window-prefix
import { useEffect, useState } from "react";

export const useCurrentViewportView = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () =>
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
  }, []);

  return { width, isMobile: width < 768 };
};

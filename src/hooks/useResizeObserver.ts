import { useEffect, useRef, useState } from "react";

export function useResizeObserver() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const elementWidth = entries[0].contentRect.width;

        setWidth(elementWidth);
      }
    });

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    width,
    elementRef,
  };
}

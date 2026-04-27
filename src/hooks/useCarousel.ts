import { useEffect, useState } from "react";

export function useCarousel(slidesLength: number) {
  const [visibleSlides, setVisibleSlides] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const onResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 1200) {
        setVisibleSlides(4);
      } else if (windowWidth >= 1024) {
        setVisibleSlides(3);
      } else if (windowWidth >= 768) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(1);
      }
    };

    onResize();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    setActiveSlide((prev) => {
      const maxIndex = Math.max(0, slidesLength - visibleSlides);
      return Math.min(prev, maxIndex);
    });
  }, [visibleSlides, slidesLength]);

  const handleNext = () => {
    setActiveSlide((prev) => Math.min(slidesLength - visibleSlides, prev + 1));
  };
  const handlePrev = () => {
    setActiveSlide((prev) => Math.max(0, prev - 1));
  };

  return {
    visibleSlides,
    handleNext,
    handlePrev,
    activeSlide,
  };
}

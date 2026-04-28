import { useEffect, useState } from "react";
import type { Image } from "../types/Image";

export function useCarousel(initialSlides: Image[]) {
  const [visibleSlides, setVisibleSlides] = useState(1);
  const [activeSlide, setActiveSlide] = useState(1);
  const [smooth, setSmooth] = useState(true);

  useEffect(() => {
    const onResize = () => {
      const windowWidth = window.innerWidth;
      let visibleSlidesNum = 1;

      if (windowWidth >= 1200) {
        visibleSlidesNum = 4;
      } else if (windowWidth >= 1024) {
        visibleSlidesNum = 3;
      } else if (windowWidth >= 768) {
        visibleSlidesNum = 2;
      } else {
        visibleSlidesNum = 1;
      }

      setVisibleSlides(visibleSlidesNum);
      setActiveSlide(visibleSlidesNum);
    };

    onResize();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const slidesLength = initialSlides.length;

  const slides = [
    ...initialSlides.slice(-visibleSlides),
    ...initialSlides,
    ...initialSlides.slice(0, visibleSlides),
  ];

  const checkIfSlidesEnds = () => {
    if (activeSlide >= slidesLength + visibleSlides) {
      setActiveSlide(visibleSlides);
      setSmooth(false);
    } else if (activeSlide <= 0) {
      setActiveSlide(slides.length - 2 * visibleSlides);
      setSmooth(false);
    }
  };

  const handleNext = () => {
    setSmooth(true);
    setActiveSlide((prev) => prev + 1);
  };
  const handlePrev = () => {
    setSmooth(true);
    setActiveSlide((prev) => prev - 1);
  };

  return {
    visibleSlides,
    handleNext,
    handlePrev,
    activeSlide,
    slides,
    checkIfSlidesEnds,
    smooth,
  };
}

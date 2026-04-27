import { useEffect, useState } from "react";
import type { Image } from "../types/Image";

export function useCarousel(initialSlides: Image[]) {
  const [visibleSlides, setVisibleSlides] = useState(1);
  const [activeSlide, setActiveSlide] = useState(1);
  const [smooth, setSmooth] = useState(true);

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
    setActiveSlide(visibleSlides);
  }, [visibleSlides]);

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

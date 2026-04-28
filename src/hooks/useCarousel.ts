import { useEffect, useRef, useState } from "react";
import type { Image } from "../types/Image";

export function useCarousel(initialSlides: Image[]) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const [visibleSlides, setVisibleSlides] = useState(1);
  const [activeSlide, setActiveSlide] = useState(1);
  const [smooth, setSmooth] = useState(true);

  useEffect(() => {
    if (!sliderRef.current) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setWidth(entries[0].contentRect.width);
      }
    });

    observer.observe(sliderRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let visibleSlidesNum = 1;

    if (width >= 1200) {
      visibleSlidesNum = 4;
    } else if (width >= 1024) {
      visibleSlidesNum = 3;
    } else if (width >= 768) {
      visibleSlidesNum = 2;
    } else {
      visibleSlidesNum = 1;
    }

    setVisibleSlides(visibleSlidesNum);
    setActiveSlide(visibleSlidesNum);
  }, [width]);

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
    sliderRef,
  };
}

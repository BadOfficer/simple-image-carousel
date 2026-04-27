import type { Image } from "../../types/Image";
import styles from "./Carousel.module.scss";
import { useCarousel } from "../../hooks/useCarousel";
import { prepareImageUrl } from "../../helpers/prepareImgUrl";

interface Props {
  images: Image[];
  onSlideClick: (id: Image["id"]) => void;
  isSelected: (id: Image["id"]) => boolean;
}

const SLIDES_GAP = 8;

export function Carousel({ images, onSlideClick, isSelected }: Props) {
  const {
    visibleSlides,
    handlePrev,
    handleNext,
    activeSlide,
    slides,
    checkIfSlidesEnds,
    smooth,
  } = useCarousel(images);

  const slideWidth = `calc((100% - ${SLIDES_GAP * (visibleSlides - 1)}px) / ${visibleSlides})`;
  const offset = `calc(-${activeSlide} * (${slideWidth} + ${SLIDES_GAP}px))`;

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.arrowBtn} ${styles.leftArrow}`}
        onClick={handlePrev}
      ></button>
      <div className={styles.carousel}>
        <ul
          className={`${styles.track} ${smooth ? styles.smooth : ""}`}
          style={{
            transform: `translateX(${offset})`,
            gap: `${SLIDES_GAP}px`,
          }}
          onTransitionEnd={checkIfSlidesEnds}
        >
          {slides.map((img, index) => (
            <li
              key={`${index}_${img.id}`}
              className={`${styles.slide} ${isSelected(img.id) ? styles.selected : ""}`}
              style={{
                flex: `0 0 ${slideWidth}`,
              }}
              onClick={() => onSlideClick(img.id)}
            >
              <img
                src={prepareImageUrl(img.download_url)}
                alt={`Image ${index + 1} by ${img.author}`}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        className={`${styles.arrowBtn} ${styles.rightArrow}`}
        onClick={handleNext}
      ></button>
    </div>
  );
}

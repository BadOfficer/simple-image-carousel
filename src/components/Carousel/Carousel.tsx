import type { Image } from "../../types/Image";
import styles from "./Carousel.module.scss";
import { useCarousel } from "../../hooks/useCarousel";

interface Props {
  images: Image[];
  onSlideClick: (id: Image["id"]) => void;
  isSelected: (id: Image["id"]) => boolean;
}

const SLIDES_GAP = 8;

export function Carousel({ images, onSlideClick, isSelected }: Props) {
  const { visibleSlides, handlePrev, handleNext, activeSlide } = useCarousel(
    images.length,
  );

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
          className={styles.track}
          style={{
            transform: `translateX(${offset})`,
            gap: `${SLIDES_GAP}px`,
          }}
        >
          {images.map((img, index) => (
            <li
              key={img.id}
              className={`${styles.slide} ${isSelected(img.id) ? styles.selected : ""}`}
              style={{
                flex: `0 0 ${slideWidth}`,
              }}
              onClick={() => onSlideClick(img.id)}
            >
              <img
                src={img.download_url.replace(/(\/\d+\/\d+)$/, "/400/400")}
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

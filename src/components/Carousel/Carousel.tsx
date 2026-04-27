import type { Image } from "../../types/Image";
import styles from "./Carousel.module.scss";
import { useCarousel } from "../../hooks/useCarousel";

interface Props {
  images: Image[];
}

const SLIDES_GAP = 8;

export function Carousel({ images }: Props) {
  const { visibleSlides, handlePrev, handleNext, activeSlide } = useCarousel(
    images.length,
  );

  const slideWidth = `calc((100% - ${SLIDES_GAP * (visibleSlides - 1)}px) / ${visibleSlides})`;
  const offset = `calc(-${activeSlide} * (${slideWidth} + ${SLIDES_GAP}px))`;

  return (
    <div className={styles.wrapper}>
      <button className={styles.arrowBtn} onClick={handlePrev}>
        prev
      </button>
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
              className={styles.slide}
              style={{
                flex: `0 0 ${slideWidth}`,
              }}
            >
              <img
                src={img.download_url}
                alt={`Image ${index + 1} by ${img.author}`}
              />
            </li>
          ))}
        </ul>
      </div>
      <button className={`${styles.arrowBtn}`} onClick={handleNext}>
        next
      </button>
    </div>
  );
}

import type { Image } from "../../types/Image";
import styles from "./SelectedList.module.scss";

interface Props {
  selectedImages: Image[];
  onRemove: (id: string) => void;
}

export function LinksList({ selectedImages, onRemove }: Props) {
  if (selectedImages.length === 0) {
    return <p className={styles.emptyMessage}>No selected images</p>;
  }

  return (
    <section>
      <ol className={styles.list}>
        {selectedImages.map((img) => (
          <li key={img.id} className={styles.item}>
            <div className={styles.preview}>
              <img
                src={img.download_url.replace(/(\/\d+\/\d+)$/, "/400/400")}
                alt={`Image ${img.id} by ${img.author}`}
              />
            </div>
            <div className={styles.mainContent}>
              <h3 className={styles.author}>Author: {img.author}</h3>
              <a href={img.url} target="_blank" className={styles.link}>
                Original resource
              </a>
            </div>
            <button
              className={styles.unselectBtn}
              onClick={() => onRemove(img.id)}
            ></button>
          </li>
        ))}
      </ol>
    </section>
  );
}

import { useEffect, useState } from "react";
import type { Image } from "./types/Image";
import { typedFetch } from "./utils/typedFetch";
import { Carousel } from "./components/Carousel";
import { LinksList } from "./components/SelectedList";
import { Loader } from "./components/Loader";

import "./App.scss";
import { useSelect } from "./hooks/useSelect";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { handleToggleId, isSelected, selectedImages } = useSelect(images);

  useEffect(() => {
    setIsLoading(true);
    typedFetch<Image[]>("https://picsum.photos/v2/list?limit=20")
      .then((imagesData) => {
        setImages(imagesData);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1>Simple Carousel App</h1>

      <section>
        {isLoading ? (
          <div className="loaderWrapper">
            <Loader />
          </div>
        ) : (
          <Carousel
            images={images}
            onSlideClick={handleToggleId}
            isSelected={isSelected}
          />
        )}
      </section>

      <section className="selectSection">
        <h2>Selected images:</h2>
        <div>
          <LinksList
            selectedImages={selectedImages}
            onRemove={handleToggleId}
          />
        </div>
      </section>
    </div>
  );
}

export default App;

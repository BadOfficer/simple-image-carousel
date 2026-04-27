import { useEffect, useState } from "react";
import type { Image } from "./types/Image";
import { typedFetch } from "./utils/typedFetch";
import { Carousel } from "./components/Carousel";
import { LinksList } from "./components/SelectedList";
import { Loader } from "./components/Loader";

import "./App.scss";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedImagesIds, setSelectedImagesIds] = useState<Image["id"][]>([]);

  useEffect(() => {
    setIsLoading(true);
    typedFetch<Image[]>("https://picsum.photos/v2/list?limit=10")
      .then((imagesData) => {
        setImages(imagesData);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  const handleToggleId = (id: Image["id"]) => {
    setSelectedImagesIds((prevList) => {
      if (prevList.includes(id)) {
        return prevList.filter((itemId) => itemId !== id);
      }

      return [...prevList, id];
    });
  };

  const selectedImages = images.filter((img) =>
    selectedImagesIds.includes(img.id),
  );

  const isSelected = (id: Image["id"]) => {
    return selectedImagesIds.includes(id);
  };

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

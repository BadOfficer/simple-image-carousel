import { useEffect } from "react";
import type { Image } from "./types/Image";
import { Carousel } from "./components/Carousel";
import { LinksList } from "./components/SelectedList";
import { Loader } from "./components/Loader";

import "./App.scss";
import { useSelect } from "./hooks/useSelect";
import { ErrorMessage } from "./components/ErrorMessage";
import { useFetch } from "./hooks/useFetch";

function App() {
  const {
    data: images,
    isLoading,
    error,
    handleFetch,
  } = useFetch<Image[]>("https://picsum.photos/v2/list?limit=20", []);
  const { handleToggleId, isSelected, selectedImages } = useSelect(images);

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="container">
      <h1>Simple Carousel App</h1>

      <section>
        {isLoading ? (
          <div className="loaderWrapper">
            <Loader />
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleFetch} />
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

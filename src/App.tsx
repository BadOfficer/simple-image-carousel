import { useEffect, useState } from "react";
import type { Image } from "./types/Image";
import { typedFetch } from "./utils/typedFetch";
import { Carousel } from "./components/Carousel";

function App() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    typedFetch<Image[]>("https://picsum.photos/v2/list?limit=20")
      .then((imagesData) => {
        setImages(imagesData);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="container">
      <Carousel images={images} />
    </div>
  );
}

export default App;

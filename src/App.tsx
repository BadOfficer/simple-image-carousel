import { useEffect, useState } from "react";
import type { Image } from "./types/Image";
import { typedFetch } from "./utils/typedFetch";

function App() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    typedFetch<Image[]>("https://picsum.photos/v2/list")
      .then((imagesData) => {
        setImages(imagesData);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      <ul>
        {images.map((img, index) => (
          <li key={img.id}>
            <img
              src={img.download_url}
              alt={`Image ${index + 1} by ${img.author}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

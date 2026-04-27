import { useState } from "react";
import type { Image } from "../types/Image";

export function useSelect(images: Image[]) {
  const [selected, setSelected] = useState<Image["id"][]>([]);

  const handleToggleId = (id: Image["id"]) => {
    setSelected((prevList) => {
      if (prevList.includes(id)) {
        return prevList.filter((itemId) => itemId !== id);
      }

      return [...prevList, id];
    });
  };

  const selectedImages = images.filter((img) => selected.includes(img.id));

  const isSelected = (id: Image["id"]) => {
    return selected.includes(id);
  };

  return {
    handleToggleId,
    isSelected,
    selectedImages,
  };
}

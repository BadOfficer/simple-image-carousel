import { useState } from "react";
import { typedFetch } from "../utils/typedFetch";

export function useFetch<T>(url: string, initialState: T) {
  const [data, setData] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = () => {
    setIsLoading(true);
    setError("");
    typedFetch<T>(url)
      .then((responseData) => {
        setData(responseData);
      })
      .catch((e) => {
        console.error(e);
        setError(e?.message || "Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  return {
    data,
    isLoading,
    error,
    handleFetch,
  };
}

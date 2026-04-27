interface Options {
  errorMsg?: string;
}

export async function typedFetch<T>(
  url: string,
  { errorMsg = "Fetch data error" }: Options = {},
) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(errorMsg);
  }

  return (await response.json()) as T;
}

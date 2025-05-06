const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};

export const getPlaceDetails = async (data) => {
  console.log("Data: ", JSON.stringify(data));
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: config.headers,
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

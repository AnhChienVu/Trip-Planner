import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PHOTO_REF_URL } from "../../service/GlobalApi";
import { getPlaceDetails } from "../../service/GlobalApi";

function HotelCardItem({ hotel, index }) {
  const [photoURL, setPhotoURL] = useState(null);

  const getPlacePhoto = async () => {
    try {
      const data = { textQuery: hotel?.name };
      const result = await getPlaceDetails(data);
      const photoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        result.places[0].photos[0].name
      );
      setPhotoURL(photoURL);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hotel && getPlacePhoto();
  }, [hotel]);

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.name +
        "," +
        hotel?.address
      }
      target="_blank"
    >
      <div className="hover:scale-110 transition-all" key={index}>
        <img
          src={photoURL}
          className="rounded-xl h-[180px] w-full object-cover"
        />
        <div className="my-3 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.name}</h2>
          <h2 className="text-xs text-gray-500">📍{hotel?.address}</h2>
          <h2 className="text-xs">💵 {hotel?.price_per_night}</h2>
          <h2 className="text-xs">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;

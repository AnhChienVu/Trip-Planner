import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaMapLocation } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function PlaceCardItem({ place }) {
  const [photoURL, setPhotoURL] = useState(null);

  const getPlacePhoto = async () => {
    try {
      const data = { textQuery: place?.place_name };
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
    place && getPlacePhoto();
  }, [place]);
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" + place?.place_name
      }
      target="_blank"
    >
      <div className="border rouned-lg shadow-md p-4 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={photoURL ? photoURL : "/logo.svg"}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{place?.place_name}</h2>
          <p className="text-sm text-gray-400">{place?.details}</p>
          <p className="mt-2">🕙 {place?.time_spent}</p>
          <Button size="sm" variant="outline" className="mt-2">
            <FaMapLocation />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;

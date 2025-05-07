import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip, index }) {
  const [photoURL, setPhotoURL] = useState(null);

  const getPlacePhoto = async () => {
    try {
      const data = { textQuery: trip?.userSelection?.destination };
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
    trip && getPlacePhoto();
  }, [trip]);

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div
        index={index}
        className="hover:scale-105 transition-all cursor-pointer"
      >
        <img src={photoURL} className="object-cover rounded-xl h-[250px]" />

        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.destination}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;

import { Button } from "@/components/ui/button";
import { getPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

import { PHOTO_REF_URL } from "@/service/GlobalApi";

function InfoSection({ trip }) {
  const [photoURL, setPhotoURL] = useState(null);

  const getPlacePhoto = async () => {
    try {
      const data = { textQuery: trip?.userSelection?.destination };
      const result = await getPlaceDetails(data);
      // console.log("Place photo: ", result.places[0].photos[0].name);

      const photoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        result.places[0].photos[0].name
      );
      // console.log("Photo URL: ", photoURL);
      setPhotoURL(photoURL);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  return (
    <div>
      <img
        src={photoURL}
        className="h-[350px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.destination}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 {trip?.userSelection?.traveler} Trip
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;

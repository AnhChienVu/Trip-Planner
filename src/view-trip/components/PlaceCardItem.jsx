import { Button } from "@/components/ui/button";
import React from "react";
import { FaMapLocation } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" + place?.place_name
      }
      target="_blank"
    >
      <div className="border rouned-lg shadow-md p-4 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img src="/logo.svg" className="w-[130px] h-[130px] rounded-xl" />
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

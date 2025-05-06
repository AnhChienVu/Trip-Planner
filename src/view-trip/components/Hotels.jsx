import React from "react";
import { Link } from "react-router-dom";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
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
              <img src="/logo.svg" className="rounded-xl" />
              <div className="my-3 flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.name}</h2>
                <h2 className="text-xs text-gray-500">📍{hotel?.address}</h2>
                <h2 className="text-xs">💵 {hotel?.price_per_night}</h2>
                <h2 className="text-xs">⭐ {hotel?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;

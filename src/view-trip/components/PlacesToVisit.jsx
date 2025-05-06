import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index}>
            <h2 className="font-medium text-lg">Day {item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5 allign-center">
              {item.plans.map((place, index) => (
                <div className="my-3">
                  <h2 className="font-medium text-sm text-orange-300">
                    {place?.best_time_to_visit}
                  </h2>
                  <PlaceCardItem place={place} />
                  <h2>{place?.place_name}</h2>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;

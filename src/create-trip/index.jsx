import { useEffect, useState } from "react";

export default function CreateTrip() {
  const [inputValue, setInputValue] = useState("");
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    // Check if the script is already added
    if (!window.google) {
      if (
        !document.querySelector(
          `script[src*="maps.googleapis.com/maps/api/js"]`
        )
      ) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_PLACE_API_KEY
        }&libraries=places`;
        script.async = true;
        script.onload = () => {
          console.log("Google Maps script loaded.");
        };
        document.head.appendChild(script);
      }
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 2 && window.google) {
      const autocompleteService =
        new window.google.maps.places.AutocompleteService();
      const sessionToken =
        new window.google.maps.places.AutocompleteSessionToken();
      autocompleteService.getPlacePredictions(
        {
          input: value,
          sessionToken: sessionToken,
          // Additional options:
          types: ["address"],
          componentRestrictions: { country: ["us", "can"] },
        },
        (predictions, status) => {
          if (status === "OK") {
            console.log(predictions);
            setPredictions(predictions);
          } else {
            setPredictions([]);
          }
        }
      );
    } else {
      setPredictions([]);
    }
  };

  const handleSelect = (prediction) => {
    setInputValue(prediction.description);
    setPredictions([]);
    // You can get more details using the PlacesService if needed
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter address"
        style={{ width: "100%", padding: "10px" }}
      />
      {predictions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            zIndex: 1000,
            width: "100%",
            backgroundColor: "white",
            border: "1px solid #ccc",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {predictions.map((prediction) => (
            <li
              key={prediction.place_id}
              onClick={() => handleSelect(prediction)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                color: "#333",
              }}
            >
              {prediction.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

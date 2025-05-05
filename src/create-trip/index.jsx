import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateTrip() {
  const [inputValue, setInputValue] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [formData, setFormData] = useState([]);

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

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    setFormData({
      ...formData,
      destination: value,
    });

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
    setFormData({
      ...formData,
      destination: prediction.description,
    });
    setPredictions([]);
  };

  const handleOtherInputChanges = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onGenerateTrip = () => {
    if (
      (formData?.noOfDays > 5 && !formData?.destination) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all details", {
        style: {
          background: "#fff",
          color: "#000",
        },
        icon: "⚠️",
        position: "top-right",
      });
      return;
    }

    console.log("Final Form Data:", formData);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🗺️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized place based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Enter a destination..."
              className="border border-gray-300 rounded-md shadow-sm w-full p-2"
            />
            {predictions.length > 0 && (
              <ul className="w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
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
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) =>
              handleOtherInputChanges("noOfDays", e.target.value)
            }
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((option, index) => (
              <div
                onClick={() => handleOtherInputChanges("budget", option.title)}
                key={index}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg text-center ${
                  formData?.budget === option.title &&
                  "shadow-lg border-blue-500"
                }`}
              >
                <h2 className="text-4xl">{option.icon}</h2>
                <h2 className="font-bold text-lg">{option.title}</h2>
                <h2 className="text-sm text-gray-500">{option.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on travelling with?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((option, index) => (
              <div
                onClick={() =>
                  handleOtherInputChanges("traveler", option.title)
                }
                key={index}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg text-center ${
                  formData?.traveler === option.title &&
                  "shadow-lg border-blue-500"
                }`}
              >
                <h2 className="text-4xl">{option.icon}</h2>
                <h2 className="font-bold text-lg">{option.title}</h2>
                <h2 className="text-sm text-gray-500">{option.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 flex justify-end">
          <Button onClick={onGenerateTrip}>Generate Trip</Button>
        </div>
      </div>
    </div>
  );
}

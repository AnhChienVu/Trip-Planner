import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { chat } from "@/service/AIModal";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CreateTrip() {
  const [inputValue, setInputValue] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

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

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{destination}",
      formData?.destination
    )
      .replace("{travelers}", formData?.traveler)
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{budget}", formData?.budget);
    // console.log("Final Prompt:", FINAL_PROMPT);

    try {
      // Structured input for Google GenAI API
      const result = await chat.sendMessage({
        message: FINAL_PROMPT,
      });

      console.log("API Response:", result?.text); // Access response text
      saveAITrip(result?.text);
      setLoading(false);

      toast("Trip generated successfully!", {
        style: { background: "#d4edda", color: "#155724" },
        icon: "✅",
        position: "top-right",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast("Failed to generate trip. Please try again.", {
        style: { background: "#f8d7da", color: "#721c24" },
        icon: "❌",
        position: "top-right",
      });
    }
  };

  const login = useGoogleLogin({
    onSuccess: (response) => getUserProfile(response),
    onError: (error) => console.log(error),
  });

  const getUserProfile = async (tokenInfo) => {
    try {
      const user = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
      const userData = await user.json();
      console.log("User Data:", userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const saveAITrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const documentId = Date.now().toString();
    const cleanedTripData = TripData.replace(/```/g, "")
      .replace(/json/g, "")
      .trim();
    await setDoc(doc(db, "AITrips", documentId), {
      userSelection: formData,
      tripData: JSON.parse(cleanedTripData),
      userEmail: user?.email,
      id: documentId,
    });
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
                onClick={() => handleOtherInputChanges("budget", option.budget)}
                key={index}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg text-center ${
                  formData?.budget === option.budget &&
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
          <Button onClick={onGenerateTrip} disabled={loading}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" alt="Logo" className="w-20 mb-5" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in to the App with Google authentication securely</p>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FaGoogle className="h-7 w-7" />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

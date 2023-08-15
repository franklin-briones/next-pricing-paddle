// components/PricingPage.js

import { useEffect, useState } from "react";

const PricingPage = () => {
  const [userIP, setUserIP] = useState("");
  const [localizedPrice, setLocalizedPrice] = useState(null);

  useEffect(() => {
    async function fetchUserIP() {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIP(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    }

    fetchUserIP();
  }, []);

  useEffect(() => {
    async function fetchLocalizedPrice() {
      try {
        if (!userIP) {
          return;
        }

        // Encode the IP address to avoid issues with passing dots in the URL
        const encodedIP = encodeURIComponent(userIP);
        
        // Make the API call to fetch the localized price
        const response = await fetch(`/api/getLocalizedPrice?userIP=${encodedIP}`);
        const dataPrice = await response.json();
        setLocalizedPrice(dataPrice.localizedPrice);
      } catch (error) {
        console.log("error received from getLocalizedPrice API", error)
        console.error("Error fetching localized price:", error);
      }
    }

    fetchLocalizedPrice();
  }, [userIP]);

  return (
    <div>
      {/* Your pricing page content */}
      <p>User IP Address: {userIP}</p>
      <p>Localized Price: {localizedPrice}</p>
    </div>
  );
};

export default PricingPage;

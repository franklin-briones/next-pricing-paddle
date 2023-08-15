// pages/api/getLocalizedPrice.js

export default async function handler(req, res) {
    const { userIP } = req.query;

    // Call the third-party API with the user's IP address to get the localized price and currency code
    // Replace 'THIRD_PARTY_API_ENDPOINT' with the actual URL of the third-party API
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${process.env.PB_VENDOR_AUTH_CODE}`);


    var raw = JSON.stringify({
        "items": [
            {
                "quantity": 1,
                "price_id": process.env.PRICE_ID
            }
        ],
        "customer_ip_address": `${userIP}`
    })

    let options = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    const response = await fetch("https://sandbox-api.paddle.com/transactions/preview", options);
    const data = await response.json();

    // Handle any necessary error checking and data parsing from the third-party API response
    // For example, you might do something like:
    const localizedPrice = data.data.details.totals.total; //account for cents
    const currencyCode = data.data.details.totals.currency_code

    // Fetch the currency symbol using the fetchCurrencySymbol function
    const symbol = await fetchCurrencySymbol(currencyCode);

    if (!symbol) {
        return res.status(404).json({ error: "Currency symbol not found for the given code." });
    }

    // Combine the currency symbol and localized price in the response
    const finalResponse = `${symbol} ${(Math.round(localizedPrice) / 100).toFixed(2)}`;

    res.status(200).json({ localizedPrice: finalResponse, currencyCode });
}

const currencySymbols = {
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "JPY": "¥",
    "AUD": "A$",
    "CAD": "C$",
    "CHF": "Fr.",
    "CNY": "¥",
    "SEK": "kr",
    "NZD": "NZ$",
    "INR": "₹",
    "SGD": "S$",
    "HKD": "HK$",
    "NOK": "kr",
    "KRW": "₩",
    "TRY": "₺",
    "RUB": "₽",
    "BRL": "R$",
    "ZAR": "R",
    "DKK": "kr",
    "PLN": "zł",
    "THB": "฿",
    "IDR": "Rp",
    "HUF": "Ft",
    "CZK": "Kč",
    "ILS": "₪",
    "MXN": "Mex$",
    "AED": "د.إ",
    "PHP": "₱",
    "MYR": "RM",
    "SAR": "﷼",
    "HNL": "L",
    "HRK": "kn",
    "KZT": "₸",
    "RSD": "din",
    "EGP": "E£",
    "CLP": "CLP$",
    "COP": "Col$",
    "VND": "₫",
    "TWD": "NT$",
    "ARS": "$",
    "UYU": "$U",
};

async function fetchCurrencySymbol(currencyCode) {
    // Fetch the currency symbol from the currency code using the currency code to symbol mapping
    const symbol = currencySymbols[currencyCode];
    return symbol || null; // Return null if currency symbol not found
}

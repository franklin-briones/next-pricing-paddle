// pages/api/getPricePreview.js

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

    const response = await fetch("https://sandbox-api.paddle.com/pricing-preview", options);
    const data = await response.json();

    // Handle any necessary error checking and data parsing from the third-party API response
    // For example, you might do something like:
    const localizedPrice = data.data.details.line_items[0].formatted_totals.total; //account for cents

    res.status(200).json({ localizedPrice: localizedPrice });
}

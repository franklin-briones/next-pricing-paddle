## Please create a .env file with the following parameters:

PB_VENDOR_AUTH_CODE='< Enter your Auth code here>'

PRICE_ID='< enter a priceId here for a price that you have overriden in a certain number of countries>'

### Usage
This is an EXTREMELY simple implementation of the transaction preview endpoint for Paddle, it'll simply show you that the IP address was retrieved, and the localized price, based on the retrieved IP address. This is built on NextJS and currently deployed on vercel using a test account, where there are price overrides for Brazil, Argentina, and India, and the base price is in USD. 
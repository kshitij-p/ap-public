_Take home assignment submission for appleute_

# How to run

1. Clone the repo and run `npm i` inside backend and frontend folders
1. Login into stripe and create an api key and a restricted token with all
   possible perms. Install the stripe cli and login into it with `stripe login`
   or `stripe login --api-key <YOUR_RESTRICTED_API_KEY>`
1. Follow the `.env.example` files in backend and frontend folders to setup the
   .env files respectively
1. Install docker. Docker desktop is not needed, just the cli is enough.
1. At the root of the directory, run
   `docker compose build && docker compose up -d`. This will start the server in
   detached mode with postgres on a mounted volume. It will also add 10 products
   to the db and seed them on stripe.
1. Go to the backend folder and run `npm run stripe:listen`
1. Go to the frontend folder and run `npm run quickstart`
1. Finally visit `http://localhost:3000` to see the final project
1. Go to any product and enter a quantity and click on buy to go to the payment
   page.

# Notes

Thoughts behind architecture: The system shldnt need to know about how stripe
works internally, the payment processor interface is an example of how a system
can work with the stripe service in such a way which allows the stipe service to
be as modular and as lean as possible. The payment processor interface is added
to create a common set of methods. This also allows addition of more payment
gateways in the future as well. Hence this stripe service is designed like a
plugin with no dependenices. Other services are made to build on top of it.

What could and would have been improved/changed if I had more time:

1. Add 1 more payment gateway like Razorpay or something. Since Razorpay doesn't
   have a cli like stripe to allow for easy local testing, it would take a lot
   of time for me to add and integrate it as I would have to ngrok and use that
   to forward requests which is cumbersome.
1. Complete the cart integration that re uses checkout sessions instead of
   creating a new one every time for a payment and also track payments in depth.
   The basic cart api is already there and payment expiration is also present
   which would help finish this feature. Additionally, the default expiration
   for a session can be set to a low amount like 10-15 mins.
1. Make a better docker compose file with next js and stripe cli and other stuff
   included within it.

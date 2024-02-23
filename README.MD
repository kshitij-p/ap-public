# How to run

1. Clone the repo and run `npm i` inside backend and frontend folders
1. Login into stripe and create an api key and a restricted token with all
   possible perms. Install the stripe cli and login into it with `stripe login`
   or `stripe login --api-key <YOUR_RESTRICTED_API_KEY>`
1. Follow the `.env.example` files in backend and frontend folders to setup the
   .env files respectively
1. Install docker. Docker desktop is not needed, just the cli is enough.
1. At the root of the directory, run `docker compose build && docker up -d`.
   This will start the server in detached mode with postgres on a mounted
   volume. It will also add 10 products to the db and seed them on stripe.
1. Go to the backend folder and run `npm run stripe:listen`
1. Go to the frontend folder and run `npm run quickstart`
1. Finally visit `http://localhost:3000` to see the final project

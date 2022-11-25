# support-desk
This is my first MERN app. In this project I used Redux Toolkit and many other advanced libraries. It is deployed at https://supportdesknew.herokuapp.com/

If you want to run this app on your local machine you need to add .env file in root of your app with the following things:
NODE_ENV=development
PORT=5000(for example)
MONGO_URI=mongodb+srv://<your_username>:<your_password>@<your_cluster>/<your_db_name>?retryWrites=true&w=majority
(for Mongo you need to create database, visit MongoDB site)
JWT_SECRET=<your_secret>
(jwt secret is important for your token)

After you set .env you need to run npm install in root and in frontend folder and then go back in root and "npm run dev" which will give server for your backend and frontend concurently

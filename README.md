# monitoring-purchases

This is project for my final exam. In this project I used Redux Toolkit and many other advanced libraries. For backend I used Express and MongoDB for database.
It has all required config for deploying
on Heroku. For using this app, it have two roles, admin and users. Users can create new purchases, edit and review purchases that they made. Admin can review purchases from all users and can save report in excel file which relate to purchases of users.

If you want to run this app on your local machine you need to add .env file in root of your app with the following things:
NODE_ENV=development
PORT=5000(for example)
MONGO_URI=mongodb+srv://<your_username>:<your_password>@<your_cluster>/<your_db_name>?retryWrites=true&w=majority
(for Mongo you need to create database, visit MongoDB site)
JWT_SECRET=<your_secret>
(jwt secret is important for your token)

After you set .env you need to run npm install in root and in frontend folder and then go back in root and "npm run dev" which will give server for your backend and frontend concurently

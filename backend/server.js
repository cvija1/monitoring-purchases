const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
connectDB();
const app = express();
app.use(cors());
//ocekuje se json kao body request i ocekuje se da je url zahtjev
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//serve frontend, pomjereno na vrh jer ako se spusti ispod api poziva ne radi
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
}

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
var cors = require("cors");

const PORT = process.env.PORT || 8000;
connectDB();
const app = express();
//ocekuje se json kao body request i ocekuje se da je url zahtjev
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
//zbog problema sa proxy serverom ovo se mora ubaciti da bi moglo da se salje zahtjev na drugi port
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

//serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "hello" });
  });
}
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

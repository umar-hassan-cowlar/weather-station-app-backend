// import statements
const express = require("express");
require("dotenv").config();

// importing configs & middlewares
const sequelize = require("./config/dbConfig");
const errorMiddleware = require("./middlewares/errorMiddleware");
const notFoundMiddleware = require("./middlewares/routeMiddleware");

// importing routes
const userRoutes = require("./routes/userRoute");
const weatherRoutes = require("./routes/weatherRoute");

// initializing app
const app = express();

app.use(express.json());

// using routes
app.use("/user", userRoutes);
app.use("/weather", weatherRoutes);

// default route
app.get("/", (req, res) => {
  res.json({ message: "OK??" });
});

// using middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

sequelize
  .sync()
  .then(() => {
    // listen server log
    app.listen(process.env.SERVER_PORT || 3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

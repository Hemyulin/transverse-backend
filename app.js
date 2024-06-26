require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const offerRoutes = require("./routes/offers.router");
const authRoutes = require("./routes/auth.router");
const socialRoutes = require("./routes/social.router");
const reviewRoutes = require("./routes/review.router");
const userRoutes = require("./routes/user.router");
const { authenticateToken } = require("./middleware/authenticateToken.js");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

//connect to mongo
mongoose
  .connect(MONGO_URI)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("There was an error connecting to the DB", err);
  });

//middleware

//ERROR HANDLER
const {
  errorHandler,
  notFoundHandler,
  AppError,
} = require("./middleware/error-handling");

//CORS
app.use(
  cors({
    origin: [FRONTEND_URL],
  })
);
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use(authRoutes);
app.use(socialRoutes);
app.use(offerRoutes);
app.use(reviewRoutes);
app.use(userRoutes);
app.use(authenticateToken);

//Error handler
app.use(errorHandler);

//Not found handler
app.use(notFoundHandler);

//listen
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});

// require("dotenv").config();
// const mongoose = require("mongoose");
// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const app = express();

// const offerRoutes = require("./routes/offers.router");
// const authRoutes = require("./routes/auth.router");
// const socialRoutes = require("./routes/social.router");
// const reviewRoutes = require("./routes/review.router");
// const userRoutes = require("./routes/user.router");
// const {authenticateToken} = require("./middleware/authenticateToken.js")

// //connect to mongo
// mongoose
//   .connect("mongodb://127.0.0.1:27017")
//   .then(console.log("Connected to MongoDB"))
//   .catch((err) => {
//     console.log("There was an error connecting to the DB", err);
//   });

// //middleware

// //ERROR HANDLER
// const {
//   errorHandler,
//   notFoundHandler,
//   AppError,
// } = require("./middleware/error-handling");

// //CORS
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:5005"],
//   })
// );
// app.use(express.json());
// app.use(morgan("dev"));

// //Routes
// app.use(authRoutes);
// app.use(socialRoutes);
// app.use(offerRoutes);
// app.use(reviewRoutes);
// app.use(userRoutes);
// //app.use(authenticateToken);




// const { authenticateToken } = require("./middleware/authenticateToken.js");


// //Error handler
// app.use(errorHandler);

// //Not found handler
// app.use(notFoundHandler);

// //listen
// const PORT = process.env.PORT || 5005;
// app.listen(PORT, () => {
//   console.log("Listening to port", PORT);
// });

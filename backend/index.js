const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const router = require("./Router/router");
const connectDB = require("./config/db");

//Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://res.cloudinary.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cross-Origin-Resource-Policy",
    ],
  })
);

// Add security headers
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(express.json());

// Connect to MongoDB
connectDB();

//Router
app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

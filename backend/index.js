const express = require("express")
require('dotenv').config();
const app = express()
const cors = require("cors")
const router = require("./Router/router");
const connectDB = require("../backend/config/db");


//Middleware
app.use(cors())
app.use(express.json())
// Connect to MongoDB
connectDB();
//Router
app.use('/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
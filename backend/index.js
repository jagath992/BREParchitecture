const express = require("express")
const app = express()
const cors = require("cors")
const router = require("./Router/router")
//Middleware

app.use(cors())
app.use(express.json())

app.use("/", router);

app.listen(5000,()=>{
  console.log("listening on server 5000");
})
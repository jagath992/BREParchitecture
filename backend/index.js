const express = require("express")
const app = express()
const cors = require("cors")

//Middleware

app.use(cors())
app.use(express.json())

app.listen(5000,()=>{
  console.log("listening on server 5000");
})
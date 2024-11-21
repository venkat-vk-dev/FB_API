const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
const bodyParser = require("body-parser");
var xhub = require("express-x-hub");
require("dotenv").config();

const webhookRouter = require("./routes/webhookRouter");

const app = express();

app.use(morgan("dev")); // Log all incoming requests for debugging
app.use(xhub({ algorithm: "sha1", secret: process.env.FB_APP_SECRET }));
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: false }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: false }));


app.get('/', (req,res) => {
  try {
    return res.status(200).json({ message: "HI FROM FB API v1.1" })
  } 
  catch (error) {
    console.log('Error in route /: ' + error)
    return res.status(500).json({ message: `Internal Server Error: ${error.message}` })  
  }
})

app.use("/webhooks", webhookRouter);


app.listen(3000, (req, res) => {
  console.log("Server listening on port 3000");
});

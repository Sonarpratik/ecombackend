const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const userRoute = require ("./routes/user")
const authRoute = require ("./routes/auth")
const userRoute = require ("./routes/user")
const productRoute = require ("./routes/product")
const orderRoute = require ("./routes/order")
const cartRoute = require ("./routes/cart")

const cors = require("cors")
app.use(cors());

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DBconnected successfull");
  })
  .catch((err) => {
    console.log(err);
  });


  app.use(express.json());
  app.use("/api/auth",authRoute);
  app.use("/api/user",userRoute);
  app.use("/api/product",productRoute);
  app.use("/api/carts",cartRoute);
  app.use("/api/orders",orderRoute);

//   header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE");
// header("Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin ,Authorization ");

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});

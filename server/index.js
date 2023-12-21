const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.port || 3000;
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connect to mongodb sucessfully"))
  .catch((err) => console.log("unable to connect to mongodb, get err", err));
const app = express();
app.use(express.json({ extend: true }));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Express JS on Vercel");
});
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
//route
const transactionRoute = require("./route/transaction.route");
const userRoute = require("./route/user.route");
app.use("/portfolio/transactions", transactionRoute);
app.use("/portfolio/user", userRoute);
//start the server
app.listen(port, () => {
  console.log("listen to port ", port);
});

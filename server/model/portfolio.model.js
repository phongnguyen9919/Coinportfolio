const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
    ref: "User",
  },
  userid: {
    type: String,
    require: true,
  },
  captital: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);

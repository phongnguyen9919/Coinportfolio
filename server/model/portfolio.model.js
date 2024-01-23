const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  userid: {
    type: String,
    require: true,
    ref: "User",
  },
  
  captital: {
    type: String,
    require: true,
  },
  investid: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "InvestOption"
  }],
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);

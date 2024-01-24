const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  userid: {
    type: String,
    require: true,
    ref: "User",
  },

  captital: {
    type: Number,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    default: 0,
  },
  investid: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InvestOption",
    },
  ],
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);

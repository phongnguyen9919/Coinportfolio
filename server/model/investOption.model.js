const mongoose = require("mongoose");

const InvestOptionSchema = new mongoose.Schema({
  userid: {
    type: String,
    require: true,
  },
  symbol: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  captital: {
    type: String,
    require: true,
  },
  coinType: {
    type: String,
  },
  img: {
    type: String,
  },
  revenue: {
    type: Number,
    default: 0,
  },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
});

module.exports = mongoose.model("InvestOption", InvestOptionSchema);

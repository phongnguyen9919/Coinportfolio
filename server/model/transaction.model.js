const mongoose = require("mongoose");
const TransactionSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  coin_name: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
});
// module.exports = mongoose.model("Transaction", TransactionSchema);
const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
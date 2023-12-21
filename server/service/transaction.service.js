
const transactionModel = require("../model/transaction.model");
const { ObjectId } = require('mongodb');
module.exports = {
  getTransactions: async () => {
    const transaction = await transactionModel.find({}).lean();
    return transaction;
  },
//   getTransactionByUserId: async () => {
//     const transactionId = await transactionModel.find();
//     return transactionIdl
//   }
  getTransaction: async (transactionId)=>{
    const transactionid = await transactionModel.findById({_id: new ObjectId(transactionId)});
    return transactionid;
  },
  createTransaction: async (body)=>{
  const newtransaction = await transactionModel.create(body)
    return newtransaction;
  },
  updateTransaction: async (id,body)=>{
    const updateTransaction = await transactionModel.findByIdAndUpdate(
      id,
      body,
      {new:  true}
    );
    return updateTransaction;
  },
  deleteTransaction: async (id) =>{
    await transactionModel.deleteOne({_id: new ObjectId(id)})
  }
};


const asyncHandler = require("express-async-handler");
const transactionModel = require("../model/transaction.model");
const transactionService = require("../service/transaction.service");
module.exports = {
  getTransactions: async (req, res) => {
    try {
      const transaction = await transactionService.getTransactions();
      res.status(200).json({
        msg: "Get transaction sucessfully",
        isSucess: true,
        data: transaction, 
      });
    } catch (error) {
      res.status(400).json({
        msg: "Unable to get transaction",
        isSucess: false,
        data: null,
        error: error,
      });
    }
  },
  getTransaction: asyncHandler(async (req,res) =>{
    const transaction = await transactionService.getTransaction(req.params.id);
    if(!transaction){
      res.status(404);
      throw new Error("Transaction not found!")
    }
    res.status(200).json(transaction);
  }),
  createTransaction: asyncHandler(async (req, res) =>{
    const {coin_name,price,amount,date,status} = req.body;
   
    if( !coin_name|| !price|| !amount|| !date|| !status){
      res.status(400);
    }
    const newtransaction = await transactionService.createTransaction({coin_name,price,amount,date,status})
    res.status(201).json(newtransaction);
  }),
  updateTransaction: asyncHandler(async (req,res) =>{
    const transaction =  await transactionModel.findById(req.params.id);
    if(!transaction){
      res.status(404);
      throw new Error("Transaction not Found");
    }
    console.log(req.body);
    updateTransaction = await transactionService.updateTransaction(req.params.id,req.body);
    console.log(updateTransaction);
    res.status(200).json(updateTransaction);
  }),
  deleteTransaction: asyncHandler(async (req,res) =>{
    const transaction =  await transactionModel.findById(req.params.id);
    if(!transaction){
      res.status(404);
      throw new Error("Transaction not Found");
    }
    res.status(200).json(transactionService.deleteTransaction(req.params.id))
  })
};


const transactionController = require("../controller/transaction.controller");
// const authMiddleware = require("../middlewares/auth");
// const transactionModel = require("../model/transaction.model");
const router = require("express").Router();

// router.get("/", authMiddleware, transactionController.getTransaction);
// router.get("/",cors(),transactionController.getTransactions);
router.route("/").get(transactionController.getTransactions).post(transactionController.createTransaction)
router.route("/:id").get(transactionController.getTransaction).put(transactionController.updateTransaction).delete(transactionController.deleteTransaction)
module.exports = router;

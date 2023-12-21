
const transactionController = require("../controller/transaction.controller");
const authMiddleware = require("../middlewares/auth");
const transactionModel = require("../model/transaction.model");
const cors = require("cors");
const router = require("express").Router();
// router.get("/transaction/:userid", cors(), async(req,res) => {
//     transaction.find({
        
//     })
// });
// router.get("/", authMiddleware, transactionController.getTransaction);
// router.get("/",cors(),transactionController.getTransactions);
router.route("/").get(authMiddleware,transactionController.getTransactions).post(transactionController.createTransaction)
router.route("/:id").get(transactionController.getTransaction).put(transactionController.updateTransaction).delete(transactionController.deleteTransaction)
module.exports = router;

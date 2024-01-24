const router = require("express").Router();
const investOptionController = require("../controller/investOption.controller");
const auth = require("../middlewares/auth");
router
  .route("/")
  .get(auth, investOptionController.getInvests)
  .post(auth, investOptionController.createInvest);
router
  .route("/:id")
  .get(auth, investOptionController.getInvest)
  .put(auth, investOptionController.updateInvest)
  .delete(auth, investOptionController.deleteInvest);

module.exports = router;

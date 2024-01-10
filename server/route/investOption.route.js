const router = require("express").Router()
const investOptionController = require("../controller/investOption.controller")


router.route("/").get(investOptionController.getInvests).post(investOptionController.createInvest)
router.route("/:id").get(investOptionController.getInvest).put(investOptionController.updateInvest).delete(investOptionController.deleteInvest)

module.exports = router;
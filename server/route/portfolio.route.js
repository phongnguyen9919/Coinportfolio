const router = require("express").Router();
const portfolioController = require("../controller/portfolio.controller");
const auth = require("../middlewares/auth");
auth
router
  .route("/portfolios/")
  .get(auth, portfolioController.getPortfolios)
  .post(auth, portfolioController.createPortfolio);
router
  .route("/portfolio/:id")
  .get(auth, portfolioController.getPortfolio)
  .put(auth, portfolioController.updatePortfolio)
  .delete(auth, portfolioController.deletePortfolio);

module.exports = router;

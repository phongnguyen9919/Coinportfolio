const router = require("express").Router();
const portfolioController = require("../controller/portfolio.controller");

router
  .route("/")
  .get(portfolioController.getPortfolios)
  .post(portfolioController.createPortfolio);
router
  .route("/:id")
  .get(portfolioController.getPortfolio)
  .put(portfolioController.updatePortfolio)
  .delete(portfolioController.deletePortfolio);


module.exports = router;

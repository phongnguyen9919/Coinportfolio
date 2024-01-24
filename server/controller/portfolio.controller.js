const expressAsyncHandler = require("express-async-handler");
const portfolioModel = require("../model/portfolio.model");
const portfolioService = require("../service/portfolio.service");
const investOptionModel = require("../model/investOption.model");

module.exports = {
  getPortfolios: expressAsyncHandler(async (req, res) => {
    const portfolios = await portfolioService.getPortfolios();
    if (!portfolios) {
      res.status(400).json({
        msg: "Unable to get portfolio option",
        isSucess: false,
        data: null,
      });
    }
    res.status(200).json({
      msg: "Get portfolio option sucessfully",
      isSucess: true,
      data: portfolios,
    });
  }),
  getPortfolio: expressAsyncHandler(async (req, res) => {
    const portfolio = await portfolioService.getPortfolio(req.params.id);
    if (!portfolio) {
      res.status(404);
      throw new Error("Portfolio not found!");
    }
    //calculate the total revenue
    let Revenue = 0;
    for (const id of portfolio.investid) {
      invest = await investOptionModel.findById(id);
      Revenue += invest.revenue;
    }
    portfolio.totalRevenue = Revenue;
    portfolio.save();
    res.status(200).json(portfolio);
  }),
  createPortfolio: expressAsyncHandler(async (req, res) => {
    const { id, userid, capital } = req.body;
    if (!userid || !id || !capital) {
      res.status(400);
    }

    const newportfolio = await portfolioService.createPortfolio({
      id,
      userid,
      capital,
    });
    res.status(200).json(newportfolio);
  }),
  updatePortfolio: expressAsyncHandler(async (req, res) => {
    const portfolio = await portfolioModel.findById(req.params.id);
    if (!portfolio) {
      res.status(404);
      throw new Error("Portfolio not found!");
    }
    updatePortfolio = await portfolioService.updatePortfolio(
      req.params.id,
      req.body
    );
  }),
  deletePortfolio: expressAsyncHandler(async (req, res) => {
    const portfolio = await portfolioModel.findById(req.params.id);
    if (!portfolio) {
      res.status(404);
      throw new Error("Portfolio not found");
    }
    res.status(200).json(portfolioService.deletePortfolio(req.params.id));
  }),
};

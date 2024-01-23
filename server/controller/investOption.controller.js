const expressAsyncHandler = require("express-async-handler");
const investOptionService = require("../service/investOption.service");
const investOptionModel = require("../model/investOption.model");
const { getAssetbySymbol } = require("../service/externalApiCoin.service");
const portfolioModel = require("../model/portfolio.model");
const { Error } = require("mongoose");

module.exports = {
  getInvests: expressAsyncHandler(async (req, res) => {
    const invests = await investOptionService.getInvests();
    if (!invests) {
      res.status(400).json({
        msg: "Unable to get invest option",
        isSucess: false,
        data: null,
      });
    }
    res.status(200).json({
      msg: "Get invest option sucessfully",
      isSucess: true,
      data: invests,
    });
  }),
  getInvest: expressAsyncHandler(async (req, res) => {
    const invest = await investOptionService.getInvest(req.params.id);
    if (!invest) {
      res.status(404);
      throw new Error("Invest not found!");
    }
    // revenue = investOptionService.totoalRevenue
    res.status(200).json(invest);
  }),
  createInvest: expressAsyncHandler(async (req, res) => {
    const { portid, symbol, capital, quantity, revenue } = req.body;
    if (!portid || !symbol || !capital) {
      res.status(400);
    }
    portfolio = await portfolioModel.findById(portid);
    if(!portfolio){
      throw new Error("Portfolio not found with id:"+`${portid}`);
    }
    
    // const revenue = investOptionService.totoalRevenue()

    asset = await getAssetbySymbol(symbol);

    coinType = asset.Data.ASSET_TYPE;
    img = asset.Data.LOGO_URL;
    const newinvest = await investOptionService.createInvest({
      portid,
      symbol,
      capital,
      quantity,
      coinType,
      img,
      revenue,
    });
    // console.log(newinvest)
    portfolio.investid.push(newinvest._id);
    portfolio.save();

    res.status(200).json(newinvest);
  }),
  updateInvest: expressAsyncHandler(async (req, res) => {
    const invest = await investOptionModel.findById(req.params.id);
    if (!invest) {
      res.status(404);
      throw new Error("Invest not found!");
    }
    updateInvest = await investOptionService.updateInvest(
      req.params.id,
      req.body
    );
  }),
  deleteInvest: expressAsyncHandler(async (req, res) => {
    const invest = await investOptionModel.findById(req.params.id);
    if (!invest) {
      res.status(404);
      throw new Error("Invest not found");
    }
    res.status(200).json(investOptionService.deleteInvest(req.params.id));
  }),
};

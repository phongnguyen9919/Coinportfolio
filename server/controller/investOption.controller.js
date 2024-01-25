const expressAsyncHandler = require("express-async-handler");
const investOptionService = require("../service/investOption.service");
const investOptionModel = require("../model/investOption.model");
const {
  getAssetbySymbol,
  getCoinPrice,
} = require("../service/externalApiCoin.service");
const portfolioModel = require("../model/portfolio.model");
const { Error } = require("mongoose");
const Transaction = require("../model/transaction.model");
const { calculatePnl } = require("../service/transaction.service");
const transactionService = require("../service/transaction.service");

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

    invest.populate("transactions").then(async (invest) => {
      //invest holding, capital, proceeds đã được tính khi tạo transaction rồi
      //curent price
      currentPrice = await getCoinPrice(invest.symbol);
      invest.balance = invest.holding * currentPrice;
      //transaction pnl = 0
      totalPnl = 0;
      for (transaction of invest.transactions) {
        if (transaction.pnl != null) {
          transaction.pnl = calculatePnl(
            transaction.quantity,
            currentPrice,
            transaction.price
          );
        }
        transaction.save();
      }

      //calculate averageNetCost
      if (!invest.totalProceeds) {
        invest.averageNetCost = invest.capital / invest.holding;
      } else {
        invest.averageNetCost =
          (invest.capital - invest.totalProceeds) / invest.holding;
      }

      //calculate total pnl in invest option
      invest.totalPnl = invest.balance - invest.averageNetCost * invest.holding;
      invest.pnl_percentage = invest.totalPnl / invest.capital;
      invest.save();
      res.status(200).json(invest);
    });
  }),
  createInvest: expressAsyncHandler(async (req, res) => {
    const { portid, symbol } = req.body;
    if (!portid || !symbol) {
      res.status(400);
    }
    portfolio = await portfolioModel.findById(portid);
    if (!portfolio) {
      throw new Error("Portfolio not found with id:" + `${portid}`);
    }

    // const revenue = investOptionService.totoalRevenue()

    asset = await getAssetbySymbol(symbol);

    coinType = asset.Data.ASSET_TYPE;
    img = asset.Data.LOGO_URL;
    const newinvest = await investOptionService.createInvest({
      portid,
      symbol,
      img,
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
    for (tran of invest.transactions) {
      delete tran;
    }
    port = await portfolioModel.findById(invest.portid);
    port.investid.filter((item) => item != invest._id);
    port.save();
    res.status(200).json(investOptionService.deleteInvest(req.params.id));
  }),
};

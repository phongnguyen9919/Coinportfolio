const expressAsyncHandler = require("express-async-handler");
const investOptionService = require("../service/investOption.service");
const investOptionModel = require("../model/investOption.model");
const { getAssetbySymbol } = require("../service/externalApiCoin.service");

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
    res.status(200).json(invest);
  }),
  createInvest: expressAsyncHandler(async (req, res) => {
    const { userid, symbol, capital, quantity } = req.body;
    if (!userid || !symbol || !capital) {
      res.status(400);
    }
    asset = await getAssetbySymbol(symbol);

    coinType = asset.Data.ASSET_TYPE;
    img = asset.Data.LOGO_URL;
    const newinvest = await investOptionService.createInvest({
      userid,
      symbol,
      capital,
      quantity,
      coinType,
      img,
    });
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

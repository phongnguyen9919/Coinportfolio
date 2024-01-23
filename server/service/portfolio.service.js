const { default: mongoose } = require("mongoose");
const portfolioModel = require("../model/portfolio.model");

module.exports = {
  getPortfolios: async () => {
    const portfolios = portfolioModel.find({}).lean();
    return portfolios;
  },
  getPortfolio: async (id) => {
    const portfolio = portfolioModel.findById(new mongoose.Types.ObjectId(id));
    return portfolio;
  },
  createPortfolio: async (body) => {
    const newPortfolio = await portfolioModel.create(body);
    return newPortfolio;
  },
  deletePortfolio: async (id) => {
    await portfolioModel.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
  },
  totoalRevenue: async (portfolios) => {
    revenue = 0;
    for (const portfolio of portfolios) {
      revenue += portfolio;
    }
    return revenue;
  },
};

const { default: mongoose, mongo } = require("mongoose");

const investOptionModel = require("../model/investOption.model");
module.exports = {
  getInvests: async () => {
    const invests = investOptionModel.find({}).lean();
    return invests;
  },
  getInvest: async (id) => {
    const invest = investOptionModel.findById(new mongoose.Types.ObjectId(id));
    return invest;
  },
  createInvest: async (body) => {
    const newInvest = await investOptionModel.create(body);
    return newInvest;
  },
  deleteInvest: async (id) => {
    await investOptionModel.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
  },
  totoalRevenue: async (invests) => {
    revenue = 0;
    for (const invest of invest) {
      revenue += invest;
    }
    return revenue;
  },
};

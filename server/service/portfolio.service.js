const  PortfolioModel = require("../model/portfolio.model");
module.exports = {
    getPortfolio: async (userid)=>{
        const portfolio =  await PortfolioModel.findOne({userid: userid});
        return portfolio;
    }
};

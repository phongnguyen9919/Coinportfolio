const PortfolioModel= require("../model/portfolio.model")
const portfolioService = require("../service/portfolio.service")
const PortfolioService = require("../service/portfolio.service")

module.exports = {
    getPortfolio: async(req, res)=>{
        try {
            const portfolio= await portfolioService.getPortfolio();
            res.status(200).json({
                msg: "Get portfolio sucessfully",
                isSucess: true,
                data: portfolio
        });
        } catch (error) {
            res.status(400).json({
                msg:" Unable to get portfolio",
                isSucess: false,
                data: null,
                error: error,
            });
        }   
    } 
}
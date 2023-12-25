const mongoose = require("mongoose");

const PortfolioSchema = mongoose.Schema({
    id:{
        type: String,
        require: true,
        ref: "User",
    },
    userid:{
        type: String,
        require:  true,
    },
    captital:{
        type: String,
        require: true,
    }
});

const Portfolio =  mongoose.model("Portfolio",PortfolioSchema);
module.exports =  Portfolio;
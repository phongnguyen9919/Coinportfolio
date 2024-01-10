const axios = require("axios");
const { URLSearchParams } = require("url");
// const dotenv = require("dotenv")
// dotenv.config()

const isExternalCoinApiActive = async () => {
  try {
    const url = process.env.COIN_GEKO_API;
    const response = await axios.get(url);
    return response.status == 200 ? true : false;
  } catch (error) {
    throw error;
  }
};
const getCoinById = async (tokenId) => {
  try {
    const queryParams = new URLSearchParams({
      localization: "false",
      tickers: "false",
      community_data: "false",
      developer_data: "false",
      sparkline: "false",
    });
    const url = `${
      process.env.COIN_GEKO_API
    }/coins/${tokenId}?${queryParams.toString()}`;
    const response = await axios.get(url);

    return {
      id: response?.data?.id,
      name: response?.data?.name,
      symbol: response?.data?.symbol,
      currentPrice: {
        inr: response?.data?.market_data?.current_price?.inr,
        usd: response?.data?.market_data?.current_price?.usd,
      },
    };
  } catch (e) {
    throw e
  }
};

export {isExternalCoinApiActive, getCoinById}
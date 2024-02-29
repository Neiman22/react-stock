import { stockAssets } from "./data";
import axios from "axios";

const STOCKS_URL = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json?iss.meta=off';
export const fetchStock = async () => {
  try {
    const response = await axios.get(STOCKS_URL);
    return response.data.securities;
  } catch (error) {
    console.error(error);
  }
}

export const fetchAssets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(stockAssets);
    }, 1)
  })
}
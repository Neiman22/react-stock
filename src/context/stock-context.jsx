import { createContext, useState, useEffect, useContext } from "react";
import { fetchAssets, fetchStock } from "../api";
import { percentDifference } from "../utils/utils";

const StockContext = createContext({
  assets: [],
  stocks: [],
  loading: false,
})

export const StockContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks]= useState([]);
  const [assets, setAssets]= useState([]);

  const mapAssets = (assets, data) => {
    return assets.map((asset) => {
      const stock = data.find(st => st[0] === asset.id);
      return {
        grow: asset.price < stock[3],
        currentPrice: stock[3],
        growPercent: percentDifference(asset.price, stock[3]),
        totalAmount: asset.amount * stock[3],
        totalProfit: asset.amount * (stock[3] - asset.price),
        name: stock[0],
        ...asset
      }
    })
  }

  useEffect(() => {
    const preload = async () => {
      setLoading(true);
      const { data } = await fetchStock();
      const assets = await fetchAssets();
      setStocks(data);
      setAssets(mapAssets(assets, data));
      setLoading(false);
    }
    preload();
  }, []);

  const addStock = (newStock) => {
    setAssets(prev => mapAssets([...prev, newStock], stocks));
  }

  return (
    <StockContext.Provider value={{ assets, stocks, loading, addStock }}>
      {children}
    </StockContext.Provider>)
}

export default StockContext;

export const useStock = () => {
  return useContext(StockContext);
}
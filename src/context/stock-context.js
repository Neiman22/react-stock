import { createContext } from "react"; 

const StockContext = createContext({
  assets: [],
  stocks: [],
  loading: false,
})
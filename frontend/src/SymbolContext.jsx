import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const Symbol = createContext();

const SymbolContext = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [isLogin, setIsLogin] = useState(false)
  const [symbol, setSymbol] = useState("IBM");
  const [func, setFunc] = useState("TIME_SERIES_DAILY")
  const [watchlist, setWatchlist] = useState([])

  return (
    <Symbol.Provider value={{ watchlist, setWatchlist, symbol, setSymbol, func, setFunc, user, setUser, isLogin, setIsLogin }}>
      {children}
    </Symbol.Provider>
  );
};

export default SymbolContext;

export const SymbolState = () => {
  return useContext(Symbol);
};

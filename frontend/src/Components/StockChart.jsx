import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { SymbolState } from '../SymbolContext';
import { Container, Typography, CircularProgress } from '@mui/material';

const StockChart = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState()
  const { symbol, func } = SymbolState();

  const API_URL = `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&apikey=demo`;

  const fetchStockData = async () => {
    try {
      const response = await axios.get(API_URL);
      if (response.data) {
        setStockData(response.data['Time Series (Daily)']);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message)
      setLoading(false);
    }
  };

  useEffect(() => { fetchStockData() }, []) 
  if (loading) return <div className='flex-c'><CircularProgress /></div>
  if (error) return <Typography variant='h6'>{error}</Typography>

  const formatDataForChart = () => {
    if (!stockData) return { labels: [], datasets: [] };
    const timestamps = Object.keys(stockData);
    const prices = timestamps.map(timestamp => parseFloat(stockData[timestamp]['4. close']));
    return {
      labels: timestamps,
      datasets: [
        {
          label: `Intraday Stock Prices for ${symbol}`,
          data: prices,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  };

  if (loading) return <div className='center-both'><CircularProgress /></div>;
  if (error) return <Typography variant='h6'>{error}</Typography>

  return (
    <div className="stock-chart-container">
      <Container>
        <Typography variant='h6'>Intraday Stock Prices for {symbol}</Typography>
        {stockData && <Line data={formatDataForChart()} />}
      </Container>
    </div>
  );
};

export default StockChart;

import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Container, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { SymbolState } from '../SymbolContext'

function CoinsTable() {
    const [data, setData] = useState([]);
    const [metaData, setMetaData] = useState({});
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { symbol, setSymbol, func, setFunc, watchlist, setWatchlist } = SymbolState()

    const API_URL = `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&apikey=demo`
    const fetchAPI = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            if (response.data) {
                const dailyData = response.data['Time Series (Daily)'];
                const metaData = response.data['Meta Data'];
                const formattedData = [];
                for (let date in dailyData) {
                    formattedData.push({
                        date: date,
                        open: parseFloat(dailyData[date]['1. open']),
                        high: parseFloat(dailyData[date]['2. high']),
                        low: parseFloat(dailyData[date]['3. low']),
                        close: parseFloat(dailyData[date]['4. close']),
                        volume: parseInt(dailyData[date]['5. volume'])
                    });
                }
                setData(formattedData);
                setMetaData(metaData);
                setLoading(false);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => { fetchAPI(); }, [func, symbol]);
    if (loading) return <div className='center-both'><CircularProgress /></div>
    if (error) return <div className='center-both'><Typography variant='h6'>{error}</Typography></div>

    function handleAdd() {
        const newItem = { symbol, func };
        if (!watchlist.some(item => item.symbol === symbol && item.func === func)) {
            setWatchlist([...watchlist, newItem]);
        } else {
            alert("Item already exists in the watchlist");
        }
    }

    return (
        <Container>
            <div className='container flex-v1'>

                <div className="choices flex-s">
                    <Select variant='outlined' value={func} onChange={e => setFunc(e.target.value)}>
                        <MenuItem value={"TIME_SERIES_DAILY"}>TIME_SERIES_DAILY</MenuItem>
                        <MenuItem value={"TIME_SERIES_INTRADAY"}>TIME_SERIES_INTRADAY</MenuItem>
                        <MenuItem value={"TIME_SERIES_WEEKLY"}>TIME_SERIES_WEEKLY</MenuItem>
                    </Select>
                    <Select variant='outlined' value={symbol} onChange={e => setSymbol(e.target.value)}>
                        <MenuItem value={"IBM"}>IBM</MenuItem>
                        <MenuItem value={"GOOG"}>GOOG</MenuItem>
                        <MenuItem value={"MSFG"}>MSFG</MenuItem>
                    </Select>
                </div>

                <div className="flex-s">
                    <Typography variant='h6'>Stock Prices for {metaData && metaData["2. Symbol"]}</Typography>
                    <Button variant='contained' onClick={handleAdd}>Add to Watchlist</Button>
                </div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {['Date', 'Open', 'High', 'Low', 'Close', 'Volume'].map(head => (
                                    <TableCell key={head}>{head}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((day, index) => (
                                <TableRow key={index}>
                                    <TableCell>{day.date}</TableCell>
                                    <TableCell>{day.open}</TableCell>
                                    <TableCell>{day.high}</TableCell>
                                    <TableCell>{day.low}</TableCell>
                                    <TableCell>{day.close}</TableCell>
                                    <TableCell>{day.volume}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </Container>
    )
}

export default CoinsTable

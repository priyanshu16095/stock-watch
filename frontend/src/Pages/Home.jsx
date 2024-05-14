import React from 'react'
import CoinsTable from '../Components/CoinsTable'
import Header from '../Components/Header'
import StockChart from '../Components/StockChart'

const Home = () => {
  return (
    <div className='home flex-v'>
      <Header />
      {/* <StockChart /> */}
      <CoinsTable />
    </div>
  )
}

export default Home

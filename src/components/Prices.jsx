import React from 'react'
import Currency from './Currency'
import Prayer from './Prayer'
import Weather from './Weather'

const Prices = () => {
  return (
    <div className='w-full min-h-[60vh] pb-[2vh] flex 
    flex-col sm:flex-row gap-[3vh] justify-center items-center'>
      <Currency />
      <Weather />
      <Prayer />
    </div>
  )
}

export default Prices

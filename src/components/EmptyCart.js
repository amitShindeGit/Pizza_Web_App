import React from 'react'
import Header from './Header'

const EmptyCart = () => {
  return (
    <div>
        <Header/>
        <h1 style={{ padding: '2rem' }}>YOUR CART IS EMPTY. PLEASE ADD PIZZAS TO IT.</h1>
    </div>
  )
}

export default EmptyCart
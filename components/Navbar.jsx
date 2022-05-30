import React from 'react';
import Link from 'next/link';
import {AiOutlineShopping} from 'react-icons/ai';
import { useStateContext } from '../context/stateContext';
import Cart from './Cart';

const Navbar = () => {

  const {totalQuantity,showCart,setShowCart} = useStateContext();

  return (
    <div className='navbar-container'>
       <p className='logo'>
            <Link href="/">PK Sounds</Link>
       </p>
       <button type='button' className='cart-icon' onClick={()=>setShowCart(true)}>
            <AiOutlineShopping/>
            <span className='cart-item-qty'>{totalQuantity}</span>
       </button>

       {showCart && <Cart/>}
    </div>
  )
}

export default Navbar
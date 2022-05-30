import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../context/stateContext";
import { urlFor } from "../lib/client";
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const {
    setShowCart,
    totalQuantity,
    totalPrice,
    cartItems,
    toggleCartItemQuanitity,
    onRemove,
    qty,
  } = useStateContext();

  const handleCheckout = async () => {
   
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');
    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => {
            setShowCart(false);
          }}
        >
          <AiOutlineLeft />
          <span className="heading">Your cart</span>
          <span className="cart-num-items">({totalQuantity} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your cart is empty.</h3>
            <Link href="/">
              <button
                className="btn"
                type="button"
                onClick={() => setShowCart(false)}
              >
                Continue shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((product) => (
              <div className="product" key={product._id}>
                <img
                  src={urlFor(product?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{product.name}</h5>
                    <h4>₹ {product.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={()=>toggleCartItemQuanitity(product._id,'dec')}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="minus">{product.quantity}</span>
                        <span
                          className="plus"
                          onClick={()=>toggleCartItemQuanitity(product._id,'inc')}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button className="remove-item" type="button" onClick={()=>onRemove(product)}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
                <h3>Subtotal</h3>
                <h3>₹ {totalPrice}</h3>
            </div>
            <div className="btn-container">
                <button type="buttton" className="btn" onClick={handleCheckout}>
                    Continue to payment
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;

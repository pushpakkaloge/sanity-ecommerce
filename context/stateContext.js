import React,{ useState, useContext, useEffect, createContext } from "react";
const Context = createContext();
import toast from "react-hot-toast";

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const increaseQuantityHandler = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQuantityHandler = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const addCartHandler=(product,quantity)=>{
      
        const productIsPresent  = cartItems.find((item)=> item._id=== product._id);

        setTotalPrice((prevPrice)=>prevPrice + product.price*quantity);
        setTotalQuantities((prevQuantity)=>prevQuantity+quantity);

        if(productIsPresent){
            const updatedCart = cartItems.map((cartProduct)=>{
                if(cartProduct._id === product._id) return{
                    ...cartProduct,
                    quantity:cartProduct.quantity+quantity,
                }
            })

            setCartItems(updatedCart);
        }else{
            product.quantity = quantity;
            setCartItems([...cartItems,{...product}])
        }
        toast.success(`${qty} ${product.name} added to cart`);
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantity,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        qty,
        increaseQuantityHandler,
        decreaseQuantityHandler,
        addCartHandler,
        toggleCartItemQuanitity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);


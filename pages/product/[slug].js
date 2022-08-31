import React, { useState } from "react";
import { client } from "../../lib/client";
import { urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar, 
} from "react-icons/ai";
import { Product } from "../../components";
import  {useStateContext}  from "../../context/stateContext";
import toast from "react-hot-toast";
const ProuctDetails = ({ product, products }) => {
  const [index, setIndex] = useState(0);
  const { image, name, details, price } = product;
  // const [showCart,setShowCart] = useState(false);
  
const {increaseQuantityHandler,decreaseQuantityHandler,qty,addCartHandler,setShowCart} = useStateContext();
const handleBuyNow = () => {
  addCartHandler(product, qty);
  setShowCart(true);
}

  return (
    <div>
      <div className="product-detail-container">
          <div>
        <div className="image-container">
          <img src={urlFor(image && image[index])} className='product-detail-image'/>
        </div>
        <div className='small-images-container'>
                {
                    image?.map((item,i)=>(
                        <img key={item._id} src={urlFor(item)} className={i===index? 'small-image selected-image':'small-image'} onMouseEnter={
                            ()=>setIndex(i)
                        }/>
                    ))
                }
            </div>
            </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(100)</p>
          </div>
          <h4>Details :</h4>
          <p>{details}</p>
          <p className="price">$ {price}</p>
          <div className="quantity">
            <h3>Quantity :</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQuantityHandler}>
                <AiOutlineMinus />
              </span>
              <span className="minus">{qty}</span>
              <span className="plus" onClick={increaseQuantityHandler}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button className="add-to-cart" type="button" onClick={()=>{addCartHandler(product,qty)}}>
              Add to cart
            </button>
            <button className="buy-now" type="button" onClick={handleBuyNow}>
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* bottom marquee */}
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product product={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type=="product"]{
        slug{
            current
        }
    }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type=="product" && slug.current=='${slug}'][0]`;
  const productsQuery = '*[_type=="product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: {
      product,
      products,
    },
  };
};

export default ProuctDetails;

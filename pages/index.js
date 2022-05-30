import React from "react";
import { Footer, Cart, FooterBanner, HeroBanner ,Product} from "../components";
import { client } from "../lib/client";

const Home = ({ products, banners }) => (
  <div>
    <HeroBanner bannerData={banners} />
    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>

    <div className="products-container">
      {products?.map((product) => 
        <Product key={product._id} product={product} />
      )}
    </div>

    <FooterBanner footerData={banners && banners[0]}/>
  </div>
);

export const getServerSideProps = async () => {
  const productsquery = '*[_type=="product"]';
  const products = await client.fetch(productsquery);

  const bannersquery = '*[_type=="banner"]';
  const banners = await client.fetch(bannersquery);

  return {
    props: {
      products,
      banners,
    },
  };
};

export default Home;

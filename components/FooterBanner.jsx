import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'

const FooterBanner = ({footerData}) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{footerData.discount}</p>
          <h3>{footerData.largeText1}</h3>
          <h3>{footerData.largeText2}</h3>
          <p>{footerData.saleTime}</p>
        </div>
        
        <div className='right'>
          <p></p>
          <h3>{footerData.midText}</h3>
          <p>{footerData.desc}</p>
          <Link href={`/product/${footerData.product}`}>
            <button type='button'>
              {footerData.buttonText}
            </button>
          </Link>
        </div>

        <img src={urlFor(footerData.image)} className="footer-banner-image" alt="image"/>
      </div>
    </div>
  )
}

export default FooterBanner
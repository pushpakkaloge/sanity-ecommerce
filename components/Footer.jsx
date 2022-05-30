import React from 'react'
import {AiFillInstagram,AiOutlineTwitter,AiFillGithub} from 'react-icons/ai'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022@pushpak kaloge. All rights reserved.</p>
      <p className='icons'>
        <Link href="www.google.com">
          <AiFillInstagram/>
        </Link>
        <AiFillGithub/>
        {/* <AiOutlineTwitter/> */}
      </p>
    </div>
  )
}

export default Footer
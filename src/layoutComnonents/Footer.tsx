import React from 'react'
import facebook from '../icons/facebook.png'
import insta from '../icons/instagram.png'
import twitter from '../icons/twitter.png'
import '../styles/layout.css'

const Footer: React.FC = () => {
  return (
    <div>
      <div className="border"></div>
      <div className="footer">
        <img src={facebook} />
        <img src={insta} />
        <img src={twitter} />
      </div>
    </div>
  )
}

export default Footer
import React from 'react'
import facebook from '../icons/facebook.png'
import insta from '../icons/instagram.png'
import twitter from '../icons/twitter.png'
import '../styles/layout.css'

const Footer: React.FC = () => {
  return (
    <div className="footer_div">
      <div className="border"></div>
      <div className="footer">
        <img className="sm_icon" src={facebook} />
        <img className="sm_icon" src={insta} />
        <img className="sm_icon" src={twitter} />
      </div>
      <p style={{ fontSize: '0.8rem' }}>
        © 2021 Cakebookwitter created by P.Mazur
      </p>
    </div>
  )
}

export default Footer

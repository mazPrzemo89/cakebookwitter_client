import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../styles/header.css'
import homeButton from '../icons/house.png'

const Header: React.FC = () => {
  const location = useLocation()
  return (
    <div className="headerDiv">
      <Link to="/" className="headerLink">
        <h1 className="headerText">Cakebookwitter</h1>
        {location.pathname !== '/' && <img src={homeButton} />}
      </Link>
    </div>
  )
}

export default Header

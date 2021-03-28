import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../styles/header.css'

const Header: React.FC = () => {
  let location = useLocation()
  return (
    <div className="headerDiv">
      <Link to="/" className="headerLink">
        <h1 className="headerText">Cakebookwitter</h1>
      </Link>
    </div>
  )
}

export default Header

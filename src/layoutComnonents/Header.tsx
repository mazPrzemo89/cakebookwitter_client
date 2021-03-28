import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/header.css'

const Header: React.FC = () => {
  return (
    <div className="headerDiv">
      <Link to="/" className="headerLink">
        <h1 className="headerText">Cakebookwitter</h1>
      </Link>
    </div>
  )
}

export default Header

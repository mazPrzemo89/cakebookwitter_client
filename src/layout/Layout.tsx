import React from 'react'
import './layout.css'
import Header from './Header'
const Layout: React.FC = (props) => {
  return (
    <div className="layout">
      <Header />
      {props.children}
    </div>
  )
}

export default Layout

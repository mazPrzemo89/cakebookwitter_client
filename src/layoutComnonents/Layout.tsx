import React from 'react'
import '../styles/layout.css'
import Header from './Header'
import Footer from './Footer'

const Layout: React.FC = (props) => {
  return (
    <div className="layout">
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout

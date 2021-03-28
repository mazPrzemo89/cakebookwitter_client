import React, { useState } from 'react'
import '../styles/layout.css'
import Header from './Header'
import Footer from './Footer'

const Layout: React.FC = (props) => {
  const [showFooter, setShowFooter] = useState<boolean>(false)
  setTimeout(() => {
    setShowFooter(true)
  }, 300)
  return (
    <div className="layout">
      <Header />
      {props.children}
      {showFooter && <Footer />}
    </div>
  )
}

export default Layout

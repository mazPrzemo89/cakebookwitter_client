import React from 'react'
import './layout.css'
const Layout: React.FC = (props) => {
  return <div className="layout">{props.children}</div>
}

export default Layout

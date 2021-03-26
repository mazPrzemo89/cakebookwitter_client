import React from 'react'
import { Link } from 'react-router-dom'
import Cakes from './components/Cakes'
import Layout from './layout/Layout'

const FrontPage: React.FC = () => {
  return (
    <Layout>
      <Link to={'./addcake'}>
        <button>Add new cake</button>
      </Link>

      <Cakes />
    </Layout>
  )
}

export default FrontPage

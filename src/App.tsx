import React from 'react'
import Header from './layout/Header'
import Cakes from './components/Cakes'
import Layout from './layout/Layout'

const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Cakes />
    </Layout>
  )
}

export default App

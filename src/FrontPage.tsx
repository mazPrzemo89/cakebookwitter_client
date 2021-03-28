import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cakes from './components/Cakes'
import { fetchCakes } from './APIs/cakeAPIs'
import Layout from './layoutComnonents/Layout'
import './styles/sharedStyles.css'
interface Cake {
  id: number
  name: string
  comment: string
  yumFactor: number
  imageUrl: string
}

const FrontPage: React.FC = () => {
  const [cakes, setCakes] = useState<Cake[]>([])

  const init = () => {
    fetchCakes().then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else setCakes(data)
    })
  }

  useEffect(() => {
    init()
  }, [])

  const welcomeMessage = () => {
    return (
      <div className="welcomeMessageDiv">
        <p className="welcomeMessage">
          Welcome to Cakebookwitter! We've got a collection of delicious cakes
          for you to browse, add and remove existing cake from the list. Which
          is the most delicious? Thats for you to decide! click on a cake to
          find out more.
        </p>
      </div>
    )
  }

  return (
    <Layout>
      {welcomeMessage()}
      <Cakes cakes={cakes} />
      <Link to={'./addcake'}>
        <button className="new_cake_button buttons">Add new cake</button>
      </Link>
    </Layout>
  )
}

export default FrontPage

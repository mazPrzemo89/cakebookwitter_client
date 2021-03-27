import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cakes from './components/Cakes'
import { fetchCakes, deleteCake } from './APIs/cakeAPIs'
import Layout from './layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { UrlState } from './urlReducer'
import './layout/sharedStyles.css'
interface Cake {
  id: number
  name: string
  comment: string
  yumFactor: number
  imageUrl: string
}

const FrontPage: React.FC = () => {
  const url = useSelector<UrlState, UrlState['url']>((state) => state.url)

  const [cakes, setCakes] = useState<Cake[]>([])
  const [deleted, setDeleted] = useState(false)
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
          Welcome to Cakebookwitter! We've got a collection of delicious cakes,
          click on one of them to find out more about it. Feel free to add new
          cakes and remove the old ones if you know any tastier ones.
        </p>
      </div>
    )
  }

  return (
    <Layout>
      <Link to={'./addcake'}>
        <button className="new_cake_button buttons">Add new cake</button>
      </Link>
      {welcomeMessage()}
      <Cakes cakes={cakes} />
    </Layout>
  )
}

export default FrontPage

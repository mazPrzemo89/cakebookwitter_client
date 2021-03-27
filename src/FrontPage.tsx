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
  const dispatch = useDispatch()

  const changeUrl = (url: string) => {
    dispatch({ type: 'CHANGE_URL', payload: url })
  }

  const [cakes, setCakes] = useState<Cake[]>([])
  const [deleted, setDeleted] = useState(false)
  const init = () => {
    fetchCakes().then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else setCakes(data)
    })
  }

  const onDeleteCakeHandler = (cakeId: number) => {
    deleteCake(cakeId.toString())
    setDeleted(true)
    init()
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Layout>
      <Link to={'./addcake'}>
        <button className="new_cake_button buttons">Add new cake</button>
      </Link>

      <Cakes cakes={cakes} onDeleteCake={onDeleteCakeHandler} />
    </Layout>
  )
}

export default FrontPage

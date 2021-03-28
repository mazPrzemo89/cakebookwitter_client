import React, { useState, useEffect } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import Layout from '../layoutComnonents/Layout'
import { useSelector } from 'react-redux'
import { UrlState } from '../urlReducer'
import { fetchCake, deleteCake } from '../APIs/cakeAPIs'
import Cookies from 'universal-cookie'
import StarRatingComponent from 'react-star-rating-component'
import '../styles/cake.css'
import '../styles/sharedStyles.css'

interface Cake {
  comment: string
  name: string
  id: number
  yumFactor: number
  imageUrl: string
}

const Cake: React.FC = () => {
  const location = useLocation()
  if (location.pathname !== '/cake') {
    window.scroll(0, 0)
  }

  const url = useSelector<UrlState, UrlState['url']>((state) => state.url)
  const [cakeData, setCakeData] = useState<Cake>()
  const [deleted, setDeleted] = useState<boolean>(false)
  const [toggleId, setToggleId] = useState<boolean>(false)
  const [toggleDelete, setToggleDelete] = useState<boolean>(false)
  const cookies = new Cookies()
  const init = () => {
    if (url !== '') {
      fetchCake(url).then((data) => {
        setCakeData(data)
      })
    } else {
      fetchCake(cookies.get('url')).then((data) => {
        setCakeData(data)
      })
    }
  }

  useEffect(() => {
    init()
  }, [])

  const deleteCakeHandler = (cakeId: number) => {
    deleteCake(cakeId.toString()).then((_data) => {
      setDeleted(true)
    })
  }

  const showId = () => {
    if (toggleDelete === true) {
      setToggleDelete(!toggleDelete)
    }
    setToggleId(!toggleId)
  }

  const cakeId = () => {
    return <h2 style={{ marginBottom: '32px' }}>{cookies.get('url')}</h2>
  }

  const showDelete = () => {
    window.scroll(0, 2000)
    if (toggleId === true) {
      setToggleId(!toggleId)
    }
    setToggleDelete(!toggleDelete)
  }

  const deleteButtons = (id: number) => {
    return (
      <div>
        <h2 className="delete_prompt">Are you sure?</h2>
        <div className="delete_buttons_div">
          <button
            style={{ backgroundColor: 'green' }}
            className="delete_buttons"
            onClick={() => deleteCakeHandler(id)}
          >
            Yes
          </button>
          <button
            style={{ backgroundColor: 'red' }}
            className="delete_buttons"
            onClick={showDelete}
          >
            No
          </button>
        </div>
      </div>
    )
  }

  const yumFactorComponent = (rating: number) => {
    return (
      <div className="yum_factor_div">
        <p className="yum_factor_title">Yum Factor:</p>
        <StarRatingComponent
          name="rate2"
          editing={false}
          renderStarIcon={() => <span className="yum_factor_rating">★</span>}
          starCount={5}
          value={rating}
        />
      </div>
    )
  }

  const cake = () => {
    return (
      <div className="cake_display">
        <h2 className="cake_display_title">{cakeData?.name}</h2>
        <div className="cake_display_image_div">
          <img
            className="cake_display_image"
            alt={''}
            src={cakeData?.imageUrl}
          />
        </div>
        <h2 className="cake_comment_header">About the cake:</h2>
        <div className="cake_display_comment_div">
          <div className="cake_display_comment">{cakeData?.comment}</div>
        </div>
        {yumFactorComponent(cakeData?.yumFactor as number)}
        <div className="yum_factor_bottom_block"></div>
        <div className="cake_buttons_div">
          <button className="buttons new_cake_button" onClick={showDelete}>
            Delete cake
          </button>
          {toggleDelete && deleteButtons(cakeData?.id as number)}
          {toggleId && cakeId()}
          <button
            style={{ marginTop: '0' }}
            className="buttons new_cake_button"
            onClick={() => showId()}
          >
            Retrieve cake id
          </button>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      {cakeData && cake()}
      {deleted && <Redirect to="/" />}
    </Layout>
  )
}

export default Cake

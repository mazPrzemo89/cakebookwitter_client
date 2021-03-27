import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../layout/Layout'
import { useSelector } from 'react-redux'
import { UrlState } from '../urlReducer'
import { fetchCake, deleteCake } from '../APIs/cakeAPIs'
import Cookies from 'universal-cookie'
import StarRatingComponent from 'react-star-rating-component'
import './cake.css'
import '../layout/sharedStyles.css'

interface Cake {
  comment: string
  name: string
  id: number
  yumFactor: number
  imageUrl: string
}

const Cake: React.FC = () => {
  const url = useSelector<UrlState, UrlState['url']>((state) => state.url)
  const [cakeData, setCakeData] = useState<Cake>()
  const [deleted, setDeleted] = useState<boolean>(false)
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

  const yumFactorComponent = (rating: number) => {
    console.log(rating)
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
          <img className="cake_display_image" src={cakeData?.imageUrl} />
        </div>
        <h2 className="cake_comment_header">About the cake:</h2>
        <div className="cake_display_comment_div">
          <div className="cake_display_comment">{cakeData?.comment}</div>
        </div>
        {yumFactorComponent(cakeData?.yumFactor as number)}
        <div className="yum_factor_bottom_block"></div>
        <button
          className="buttons new_cake_button"
          onClick={() => deleteCakeHandler(cakeData?.id as number)}
        >
          delete cake
        </button>
      </div>
    )
  }

  console.log(cakeData)
  return (
    <Layout>
      {cakeData && cake()}
      {deleted && <Redirect to="/" />}
    </Layout>
  )
}

export default Cake

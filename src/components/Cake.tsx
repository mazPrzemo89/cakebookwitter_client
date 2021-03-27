import React, { useState, useEffect } from 'react'
import Layout from '../layout/Layout'
import { useSelector } from 'react-redux'
import { UrlState } from '../urlReducer'
import { fetchCake } from '../APIs/cakeAPIs'
import StarRatingComponent from 'react-star-rating-component'

interface Cake {
  comment: string
  name: string
  id: string
  yumFactor: number
  imageUrl: string
}

const Cake: React.FC = () => {
  const url = useSelector<UrlState, UrlState['url']>((state) => state.url)
  const [cakeData, setCakeData] = useState<Cake>()
  const init = () => {
    fetchCake(url).then((data) => {
      setCakeData(data)
    })
  }

  useEffect(() => {
    init()
  }, [])

  const yumFactorComponent = (rating: number) => {
    console.log(rating)
    return (
      <div>
        <p>Yum Factor:</p>
        <StarRatingComponent
          name="rate2"
          editing={false}
          renderStarIcon={() => <span>★</span>}
          starCount={5}
          value={rating}
        />
      </div>
    )
  }

  const cake = () => {
    return (
      <div>
        <h2>{cakeData?.name}</h2>
        <img src={cakeData?.imageUrl} />
        <div>{cakeData?.comment}</div>
        {yumFactorComponent(cakeData?.yumFactor as number)}
      </div>
    )
  }

  console.log(cakeData)
  return <Layout>{cakeData && cake()}</Layout>
}

export default Cake

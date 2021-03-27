import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../layout/sharedStyles.css'
import './cakes.css'

interface CakesProps {
  cakes: {
    id: number
    name: string
    imageUrl: string
  }[]
  onDeleteCake: (id: number) => void
}

const Cakes: React.FC<CakesProps> = (props) => {
  const dispatch = useDispatch()
  const [cakeFromProps, setCakesFormProps] = useState([])
  const changeUrl = (url: string) => {
    dispatch({ type: 'CHANGE_URL', payload: url })
  }

  const cakes = () => {
    if (props.cakes && props.cakes.length > 0) {
      return props.cakes.map((cake) => (
        <div key={cake.id} className="cakeDiv">
          <Link to={`/cake`}>
            <div className="cake_image_div">
              <img
                className="cake_image"
                onClick={() => {
                  changeUrl(cake.id.toString())
                }}
                src={cake.imageUrl}
              />
            </div>
          </Link>
          <div className="cake_title">{cake.name}</div>
          {/* <button onClick={() => props.onDeleteCake(cake.id)}>
            delete cake
          </button> */}
        </div>
      ))
    }
  }

  return <div className="cakesContent">{cakes()}</div>
}

export default Cakes

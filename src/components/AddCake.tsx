import React, { useState, useEffect, useRef, Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { validator } from '../validator'
import { addCake } from '../APIs/cakeAPIs'
import Layout from '../layout/Layout'

interface CakeValues {
  id: {
    value: number
    validation: {
      required: boolean
      valid: boolean
      touched: boolean
    }
  }
  name: {
    value: string
    validation: {
      required: boolean
      valid: boolean
      touched: boolean
    }
  }
  comment: {
    value: string
    validation: {
      required: boolean
      valid: boolean
      touched: boolean
    }
  }
  yumFactor: number
  photo: {
    value: any
    validation: {
      required: boolean
      valid: boolean
      touched: boolean
    }
  }
}
const initialState = {
  id: {
    value: 0,
    validation: {
      required: true,
      valid: false,
      touched: false,
    },
  },
  name: {
    value: '',
    validation: {
      required: true,
      valid: false,
      touched: false,
    },
  },
  comment: {
    value: '',
    validation: {
      required: true,
      valid: false,
      touched: false,
    },
  },
  yumFactor: 5,
  photo: {
    value: '',
    validation: {
      required: true,
      valid: false,
      touched: false,
    },
  },
}

const AddCake: React.FC = () => {
  const [formData, setFromValues] = useState<FormData>(new FormData())
  const [state, setValues] = useState<CakeValues>(initialState)

  const [errMsgObj, setErrMsgObj] = useState<object>({})
  const [errMsg, setErrMsg] = useState<string>('')
  const init = () => {
    formData.set('yumFactor', state.yumFactor.toString())
  }

  useEffect(() => {
    init()
  }, [])

  // handlers

  const cakeSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    addCake(formData).then((data) => {
      if (data.error) {
        setErrMsgObj(data)
        setErrMsg(data.error)
      } else {
        setValues(initialState)
      }
    })
  }

  const handleChange = (name: string) => (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.currentTarget.value
    let isError = validator(name, value)
    if (isError) {
      setErrMsgObj(isError as object)
      setErrMsg(isError[Object.keys(isError)[0]])
      console.log(
        'In Error:',
        isError,
        ' Error Message:',
        isError[Object.keys(isError)[0]],
      )
    } else {
      setErrMsg('')
    }
    formData.set(name, value)
    setValues({ ...state, [name]: value })
  }

  const handleFile = (e: any) => {
    const photo = e.currentTarget.files[0]
    formData.set('photo', photo)
    setValues({ ...state, photo: photo })
  }

  const onStarClick = (nextValue: number, prevValue: number, name: string) => {
    setValues({ ...state, yumFactor: nextValue })
    formData.set('yumFactor', state.yumFactor.toString())
  }

  //HTML elements

  const yumFactorInput = () => {
    return (
      <div>
        <h3>How yummy is your cake?</h3>
        <div style={{ fontSize: '2.5rem' }}>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={state.yumFactor}
            onStarClick={onStarClick}
          />
        </div>
      </div>
    )
  }

  const cakeForm = () => {
    return (
      <form onSubmit={cakeSubmitHandler}>
        <div>
          <label htmlFor="cake-id">ID:</label>
          <input
            onChange={handleChange('id')}
            type="number"
            id="cake-id"
            value={state.id.value === 0 ? '' : state.id.value}
          />
        </div>
        <div>
          <label htmlFor="cake-name">Name:</label>
          <input
            onChange={handleChange('name')}
            type="text"
            id="cake-name"
            value={state.name.value}
          />
        </div>
        <div>
          <label htmlFor="cake-comment">Comment:</label>
          <textarea
            onChange={handleChange('comment')}
            value={state.comment.value}
          ></textarea>
        </div>
        <div>
          <label className="btn btn-secondary">
            <input
              style={{ backgroundColor: 'white' }}
              onChange={handleFile}
              type="file"
              name="photo"
              accept="image/*"
            />
          </label>
        </div>
        {yumFactorInput()}
        {errMsg && (
          <div style={{ fontSize: '1.4rem', color: '#6F0000' }}>{errMsg}</div>
        )}
        <button>Add cake</button>
      </form>
    )
  }

  return <Layout>{cakeForm()}</Layout>
}

export default AddCake

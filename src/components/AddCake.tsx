import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component'
import { validator } from '../validator'
import { addCake } from '../APIs/cakeAPIs'
import { useDispatch } from 'react-redux'
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
const initialValues = {
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
  const [formData, _setFromValues] = useState<FormData>(new FormData())
  const [state, setValues] = useState<CakeValues>(initialValues)
  const [errMsg, setErrMsg] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [redirectId, setRedirectID] = useState('')
  const init = () => {
    formData.set('yumFactor', state.yumFactor.toString())
  }
  const dispatch = useDispatch()
  const changeUrl = (url: string) => {
    dispatch({ type: 'CHANGE_URL', payload: url })
  }
  console.log(state.id.value)
  useEffect(() => {
    init()
  }, [])

  // handlers

  const cakeSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    addCake(formData).then((data) => {
      if (data.error) {
        setErrMsg(data.error)
      } else {
        console.log(state.id.value)
        setSuccess(true)
        setValues(initialValues)
      }
    })
  }

  const handleChange = (name: string) => (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let value = event.currentTarget.value
    let isError = validator(name, value)
    if (isError) {
      setErrMsg(isError[Object.keys(isError)[0]])
    } else {
      setErrMsg('')
    }

    if (name === 'id') {
      changeUrl(value)
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

  return (
    <Layout>
      {cakeForm()}
      {success && <Redirect to={`/cake`} />}
    </Layout>
  )
}

export default AddCake

import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component'
import { validator } from '../validator'
import { addCake } from '../APIs/cakeAPIs'
import { useDispatch } from 'react-redux'
import Layout from '../layoutComnonents/Layout'
import '../styles/cakeFormStyles.css'
import '../styles/sharedStyles.css'

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

  const init = () => {
    formData.set('yumFactor', state.yumFactor.toString())
  }
  const dispatch = useDispatch()
  const changeUrl = (url: string) => {
    dispatch({ type: 'CHANGE_URL', payload: url })
  }

  useEffect(() => {
    init()
  }, [])

  // handlers
  let id
  const cakeSubmitHandler = (event: React.FormEvent) => {
    id = Math.floor(Date.now() * (Math.random() * Math.random())).toString()
    event.preventDefault()
    formData.set('id', id)
    changeUrl(id)
    addCake(formData).then((data) => {
      console.log(data)
      if (data.error) {
        setErrMsg(data.error)
        console.log('erro')
      } else {
        console.log('went to this block')
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
        <p
          className="cake_form_label"
          style={{ fontSize: '2rem', marginBottom: '0.8rem' }}
        >
          How yummy is your cake?
        </p>
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
      <div className="cake_form">
        <form onSubmit={cakeSubmitHandler}>
          {/* <div>
            <div className="cake_form_label_div">
              <label className="cake_form_label" htmlFor="cake-id">
                ID:
              </label>
            </div>
            <input
              className="cake_form_text_input"
              onChange={handleChange('id')}
              type="number"
              id="cake-id"
              value={state.id.value === 0 ? '' : state.id.value}
            />
          </div> */}
          <div>
            <div className="cake_form_label_div">
              <label className="cake_form_label" htmlFor="cake-name">
                Name:
              </label>
            </div>
            <input
              className="cake_form_text_input"
              onChange={handleChange('name')}
              type="text"
              id="cake-name"
              value={state.name.value}
            />
          </div>
          <div>
            <div className="cake_form_label_div">
              <label className="cake_form_label" htmlFor="cake-comment">
                Comment:
              </label>
            </div>
            <textarea
              className="cake_form_comment"
              onChange={handleChange('comment')}
              value={state.comment.value}
            ></textarea>
          </div>
          <div>
            <div className="cake_form_label_div">
              <label className="cake_form_label">Image</label>
            </div>
            <input
              style={{ backgroundColor: 'white' }}
              onChange={handleFile}
              type="file"
              name="photo"
              accept="image/*"
            />
          </div>
          {yumFactorInput()}

          <button className="buttons new_cake_button">Add cake</button>
        </form>
      </div>
    )
  }

  const addCakeTitle = () => {
    return (
      <div>
        <h2 className="cake_form_title">Bake your cake!</h2>
      </div>
    )
  }

  const errorMessage = () => {
    return (
      <div className="err_msg_div">
        <div className="err_msg_text_holder">
          <p className="err_msg">{errMsg}</p>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      {addCakeTitle()}
      {errMsg && errorMessage()}
      {cakeForm()}
      {success && <Redirect to={`/cake`} />}
    </Layout>
  )
}

export default AddCake

import React, { useEffect, useState } from 'react'
import styles from './auth.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../../assets/login.png'
import Card from '../../components/Card/Card'
import { toast } from 'react-toastify'
import { validateEmail } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { register, resetAuth } from '../../redux/features/auth/authSlice'
import Loader from '../../components/Loader/Loader'

const Register = () => {
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const { loading, success, loggedIn } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const handleChange = async (e) => {
    const {id, value} = e.target
    setFormData({
      ...formData,
      [id]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasNumber = /\d/.test(formData.password)
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return toast.error('All fields are required!')
    }
    if (formData.password.length < 6 || !hasNumber) {
      return toast.error('Password must be at least 6 characters long and must contain at least one number')
    }
    if (!validateEmail(formData.email)) {
      return toast.error('Please enter a valid email')
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match!')
    }
    await dispatch(register(formData))
  }
  
  useEffect(() => {
    if (success && loggedIn) {
      navigate('/')
    }
    dispatch(resetAuth())
  }, [success, loggedIn, dispatch, navigate])
  return (
    <>
      {loading && <Loader />}
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
          type="text"
          placeholder="Name"
          id="name"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm password"
          id="confirmPassword"
          onChange={handleChange}
        />
          <button type='submit' className='--btn --btn-primary
          --btn-block'>
            Register
          </button>
          </form>
          <span className={styles.register}>
            <p>Already have an account? </p>
            <Link to={'/login'}>Login</Link>
          </span>
        </div>

      </Card>

      <div className={styles.img}>
      <img src={loginImg} alt="Login" width={400} />
      </div>
    </section>
    </>
  )
}

export default Register
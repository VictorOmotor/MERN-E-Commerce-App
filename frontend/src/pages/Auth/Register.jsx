import React, { useState } from 'react'
import styles from './auth.module.scss'
import { Link } from 'react-router-dom'
import loginImg from '../../assets/login.png'
import Card from '../../components/Card/Card'

const Register = () => {
  const [formData, setFormData] = useState({})

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = () => {

  }
  
  return (
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
            Login
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
  )
}

export default Register
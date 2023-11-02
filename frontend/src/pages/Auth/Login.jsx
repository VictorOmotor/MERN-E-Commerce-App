import React, { useEffect, useState } from 'react';
import styles from './auth.module.scss';
import loginImg from '../../assets/login.png';
import Card from '../../components/Card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetAuth } from '../../redux/features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, success, loggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasNumber = /\d/.test(password);
    if (!email || !password) {
      return toast.error('Both fields are required!');
    }
    if (password.length < 6 || !hasNumber) {
      return toast.error('Invalid login details');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    const formData = {
      email,
      password,
    };
    await dispatch(login(formData));
  };

  useEffect(() => {
    if (success && loggedIn) {
      navigate('/');
    }
    dispatch(resetAuth());
  }, [success, loggedIn, dispatch, navigate]);

  return (
    <>
      {loading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width={400} />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="--btn --btn-primary
          --btn-block"
              >
                Login
              </button>
            </form>
            <span className={styles.register}>
              <p>Don't have an account? </p>
              <Link to={'/register'}>Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;

import React, { useState } from 'react';
import styles from './Header.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { logout, resetAuth } from '../../redux/features/auth/authSlice';

export const logo = (
  <div className={styles.logo}>
    <Link to={'/'}>
      <h2>
        Shop<span>Ito</span>
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fixNavBar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener('scroll', fixNavBar);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };
  const cart = (
    <span className={styles.cart}>
      <Link to={'/cart'}>
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  );

  const handleLogout = async (e) => {
    await dispatch(logout());
    await dispatch(resetAuth());
    navigate('/login');
  };
  return (
    <header className={scrollPage ? `${styles.fixed}` : ''}>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}`
                : `${styles['nav-wrapper']}`
            }
            onClick={hideMenu}
          ></div>
          <ul>
            <li className={styles['logo-mobile']}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to={'/shop'} className={activeLink}>
                Shop
              </NavLink>
            </li>
          </ul>

          <div className={styles['header-right']}>
            <span className={styles.links}>
              <NavLink to={'login'} className={activeLink}>
                Login
              </NavLink>
              <NavLink to={'register'} className={activeLink}>
                Register
              </NavLink>
              <NavLink to={'order-history'} className={activeLink}>
                My Order
              </NavLink>
              <NavLink to={'/'} onClick={handleLogout}>
                Logout
              </NavLink>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles['menu-icon']}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import styles from './Loader.module.scss';
import ReactDOM from 'react-dom';
import loaderImg from '../../assets/loader.gif';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loading" />
      </div>
    </div>,
    document.getElementById('loader'),
  );
};

export default Loader;

export const Spinner = () => {
  return (
    <div className="--center-all">
      <img src={loaderImg} alt="Loading" width={30} />
    </div>
  );
};

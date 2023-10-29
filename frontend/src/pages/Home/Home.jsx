import React from 'react';
import Slider from '../../components/Slider/Slider';
import './Home.scss'
import HomeInfoBox from './HomeInfoBox';
import PageHeading from '../../components/Home/PageHeading';


const Home = () => {
  return (
    <>
      <Slider />
      <section>
        <div className="container">
          <HomeInfoBox />
          <PageHeading heading={'Latest Products'}
          btnText={'Shop Now>>>'}/>
        </div>
      </section>
    </>
  );
};

export default Home;

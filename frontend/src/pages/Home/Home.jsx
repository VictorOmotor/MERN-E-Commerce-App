import React from 'react';
import Slider from '../../components/Slider/Slider';
import './Home.scss';
import HomeInfoBox from './HomeInfoBox';
import PageHeading from '../../components/Home/PageHeading';
import { productData } from '../../components/Carousel/data';
import CarouselItem from '../../components/Carousel/CarouselItem';
import ProductCarousel from '../../components/Carousel/Carousel';
import ProductCategory from './ProductCategory';
import FooterLinks from '../../components/Footer/FooterLinks';

const Home = () => {
  const productss = productData.map((item) => (
    <div key={item.id}>
      <CarouselItem
        name={item.name}
        url={item.imageurl}
        price={item.price}
        description={item.description}
      />
    </div>
  ));
  return (
    <>
      <Slider />
      <section>
        <div className="container">
          <HomeInfoBox />
          <PageHeading heading={'Latest Products'} btnText={'Shop Now>>>'} />
          <ProductCarousel products={productss} />
        </div>
      </section>
      <section className="--bg-grey">
        <div className="container">
          <h3>Categories</h3>
          <ProductCategory />
        </div>
      </section>
      <section>
        <div className="container">
          <PageHeading heading={'Mobile Phones'} btnText={'Shop Now>>>'} />
          <ProductCarousel products={productss} />
        </div>
      </section>
      <FooterLinks />
    </>
  );
};

export default Home;

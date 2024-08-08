import React, { useState } from 'react'
import "./Home.css"
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import FoodDisply from '../../Components/Fooddisplay/FoodDisply';
import AppDownload from '../../Components/AppDownload/AppDownload';
import Slider from '../../Components/Slider/Slider';
import Food1 from '../../assets/food1.png';
import Food2 from '../../assets/food2.png';
import Header from '../../Components/Header/Header';
const Home = () => {
  const [category, setCategory] = useState("All");
  const Imgage =[Food1,Food2] ;
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisply category={category} />
      <AppDownload />
    </div>
  )
}

export default Home
import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Cart from './Pages/Cart/Cart';
import Footer from './Components/Footer/Footer';
import LoginPop from './Components/LoginPop/LoginPop';
import Verify from './Pages/Verify/verify';
import Myorder from './Pages/Myorder/Myorder';

const App = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      {show ? <LoginPop setShow={setShow} /> : <></>}
      <div className='app'>
        <Navbar setShow={setShow} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<Myorder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../ContextApi/ShopContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { getTotalAmount, token, url, cartItems, food_list } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });



  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const placeORDER = async (event) => {
    event.preventDefault();

    let orderItems = food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        return { ...item, quantity: cartItems[item._id] };
      }
      return null;
    }).filter(item => item !== null);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 2,
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalAmount()===0){
    navigate('/cart')
    }
  }, [token])

  return (
    <form onSubmit={placeORDER} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' required value={data.firstName} onChange={onchangeHandler} type='text' placeholder='First Name' />
          <input name='lastName' required value={data.lastName} onChange={onchangeHandler} type='text' placeholder='Last Name' />
        </div>
        <input name='email' required value={data.email} type='email' onChange={onchangeHandler} placeholder='Email address' />
        <input name='street' required value={data.street} type='text' onChange={onchangeHandler} placeholder='Street' />
        <div className="multi-fields">
          <input name='city' required value={data.city} type='text' onChange={onchangeHandler} placeholder='City' />
          <input name='state' required value={data.state} type='text' onChange={onchangeHandler} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input name='zipcode' required value={data.zipcode} type='text' onChange={onchangeHandler} placeholder='Zip code' />
          <input name='country' required value={data.country} type='text' onChange={onchangeHandler} placeholder='Country' />
        </div>
        <input type='text' required name='phone' value={data.phone} onChange={onchangeHandler} placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cartitem-total">
          <h1>Cart totals</h1>
          <div>
            <div className="cartitem-total-item">
              <p>Subtotal</p>
              <p>₹{getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <p>Shipping Fee</p>
              <p>₹{getTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</h3>
            </div>
          </div>
          <button type='submit' className="checkoutbtn">Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

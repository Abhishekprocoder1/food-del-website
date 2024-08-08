import React, { useContext } from 'react'
import './Cart.css';
import { StoreContext } from '../../ContextApi/ShopContext';
import {useNavigate} from 'react-router-dom'
const Cart = () => {

  const { food_list,getTotalAmount, cartItems, removeFromCart,url } = useContext(StoreContext)


   const navigate=useNavigate();
  return (
    <div className='cart'>
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, i) => {
          if (cartItems[item._id] > 0) {
            return (
              <div  key={i} >
              <div className='cart-item-title cart-item-item'>
                <img src={url+"/images/"+item.image}  alt='' />
                <p> {item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{item.price * cartItems[item._id]}</p>
                <p className='cross' onClick={()=>removeFromCart(item._id)}>X</p>
              </div>
              <hr/>
              </div>
            )
          }
        })
        }
      </div>

      <div className="cartitem-down">
          <div className="cartitem-total">
            <h1>Cart totals</h1>
            <div>
              <div className="cartitem-total-item">
                <p>Subtotal</p>
                <p>₹{getTotalAmount()}</p>
              </div>
              <hr />
              <div className="cartitem-total-item">
                <p>Shipping Fee </p>
                <p>₹{getTotalAmount()===0?0:2}</p>
              </div>
              <hr />
              <div className="cartitem-total-item">
                <h3>Total</h3>
                <h3>₹{getTotalAmount()===0?0:getTotalAmount()+2}</h3>
              </div>
            </div>
            <button onClick={()=>navigate('/order')} className="checkoutbtn" > CHECKOUT</button>
          </div>
          <div className="cartitem-promocode">
            <p>I You have a promo code,Enter it here</p>
            <div className="cartitem-promobox">
              <input type="text" placeholder="promo code" />
              <button className="input-button">Submit</button>
            </div>
          </div>
        </div>


    </div>
  )
}

export default Cart
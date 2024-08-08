import React, { useEffect, useState } from 'react'
import './Order.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
const Order = ({ url }) => {

  const [orders, setOrders] = useState([]);

  const feactAllorders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }


  const statusUpdate = async (event,orderId) => {
    const respone = await axios.post(url+"/api/order/status",{
      orderId:orderId,
      status:event.target.value
    })

    if(respone.data.success)
      {
        await feactAllorders();
        
      }
    
  }

 

  useEffect(() => {
    feactAllorders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, i) => (
          <div className="order-item" key={i}>
            <img src={assets.parcel_icon} alt='' />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, j) => (
                  <span key={j}>
                    {item.name} X {item.quantity}{j === order.items.length - 1 ? '' : ', '}
                  </span>
                ))}
              </p>
              <p className='order-item-name'> {order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + " ," + order.address.state + " ," + order.address.country + " ," + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>

            <p>Items:{order.items.length}</p>
            <p>Amount: {order.amount}</p>

            <select onChange={(event) => statusUpdate(event, order._id)}  value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>

            </select>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Order
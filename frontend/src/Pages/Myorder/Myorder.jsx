import React, { useContext, useEffect, useState } from 'react'
import './Myorder.css'
import { StoreContext } from '../../ContextApi/ShopContext';
import axios from 'axios';
import parcel_icon from '../../assets/parcel_icon.png';

const Myorder = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const feactOrders = async () => {
        const response = await axios.post(url + "/api/order/userorder", {}, { headers: { token } });
        setData(response.data.data);
        console.log(response.data.data);
    }
    useEffect(() => {
        if(token){
            feactOrders();
        }
        
    }, [token])
    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {
                    data.map((order, orderIndex) => {
                        return (
                            <div key={orderIndex} className='my-orders-order'>
                                <img src={parcel_icon} alt='' />
                                <p>
                                    {order.items.map((item, itemIndex) => {
                                        if (itemIndex === order.items.length - 1) {
                                            return item.name + " X " + item.quantity;
                                        } else {
                                            return item.name + " X " + item.quantity + ", ";
                                        }
                                    })}
                                </p>
                                <p>{order.amount}₹</p>
                                <p>Items: {order.items.length}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button onClick={feactOrders}>Track order</button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Myorder
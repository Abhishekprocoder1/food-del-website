import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {
   

    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });
    const [error, setError] = useState("");

    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setError("");  // Reset error message
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", Number(data.price));
            formData.append("category", data.category);
            formData.append("image", image);

            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(null);
                toast.success(response.data.message)
            } else {
                setError("Failed to add product. Please try again.");
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Error while adding product:", error);
            setError("An error occurred while adding the product. Please try again.");
        }
    };

    return (
        <div className='add'>
            <form className="flex-col" onSubmit={submitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Preview" />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onchangeHandler} value={data.name} type='text' name='name' placeholder='type here' required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onchangeHandler} value={data.description} name='description' rows="6" placeholder='write content here' ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onchangeHandler} name='category' value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input
                            onChange={onchangeHandler} value={data.price} type='number' name='price' placeholder='₹299' required
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn'>Add</button>
                {error && <p className='error-message'>{error}</p>}
            </form>
        </div>
    );
}

export default Add;

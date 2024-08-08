import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

export const StoreContextProvide = (props) => {
    const [cartItems, setCartItem] = useState({});
    const url = "https://food-del-website-backend.onrender.com";
    const [token, setToken] = useState("");
    const [food_list, setFoodlist] = useState([]);

    const addToCart = async (itemId) => {
        setCartItem((prev) => {
            if (!prev) prev = {};  
            return { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
        });

        
        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItem((prev) => {
            const newCount = (prev[itemId] || 1) - 1;
            if (newCount > 0) {
                return { ...prev, [itemId]: newCount };
            } else {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            }
        });

        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const feactFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodlist(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };


    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItem(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await feactFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        };
        loadData();
    }, []);

    const contextValue = {
        food_list,
        addToCart,
        setToken,
        token,
        cartItems,
        setCartItem,
        removeFromCart,
        getTotalAmount,
        url
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

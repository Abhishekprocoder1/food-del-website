import orderModel from "../models/orderModel.js";
import userModel from "../models/userModle.js"; // Corrected the import
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Corrected the environment variable
// placing user order from frontend

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Corrected unit_amount calculation
            },
            quantity: item.quantity,
        }));

        line_items.push({ // Corrected the typo
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100, // Assuming the delivery charge is 2 INR
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        res.json({ success: false, message: "Error placing order", error: error.message }); // Improved error message
    }
}


const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "paid" })
        }
        else {
            await orderModel.findByIdAndUpdate(orderId);
            res.json({ success: false, message: "not paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "not paid" })
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

//Listing order for admin panel

const listOrderforAdmin = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurs" })

    }
}

// api for updating order status
const updateStatus = async (req, res) => {

    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Status Updated" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}


export { placeOrder, verifyOrder, userOrders, listOrderforAdmin, updateStatus };

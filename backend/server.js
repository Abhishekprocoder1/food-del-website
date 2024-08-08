import express from 'express';
import cors from 'cors'
import { connectDB } from './config/database.js';
import foodRouter from './route/foodRoute.js';
import userRouter from './route/userRoute.js';
import cartRouter from './route/cartRoute.js'
import "dotenv/config"
import orderRouter from './route/orderRoute.js';

//app config

const app = express();
const port =process.env.PORT || 4000

//middleware

app.use(express.json());
app.use(cors());


// database connection
connectDB();

// api endponints
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);



app.get("/", (req, res) => {
    res.send("Api working")
})



app.listen(port,()=>{
    console.log(`Server is running on http://localhost: ${port}`)
})
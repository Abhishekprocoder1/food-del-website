import express from 'express';
import { addFood, foodRemove, listFood } from '../controller/foodcontroller.js';
import multer from 'multer';

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const uploads=multer({storage:storage})

foodRouter.post("/add",uploads.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",foodRemove)


export default foodRouter;
import express from "express/index.js";
import {addOrderItems} from "../controller/orderController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();


router.route('/').post(auth, addOrderItems);



export default router;
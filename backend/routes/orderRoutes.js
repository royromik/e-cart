import express from "express/index.js";
import {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid} from "../controller/orderController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();


router.route('/').post(auth, addOrderItems);
router.route('/myorders').get(auth, getMyOrders);
router.route('/:id').get(auth, getOrderById);
router.route('/:id/pay').put(auth, updateOrderToPaid);




export default router;
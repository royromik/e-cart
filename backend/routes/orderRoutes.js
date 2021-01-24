import express from "express/index.js";
import {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, getOrders, updateOrderToDelivered} from "../controller/orderController.js";
import {auth,admin} from "../middleware/authMiddleware.js";

const router = express.Router();


router.route('/').post(auth, addOrderItems).get(auth,admin,getOrders);
router.route('/myorders').get(auth, getMyOrders);
router.route('/:id').get(auth, getOrderById);
router.route('/:id/pay').put(auth, updateOrderToPaid);
router.route('/:id/deliver').put(auth, admin, updateOrderToDelivered);




export default router;
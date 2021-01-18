import express from "express/index.js";
import {getProducts,getProductById} from "../controller/productController.js";

const router = express.Router();


router.route('/').get(getProducts);
router.route('/:id').get(getProductById);


export default router;

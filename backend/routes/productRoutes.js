import express from "express/index.js";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
} from "../controller/productController.js";
import { auth, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(auth,admin,createProduct);
router.route("/:id/reviews").post(auth,createProductReview);
router.get("/top",getTopProducts)
router
  .route("/:id")
  .get(getProductById)
  .delete(auth, admin, deleteProduct)
  .put(auth, admin, updateProduct);

export default router;

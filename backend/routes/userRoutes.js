import express from "express/index.js";
import {authUser, registerUser, getUserProfile,updateUserProfile} from "../controller/userController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser)
router.post("/login",authUser);
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile)



export default router;
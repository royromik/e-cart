import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const auth = asyncHandler(async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new Error();
    }

    req.user = user;

    next();
  } catch (e) {
    res.status("401").send({ error: "Please authenticate" });
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status("401").send({ error: "Not authorized as an admin" });
  }
};

export { auth, admin };

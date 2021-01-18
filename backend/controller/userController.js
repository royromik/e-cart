import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc - Auth User & get token
// @route - POST api/users/login
// @access - Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc - Auth User & get User profile
// @route - GET api/users/profile
// @access - Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new Error('User not Found');
  }

  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});


// @desc - Auth User & update User profile
// @route - PUT api/users/profile
// @access - Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not Found');
  }
   user.name = req.body.name || user.name;
   user.email = req.body.email || user.email;
   user.password = req.body.password || user.password;

  const updatedUser = await user.save()

  res.send({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser._id)
  });
});


// @desc - Create User
// @route - POST api/users
// @access - Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existUser = await User.findOne({email});
  if(existUser){
      res.status(400);
      throw new Error("User already exist")
  }

  const user = await User.create({
      name,
      email,
      password
  })

  if(user){
      res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      });
  }else{
      res.status(400)
      throw new Error("invalid user data")
  }

 
});

export { authUser, getUserProfile, registerUser, updateUserProfile };

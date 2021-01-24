import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc - Fetch all products
// @route - GET /api/products
// @access - Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) ||1
  const keyword = req.query.keyword ? {
    name: {
      $regex : req.query.keyword,
      $options :'i'
    }
  } :{}

  const count = await Product.countDocuments({...keyword})
  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1));


  res.json({products, page, pages: Math.ceil(count/pageSize)});
});

// @desc - Fetch single products
// @route - GET /api/products/:id
// @access - Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error({ message: "Product not found" });
  }
});

// @desc - Create Product
// @route - POST /api/products/
// @access - Private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample product",
    price: 0,
    user: req.user._id,
    brand: "sample brand",
    description: "sample description",
    countInStock: 0,
    image: "/images/sample.jpg",
    category: "sample category",
  });
  const createdProduct = await product.save();
  res.status(201).send(createdProduct);
});

// @desc - Update product by id
// @route - PUT /api/products/:id
// @access - Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const {
    name,
    price,
    brand,
    description,
    countInStock,
    image,
    category,
  }= req.body;
  if (product) {
    product.name=name
    product.price=price
    product.brand=brand
    product.description=description
    product.countInStock=countInStock
    product.image=image
    product.category=category

    const upadatedProduct = await product.save();
    res.status(201).send(upadatedProduct);
  } else {
    res.status(404);
    throw new Error({ message: "Product not found" });
  }
});


// @desc - Create product review
// @route - POST /api/products/:id/reviews
// @access - Private
const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const {
    rating,
    comment,
  }= req.body;

  if (product) {
    const alreadyReviewed = product.reviews.find(r=>r.user.toString() === req.user._id.toString());
    if(alreadyReviewed){
      res.status(400)
      throw new Error("Product already reviewed")
    }
    const reviews ={
      name: req.user.name,
      comment,
      user: req.user._id,
      rating:Number(rating)
    }
    product.reviews.push(reviews);

    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc,r)=>acc+r.rating,0)/product.reviews.length

    await product.save();
    res.status(201).send({message: 'Review added'});
  } else {
    res.status(404);
    throw new Error({ message: "Product not found" });
  }
});


// @desc - delete product by id , admin only
// @route - DELETE /api/products/:id
// @access - Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error({ message: "Product not found" });
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})


export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};

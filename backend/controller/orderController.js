import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc - create order
// @route - POST /api/orders
// @access - Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error();
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).send(createdOrder);
  }
});

// @desc - Fetch all order
// @route - GET /api/orders/:id
// @access - private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user','name email')

  if(order){
      res.send(order);

  }else{
      res.status(404).send('Order Not Found')
  }

});
// @desc - update order to paid
// @route - PUT /api/orders/:id/pay
// @access - Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if(order){
    order.isPaid =true;
    order.paidAt = Date.now()
    order.paymentResult = {
        id:req.body.id,
        status:req.body.status,
        update_time:req.body.update_time,
        email_address:req.body.payer.email_address,
    }

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  }else{
      res.status(404).send('Order Not Found')
  }

});

// @desc - fetch user order
// @route - GET /api/orders/myorders
// @access - private
const getMyOrders = asyncHandler(async (req, res) => {
    const order = await Order.find({user:req.user._id})
    if(order){
        res.send(order);
  
    }else{
        res.status(404).send('Order Not Found')
    }
  
  });

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };

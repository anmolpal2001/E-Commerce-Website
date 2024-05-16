import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while getting orders",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = req.body;
    console.log(order);
    order.user = req.user.id;

    // remove the cart items
    const deleteCart = await Cart.findOneAndDelete({ user: req.user.id });
    // reduce the quantity of the products in the product collection
    for (let item of order.items) {
      await Product.findByIdAndUpdate(
        { _id: item.product.id },
        {
          $inc: { stock: -item.quantity },
        }
      );
    }
    const newOrder = await Order.create({
      ...order,
      orderStatus: "ordered",
    });
    // save order in user collection
    const userOrder = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { orders: newOrder._id } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while creating order",
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while getting order",
    });
  }
};

const getTotalOrders = async (req,res) => {
  try{
    const adminId = req.user.id;
     const search =  {} ;
     search.orderStatus = req.query.orderStatus;
     const totalOrders = await Order.find(search).sort({ updatedAt: -1 });;
     const totalCount = totalOrders.length;
    res.status(200).json({
      success: true,
      totalOrders,
      totalCount
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while getting total orders",
    });
  }
}


const updateOrderStatusById = async (req, res) => {
  try {
    console.log(req.body.orderStatus);
    console.log('order id',req.params.id);
    const orderId = req.params.id;
    const orderStatus = req.body.orderStatus;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    res.status(200).json({
      success: true,
      updatedOrder,
      message: "Order status updated successfully",
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while updating order status",
    });
  }
}


export { getOrdersByUserId, createOrder, getOrderById,getTotalOrders,updateOrderStatusById };
import Cart from "../models/Cart.js";

const getCartByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartData = await Cart.findOne({ user: userId }).populate({
      path: "items",
      populate: "product",
    });
    if (!cartData) {
      return res.status(200).json({
        success: true,
        cartItems: [],
      });
    }
    const cartItems = cartData.items;
    res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting cart",
      err: error,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const item = req.body;
    const userId = req.user.id;
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart = await Cart.findByIdAndUpdate(
        cart._id,
        { $push: { items: item } },
        { new: true }
      );
      // cart = await Cart.findByIdAndUpdate(cart._id, { $push: { items: { $each: req.body.items } } }, { new: true });
    } else {
      cart = new Cart({
        user: userId,
        items: [item],
      });
    }
    await cart.save();
    const cartData = await Cart.findById(cart._id).populate({
      path: "items",
      populate: "product",
    });
    const cartItems = cartData.items;
    res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while adding to cart",
      err: error,
    });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.id;
    console.log("itemId",itemId)
    console.log("userId",userId)
    const filter = { user: userId, "items._id": itemId };
    const update = { $pull: { items: { _id: itemId } } };
    const deletedItem = await Cart.findOneAndUpdate(filter, update, { new: true });
    // const cartItems = await deletedItem.populate("product").exec();
    res.status(200).json({
      success: true,
      deletedItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while deleting from cart",
      err: error,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.id;
    console.log(req.body)
    const filter = { user: userId, "items.product._id": itemId };
    const update = { $set: { "items.$.quantity": req.body.quantity } }; // here items.$.quantity is the positional operator to update the quantity of the item in the array, it will update the quantity of the item whose id is equal to itemId
    const updatedCart = await Cart.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log("updatedCart",updatedCart)
    const cartData = await Cart.findById(updatedCart._id).populate({
      path: "items",
      populate: "product",
    });
    console.log("cartData",cartData)
    const cartItems = cartData.items;

    res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while updating cart",
      err: error,
    });
  }
};

export { getCartByUserId, addToCart, deleteFromCart, updateCart };

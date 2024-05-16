import User from "../models/User.js";

const getUserById = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).exec(); // here we use projection to get the limited details of the user
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while getting user",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(req.body)
    const updatedUser = await User.findByIdAndUpdate(userId, {$push : { addresses : req.body}} , {new: true}).exec();
    res.status(200).json({
      success: true,
      updatedUser,
      message: "User details updated successfully",
    });
    }
    catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error while updating details of user",
    });
    }
}

const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const index = req.body.index; 
    console.log("index" ,req.body);
    const user = await User.findById(userId).exec();
    if (index < 0 || index >= user.addresses.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid index provided",
      });
    }
    // Find the address with the specified index and remove it
    user.addresses.splice(index, 1);
    const updatedUser = await user.save();
    console.log("updatedUser",updatedUser);

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      updatedUser,
    });
  }
  catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error while deleting address",
    });
  }
}

export { getUserById,updateUser,deleteAddress};

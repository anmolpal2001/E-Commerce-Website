import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mailSender from "../mail/mailSender.js";
import { forgotPasswordEmail } from "../mail/templates/forgotPasswordEmail.js";
dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const user = newUser.toJSON();
    delete user.password;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while registering user",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const userData = user.toJSON();
    delete userData.password;
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const expiryDate = new Date((Date.now() / 1000 + 60 * 60 * 24 * 10) * 1000);
    // const expiryDate = new Date((Date.now() / 1000 + 60) * 1000);
    const cookieOptions = {
      httpOnly: false,
      sameSite: "strict", // Adjust SameSite attribute as needed
      expires: expiryDate,
    };
    res.cookie("token", token, cookieOptions);
    userData.token = token;
    console.log(user);
    res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while logging in",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while logging out",
    });
  }
};

const forgotPassword = async (req,res) => {
  try{
    const {email} = req.body;
    console.log(email);
    const validUser = await User.findOne({email});
    if(!validUser){
      return res.status(400).json({
        success: false,
        message: "User not found with this email",
      });
    }
    const payload = {
      id: validUser._id,
      email
    }
    const resetPasswordToken = jwt.sign(payload, process.env.PASSWORD_CHANGE_SECRET, {expiresIn: '5m'});

    const linkforResetPassword = `${process.env.CLIENT_URL}/reset-password/${validUser._id}/${resetPasswordToken}`;
    console.log(linkforResetPassword);
    const emailResponse = await mailSender(email,"Reset Password",forgotPasswordEmail(validUser.name,linkforResetPassword));
    console.log(emailResponse);
    return res.status(200).json({
      success: true,
      linkforResetPassword,
      message: "Email sent successfully",
    });
  }catch(error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while creating reset password link",
    });
  }
}

const resetPassword = async (req,res) => {
  try{
    const {userId,token} = req.params;
    const {password} = req.body;
    console.log(password);
    const validUser = await User.findById(userId);
    if(!validUser){
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const payload = jwt.verify(token,process.env.PASSWORD_CHANGE_SECRET);
    if(payload.id === userId){
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await User.findByIdAndUpdate(userId,{password: hashedPassword},{new: true});
      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while updating password",
    });
  }
}


export { registerUser, loginUser,logoutUser,forgotPassword,resetPassword };

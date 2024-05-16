import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const protect = async (req, res,next) => {
  try {
    const token = req.body.token || req.cookies.token;
    if (!token || token == undefined || token == "") {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying token",
    });
  }
};

const isAdmin = async (req,res,next) => {
  if(req.user.role === "admin"){
    next();
  }else{
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this route"
    });
  }
}

const isUser = async (req,res,next) => {
  if(req.user.role === "user"){
    next();
  }else{
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this route"
    });
  }
}


export { protect, isAdmin,isUser};
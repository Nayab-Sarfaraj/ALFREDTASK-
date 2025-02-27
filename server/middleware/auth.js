import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Errorhandler from "../utils/errorHandler.js";
const isAuthenticated = async function (req, res, next) {
  try {
   
    const token = req.cookies.token;
  
    if (!token)
      return next(new Errorhandler("Please login to access resources", 401));
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decodedData.id);
    if (!user) return next(new Errorhandler("You are not authorized", 401));
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    console.log("ERROR WHILE AUTHENTICATING THE USER");
    console.log(error.message);
  }
};

export default isAuthenticated;

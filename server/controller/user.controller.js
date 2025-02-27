import Errorhandler from "../utils/errorHandler.js";
import User from "../models/user.model.js";
import saveToken from "../utils/jwtToken.js";
export const register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    if (!email) return next(new Errorhandler("email is reuired", 401));
    if (!name) return next(new Errorhandler("name is rquired ", 401));
    if (!password) return next(new Errorhandler("password is required", 401));
    const isExits = await User.findOne({ email: email });
    if (isExits) return next(new Errorhandler("User already exist ", 401));
    const newUser = new User({
      email,
      password,
      name,
    });
    const savedUser = await newUser.save();
    return res.status(200).json({
      success: true,
      user: {
        name: savedUser.name,
        email: savedUser.email,
        _id: savedUser._id,
      },
    });
  } catch (error) {
    console.log(error.message);
    console.log("Error while registering the use");
    return next(new Errorhandler("Something went wrong", 500));
  }
};

export const login = async (req, res, next) => {
  try {
    console.log("hererer");
    const { email, password } = req.body;
    console.log(req.body);
    if (!email) return next(new Errorhandler("email is reuired", 401));
    if (!password) return next(new Errorhandler("password is required", 401));
    if (password.length < 8)
      return next(new Errorhandler("Password must be 8 character long", 401));
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) return next(new Errorhandler("Invalid email or password", 401));
    const result = await user.comparePassword(password);
    console.log(result);
    if (!result)
      return next(new Errorhandler("Invalid email or password", 400));
    saveToken(user, res, 200);
  } catch (error) {
    console.log(error.message);
    console.log("Error while logging the use");
    return next(new Errorhandler("Something went wrong", 500));
  }
};

export const getUserData = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) return next(new Errorhandler("Please login ", 401));
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Something went wrong", 500));
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return next(new Errorhandler(error.message, 400));
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email: req.user.email }).select(
      "+password"
    );
    if (!user)
      return next(new Errorhandler("Please login to update the password", 401));
    const isMatching = await bcrypt.compare(oldPassword, user.password);
    if (!isMatching)
      return next(new Errorhandler("Passwords doesnt match", 401));
    user.password = newPassword;
    const updatedUser = await user.save();
    return res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Something went wrong", 500));
  }
};

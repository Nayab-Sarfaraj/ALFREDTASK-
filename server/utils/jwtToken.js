const saveToken = async function (user, res, status) {
  try {
    const token = await user.generateToken();
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const { password, ...filteredUser } = { ...user._doc };

    return res.status(status).json({
      success: true,
      user: filteredUser,
      token,
    });
  } catch (error) {
    console.log(error.message);
    console.log("Error while generating the token");
  }
};

export default saveToken;

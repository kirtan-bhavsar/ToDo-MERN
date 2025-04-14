import User from "../Models/User.js";

// @api : /api/v1/user/register
// @desc Used to register a user
// @access : Public

const registerUser = async (req, res) => {
  const user = await User.create(req.body);

  res.status(200).json({ data: user });
};

export { registerUser };

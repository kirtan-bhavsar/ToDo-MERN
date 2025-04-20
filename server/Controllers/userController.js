import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "dotenv/config";
import generateToken from "../Utils/generateToken.js";

// @api : /api/v1/user/register
// @desc Used to register a user
// @access : Public

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  // Condition Checking
  if (!email) {
    return res.status(400).json({ message: "Please provide a valid email Id" });
  }

  if (!password) {
    return res.status(400).json({ message: "Please enter a valid password" });
  }

  const userExists = await User.find({ email: email });

  if (userExists.length > 0) {
    return res
      .status(400)
      .json({ message: "Email already exists for another user" });
  }

  // New approach

  // creating User instance
  const user = new User({
    name,
    email,
  });

  // hashing the user entered password
  const hashedPassword = await user.hashPassword(password);

  user.password = hashedPassword;

  user.save();

  generateToken(res, user);

  // // Generate Token
  // const payload = {
  //   user: {
  //     id: user.id,
  //   },
  // };

  // jwt.sign(
  //   payload,
  //   process.env.JWT_SECRET,
  //   { expiresIn: "5d" },
  //   (err, token) => {
  //     if (err) console.log(err);
  //     res.status(200).json({ data: user, token: token });
  //   }
  // );

  // res.status(200).json({ message: "dev ongoing" });
  // res.status(200).json({});
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email id cannot be blank" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password cannot be blank" });
  }

  const userExists = await User.findOne({ email });

  if (!userExists) {
    return res
      .status(400)
      .json({ message: "No user found with these credentials" });
  }

  const passwordMatches = await bcrypt.compare(password, userExists.password);

  if (!passwordMatches) {
    return res.status(400).json({ message: "Password Incorrect" });
  }

  generateToken(res, userExists);
};

const logoutUser = async (req, res) => {
  res
    .status(200)
    .cookie("jwtToken", "none", {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 1000),
    })
    .json({ message: "Logout Successful" });
};

export { registerUser, loginUser, logoutUser };

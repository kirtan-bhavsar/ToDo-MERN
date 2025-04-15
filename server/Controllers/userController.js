import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "dotenv/config";

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

  // Hashing the password
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  //password updated body
  const body = {
    email,
    password: hashedPassword,
    name,
  };

  const user = await User.create(body);

  // Generate Token
  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "5d" },
    (err, token) => {
      if (err) console.log(error);
      res.status(200).json({ data: user, token: token });
    }
  );

  // res.status(200).json({ data: user });
};

export { registerUser };

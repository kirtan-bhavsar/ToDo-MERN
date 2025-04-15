import React from "react";
import config from "dotenv/config";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  let token;

  if (req.headers["x-auth-token"]) {
    token = req.headers["x-auth-token"];
  } else if (req.headers.authorization) {
    console.log(req.headers);
    token = req.headers.authorization.split(" ")[1];
  } else {
    return res
      .status(400)
      .json({ message: "Invalid request, as not token found" });
  }

  try {
    console.log(token + "token printed");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;

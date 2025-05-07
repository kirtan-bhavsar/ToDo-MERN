// import config from "dotenv/config";
// import jwt from "jsonwebtoken";

// const auth = async (req, res, next) => {
//   let token;

//   console.log("--- Auth Middleware Started ---");
//   console.log("Request Headers:", req.headers);
//   console.log("Request Cookies:", req.cookies);

//   token = req.cookies?.jwtToken;
//   console.log("Token from cookies:", token);

//   if (
//     !token &&
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer ")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//     console.log("Token from Authorization header:", token);
//   }

//   if (!token && req.headers["x-auth-token"]) {
//     token = req.headers["x-auth-token"];
//     console.log("Token from x-auth-token header:", token);
//   }

//   if (!token) {
//     console.log("No token found in cookies or headers. Authentication failed.");
//     res.status(400).json({ message: "No token found" });
//   }

//   console.log("Attempting to verify token:", token);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Token verification successful. Decoded payload:", decoded);
//     req.user = decoded.user;
//     console.log("User attached to request:", req.user);
//     console.log("--- Auth Middleware Completed Successfully ---");
//     next();
//   } catch (error) {
//     console.error("Token verification failed. Error:", error);
//     console.log("JWT Secret being used:", process.env.JWT_SECRET);
//     console.log("--- Auth Middleware Completed with Error ---");
//     return res.status(500).json({ message: error });
//   }
// };

// export default auth;

// ---new code---
// import React from "react";
import config from "dotenv/config";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  // console.log(req.cookies.jwtToken + " cookie printed");
  // let token;

  // if (req.headers["x-auth-token"]) {
  //   token = req.headers["x-auth-token"];
  // } else if (req.headers.authorization || req.cookies.jwtToken) {
  //   console.log(req.headers);
  //   // token = req.headers.authorization.split(" ")[1] || req.cookies.jwtToken;

  //   token = req.headers.authorization.split(" ")[1]
  //     ? req.headers.authorization.split(" ")[1]
  //     : req.cookies.jwtToken;
  // } else {
  //   return res
  //     .status(400)
  //     .json({ message: "Invalid request, as not token found" });
  // }

  let token;

  token = req.cookies?.jwtToken;

  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token && req.headers["x-auth-token"]) {
    token = req.headers["x-auth-token"];
  }

  if (!token) {
    res.status(400).json({ message: "No token found" });
  }

  try {
    console.log(token + " token printed");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (error) {
    console.log("Error came in auth.js");
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export default auth;

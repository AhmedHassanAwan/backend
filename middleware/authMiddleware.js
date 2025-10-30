// const jwt = require('jsonwebtoken');
// const User = require('../models/User');


// exports.protect = async (req, res, next) => {
//     let token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Not authorized, no token' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.id).select('-password'); 
//         next();
//     } catch (error) {
//         console.error('Error in auth middleware:', error);
//         res.status(401).json({ message: 'Not authorized, token failed' });
//     }   
// };

import jwt from "jsonwebtoken";
import authModel from "../models/Auth.js";

// Auth middleware
const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await authModel.findById(decoded.id).select("-password");

    req.user = user; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};
export default requireAuth;
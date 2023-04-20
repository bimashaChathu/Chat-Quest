const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&  //send the token inside of the header of the req
    req.headers.authorization.startsWith("Bearer") //token will be a bearer token
  ) {
      try {
    //decode the token (Bearer fjnknfjnnn)
      token = req.headers.authorization.split(" ")[1];

    //decodes token id & verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //find the user in the db and return it wothout the password
      req.user = await User.findById(decoded.id).select("-password");

      next(); //move on to the next operation
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateTocken = require("../config/generateTocken");

// registration

const registerUser = asyncHandler(async (req, res) => {
  const { fname, lname, email, password, image } = req.body;

  if (!fname || !lname || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Required Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const user = await User.create({
    fname,
    lname,
    email,
    password,
    image,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      image: user.image,
      token: generateTocken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});


// login api

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            image: user.image,
            token: generateTocken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});

// /api/user?search=jane
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  // console.log(keyword);

  const users = await User.find(keyword).find({_id: { $ne: req.user._id } }); // return all the users except the current logged in user

  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };

const express = require('express');
const { registerUser, authUser,  allUsers } = require("../controllers/userControllers");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(protect, allUsers); //it has to go through the protect middleware before moving on to the allusers req 
router.route("/login").post(authUser);


module.exports = router;
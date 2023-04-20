const express = require("express");
const {accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//accessing or creating the chat
router.route("/").post(protect, accessChat); //with protect only logged user can access the route 
router.route("/").get(protect, fetchChats); //get all the chats from the db for a particular user
router.route("/group").post(protect, createGroupChat); //creating the group
router.route("/rename").put(protect, renameGroup); //update/rename the group name
router.route("/groupadd").put(protect, addToGroup); //add someone to the group
router.route("/groupremove").put(protect, removeFromGroup); //remove someone from the group or leave the group

module.exports = router;
const mongoose = require('mongoose')

const messageModel = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        content: { type: String, trim: true },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
        },  
    },
    {
        timeStamps: true,

    }
);

const Message = mongoose.model("Message", messageModel);

module.exports = Message;
// sender name or id
// content of the msg
// ref to the chat which it belongs to

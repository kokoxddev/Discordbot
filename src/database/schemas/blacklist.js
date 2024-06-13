const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
    UserID: {
        type: String,
        required: true,
        unique: true,
    },
    Reason: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("blacklistcommands", blacklistSchema);

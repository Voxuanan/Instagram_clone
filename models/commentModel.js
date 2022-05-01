const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        //Todo: schema
    },
    { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);

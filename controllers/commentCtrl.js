const Comments = require("../models/commentModel");
const Posts = require("../models/postModel");

const commentCtrl = {
    createComment: async (req, res) => {
        try {
            const { postId, content, tag, reply } = req.body;
            const newComment = new Comments({ user: req.user._id, content, tag, reply });
            await Posts.findOneAndUpdate(
                { _id: postId },
                {
                    $push: { comments: newComment._id },
                },
                { new: true }
            );
            await newComment.save();
            res.json({ newComment });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateComment: async (req, res) => {
        try {
            const { content } = req.body;
            const comment = await Comments.findOneAndUpdate(
                { _id: req.params.id, user: req.user._id },
                { content }
            );
            if (!comment) return res.status(400).json({ msg: "Update comment fail!" });

            res.json({ msg: "Update Success!" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = commentCtrl;

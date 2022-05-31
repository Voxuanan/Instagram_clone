const Posts = require("../models/postModel");

const postCtrl = {
    createPost: async (req, res) => {
        try {
            const { content, images } = req.body;
            if (images.length === 0) return res.status(400).json({ msg: "Image is required!" });
            const newPost = new Posts({ content, images, user: req.user._id });

            await newPost.save();
            res.json({
                msg: "Create Post Success!",
                newPost,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getPosts: async (req, res) => {
        try {
            const posts = await Posts.find({ user: [...req.user.following, req.user._id] })
                .populate("user likes", "avatar username fullname")
                .sort({
                    createdAt: -1,
                });
            res.json({
                msg: "Get Post Success!",
                result: posts.length,
                posts,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updatePost: async (req, res) => {
        try {
            const { content, images, status } = req.body;
            const post = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                { content, images }
            ).populate("user likes", "avatar username fullname");
            res.json({
                msg: "Update Post Success!",
                newPost: {
                    ...post._doc,
                    content,
                    images,
                },
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = postCtrl;

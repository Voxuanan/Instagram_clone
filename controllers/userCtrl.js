const Users = require("../models/userModel");

const userCtrl = {
    searchUsers: async (req, res) => {
        try {
            const users = await Users.find({ username: { $regex: req.query.username } })
                .limit(10)
                .select("fullname username avatar");
            res.json({ users });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select("-password");
            if (!user) return res.status(400).json({ msg: "User does not exist." });
            res.json({ user });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { fullname, mobile, address, website, story, gender, avatar } = req.body;
            if (!fullname) return res.status(400).json({ msg: "Please add your fullname." });

            await Users.findOneAndUpdate(
                { _id: req.user._id },
                {
                    fullname,
                    mobile,
                    address,
                    website,
                    story,
                    gender,
                    avatar,
                }
            );
            res.json({ msg: "Update success!" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = userCtrl;

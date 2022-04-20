const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

router.get("/search", auth, userCtrl.searchUsers);
router.get("/user/:id", auth, userCtrl.getUser);

module.exports = router;

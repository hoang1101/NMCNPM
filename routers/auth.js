const { login, register } = require("../controllers/auth");
const { verifyAdmin } = require("../middleware/middleware");

const router = require("express").Router();

// router.post("/register", register);
router.post("/login", login);

module.exports = router;

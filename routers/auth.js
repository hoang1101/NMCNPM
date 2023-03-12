const { login, register } = require("../controllers/auth");
const { doiMatKhau } = require("../controllers/taikhoan");
const { verifyAdmin } = require("../middleware/middleware");

const router = require("express").Router();

// router.post("/register", register);
router.post("/login", login);
router.put("/doimk/:MaNV", doiMatKhau);

module.exports = router;

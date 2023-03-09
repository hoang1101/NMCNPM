const { register } = require("../controllers/auth");
const {
  acountlist,
  acountEdit,
  acountLock,
  acountUnlock,
  getQuyen,
} = require("../controllers/taikhoan");
const { verifyAdmin } = require("../middleware/middleware");

const router = require("express").Router();

router.post("/register", verifyAdmin, register);
router.get("/acountlist", acountlist);
router.put("/update/:MaNV", acountEdit);

router.put("/acountlock/:MaNV", acountLock);
router.put("/acountunlock/:MaNV", acountUnlock);
router.get("/role", getQuyen);
module.exports = router;

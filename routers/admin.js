const { register } = require("../controllers/auth");
const {
  acountlist,
  acountEdit,
  acountLock,
  acountUnlock,
  getQuyen,
  indexacount,
} = require("../controllers/taikhoan");
const { verifyAdmin } = require("../middleware/middleware");

const router = require("express").Router();

router.post("/register", register);
router.put("/register/:MaNV", indexacount);
router.get("/acountlist", acountlist);
router.put("/update/:MaNV", acountEdit);

router.put("/acountlock/:MaNV", acountLock);
router.put("/acountunlock/:MaNV", acountUnlock);
router.get("/role", getQuyen);
module.exports = router;

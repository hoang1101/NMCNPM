const {
  DSHDLDNV,
  DSPLNV,
  DSKTKLNV,
  info,
  editInfo,
  DSHDHDNV,
} = require("../controllers/manager");

const { verifyAdmin } = require("../middleware/middleware");

const router = require("express").Router();
// lay ra danh sach hop dong cua mot nhan vien
router.get("/DSHDLDNV/:MaNV", DSHDLDNV);
// lay ra dnah sach phieu luong cua 1 nhan vien
router.get("/DSPLNV/:MaNV", DSPLNV);
// lay ra danh sach KTKL cua mot nhan vien
router.get("/DSKTKLNV/:MaNV", DSKTKLNV);
// lay ra thong tin cua mot nhan vien
router.get("/info/:MaNV", info);
// chinh sau thong tin nhan vien
router.put("/editIF/:MaNV", editInfo);
// danh sach cac hop dong bi huy
router.get("/DSHDBH/:MaNV", DSHDHDNV);
module.exports = router;

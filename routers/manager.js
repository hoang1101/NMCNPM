const {
  createHocVan,
  editHocVan,
  delHocVan,
  createCV,
  editCV,
  delCV,
  createNV,
  editNV,
  createMB,
  editMB,
  delMB,
  createKTKL,
  editKTKL,
  delKTKL,
  createHDLD,
  getNVHD,
  editHDLD,
  createPL,
  editPL,
  NVHD,
  NVKHD,
  DSHV,
  DSCV,
  NVCHD,
  NVNIF,
  DSBL,
  DSHDLD,
  DSPL,
  DSKTKL,
  TKNVNL,
  TKNV,
  TKNVSHH,
  TKNVHV,
  TKNVCV,
  huyHDLD,
  bohuyHDLD,
  DSHDLDHH,
  KT,
  TKLNV,
  TENNV,
} = require("../controllers/manager");
const { verifyManager } = require("../middleware/middleware");

const router = require("express").Router();
// hoc van
router.post("/createHV", createHocVan);
router.put("/updateHV/:MaHocVan", editHocVan);
router.delete("/delHV/:MaHocVan", delHocVan);
router.get("/DSHV", DSHV);

// chuc vu
router.post("/createCV", createCV);
router.put("/updateCV/:MaChucVu", editCV);
router.delete("/delCV/:MaChucVu", delCV);
router.get("/DSCV", DSCV);

// nhan vien
router.post("/createNV", createNV);
router.put("/updateNV/:MaNV", editNV);

// ma bac
router.post("/createMB", createMB);
router.put("/editMB/:MaBac", editMB);
router.delete("/delMB/:MaBac", delMB);
router.get("/DSBL", DSBL);

// ktkl
router.post("/createKTKL", createKTKL);
router.put("/editKTKL/:SoQD", editKTKL);
router.delete("/delKTKL/:SoQD", delKTKL);
router.get("/DSKTKL", DSKTKL);
//

// HDLD

router.post("/createHDLD", createHDLD);
router.put("/editHDLD/:MaHDLD", editHDLD);
router.put("/huyHDLD/:MaHDLD", huyHDLD);
router.put("/bohuyHDLD/:MaHDLD", bohuyHDLD);
router.get("/DSHDLD", DSHDLD);
router.get("/DSHDLDHH", DSHDLDHH);

//PhieuLuong
router.post("/createPL", createPL);
router.put("/editPL/:MaNV1/:ThangTL1/:NamTL1", editPL);
router.get("/DSPL", DSPL);

// GET
router.get("/getNVHD", getNVHD);
// nhan vien hop dong
router.get("/NVHD", NVHD);
router.get("/NVKHD", NVKHD);
router.get("/NVCHD", NVCHD);
router.get("/NVNIF", NVNIF);

// nhan vien chua co hop dong hoac het hop dong
router.get("/TKNVNL", TKNVNL);
router.get("/TKNV", TKNV);
router.get("/TKNVSHH", TKNVSHH);
router.get("/TKNVHV/:MaHocVan", TKNVHV);
router.get("/TKNVCV/:MaChucVu", TKNVCV);
// nhan vien chua co hop dong hoac het
router.get("/TKCC", KT);

// thống kê lương nhân viên
router.get("/TK/:MaNV/:NamTL", TKLNV);
router.get("/TENNV", TENNV);
module.exports = router;

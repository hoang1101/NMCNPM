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
router.get("/DSHDLD", DSHDLD);

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

module.exports = router;

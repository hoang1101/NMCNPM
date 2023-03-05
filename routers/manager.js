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
} = require("../controllers/manager");
const { verifyManager } = require("../middleware/middleware");

const router = require("express").Router();
// hoc van
router.post("/createHV", verifyManager, createHocVan);
router.put("/updateHV/:MaHocVan", editHocVan);
router.delete("/delHV/:MaHocVan", delHocVan);

// chuc vu
router.post("/createCV", createCV);
router.put("/updateCV/:MaChucVu", editCV);
router.delete("/delCV/:MaChucVu", delCV);

// nhan vien
router.post("/createNV", createNV);
router.put("/updateNV/:MaNV", editNV);

// ma bac
router.post("/createMB", createMB);
router.put("/editMB/:MaBac", editMB);
router.delete("/delMB/:MaBac", delMB);

// ktkl
router.post("/createKTKL", createKTKL);
router.put("/editKTKL/:SoQD", editKTKL);
router.delete("/delKTKL/:SoQD", delKTKL);

// HDLD
router.post("/createHDLD", createHDLD);
router.put("/editHDLD/:MaHDLD", editHDLD);

//PhieuLuong
router.post("/createPL", createPL);
router.put("/editPL/:MaNV1/:ThangTL1/:NamTL1", editPL);
// GET
router.get("/getNVHD", getNVHD);
module.exports = router;

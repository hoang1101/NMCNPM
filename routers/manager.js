const {
  createHocVan,
  editHocVan,
  delHocVan,
  createCV,
  editCV,
  delCV,
  createNV,
  editNV,
} = require("../controllers/manager");

const router = require("express").Router();
// hoc van
router.post("/createHV", createHocVan);
router.put("/updateHV/:MaHocVan", editHocVan);
router.delete("/delHV/:MaHocVan", delHocVan);

// chuc vu
router.post("/createCV", createCV);
router.put("/updateCV/:MaChucVu", editCV);
router.delete("/delCV/:MaChucVu", delCV);

// nhan vien
router.post("/createNV", createNV);
router.put("/updateNV/:MaNV", editNV);
module.exports = router;

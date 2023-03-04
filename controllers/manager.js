const db = require("../models");
const { ReE, ReS } = require("./util.service");

/// =============== HOC VAN ================= ///
// tao hoc van moi
exports.createHocVan = async (req, res) => {
  try {
    const { TrinhDo } = req.body;
    if (!TrinhDo) {
      return res.status(404).json({
        success: false,
        msg: "missing input!",
      });
    } else {
      const x = await db.HocVan.create({
        TrinhDo,
      });
      return res.status(200).json({
        msg: "Tao thanh cong",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Trinh do bi trung",
      msg: error,
    });
  }
};
// chinh sua hoc van
exports.editHocVan = async (req, res) => {
  try {
    const { MaHocVan } = req.params;
    const { TrinhDo } = req.body;
    if (!TrinhDo) {
      return res.status(404).json({
        success: false,
        msg: "missing input!",
      });
    } else {
      let x = await db.HocVan.findByPk(MaHocVan);
      if (x.MaHocVan != MaHocVan) {
        return res.status(404).json({
          success: false,
          msg: "Not Found",
        });
      } else {
        x = await db.HocVan.update(
          { TrinhDo },
          {
            where: {
              MaHocVan: x.MaHocVan,
            },
          }
        );
        return res.status(200).json({
          msg: "Tao thanh cong",
          success: true,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Trinh do bi trung",
    });
  }
};
// xoa hoc van
exports.delHocVan = async (req, res) => {
  try {
    const { MaHocVan } = req.params;
    const y = await db.NhanVien.findOne({
      where: {
        MaHocVan: MaHocVan,
      },
    });
    console.log(y);
    if (y === null) {
      const x = await db.HocVan.destroy({
        where: {
          MaHocVan,
        },
      });
      return res.status(200).json({
        success: true,
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Chuc vu nay da co nhan vien xai",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      // msg: "Chuc Vu nay da co nhan vien",
      error,
    });
  }
};

/// =================== Chuc Vu ======================= ///
// tao mot chuc vu
exports.createCV = async (req, res) => {
  try {
    const { TenChucVu, MoTa } = req.body;
    if (!TenChucVu || !MoTa) {
      return res.status(404).json({
        success: false,
        msg: "Missing Input!",
      });
    } else {
      const x = await db.ChucVu.create({
        TenChucVu,
        MoTa,
      });
      return res.status(200).json({
        success: true,
        msg: "Tao thanh cong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: error,
    });
  }
};
// chinh sua chuc vu
exports.editCV = async (req, res) => {
  try {
    const { MaChucVu } = req.params;
    const { TenChucVu, MoTa } = req.body;
    if (!TenChucVu || !MoTa) {
      return res.status(404).json({
        success: false,
        msg: "Missing Input!",
      });
    } else {
      let x = await db.ChucVu.update(
        { TenChucVu, MoTa },
        {
          where: {
            MaChucVu: MaChucVu,
          },
        }
      );
      return res.status(200).json({
        success: true,
        msg: "Tao thanh cong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: error,
    });
  }
};
// Xoa chuc vu
exports.delCV = async (req, res) => {
  try {
    const { MaChucVu } = req.params;
    const y = await db.NhanVien.findOne({
      where: {
        MaChucVu: MaChucVu,
      },
    });
    if (y === null) {
      const x = await db.ChucVu.destroy({
        where: { MaChucVu },
      });
      return res.status(200).json({
        success: true,
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Da co nhan vien co chuc vu nay",
      });
    }
  } catch (error) {}
};

/// =========================== Nhan Vien ================================ ///
// tao thong tin nhan vien
exports.createNV = async (req, res) => {
  try {
    const {
      MaNV,
      MaChucVu,
      HoTen,
      NgaySinh,
      GioiTinh,
      CCCD,
      SDT,
      Email,
      DiaChi,
      QueQuan,
      MaHocVan,
    } = req.body;
    if (
      !MaNV ||
      !MaChucVu ||
      !HoTen ||
      !NgaySinh ||
      !GioiTinh ||
      !CCCD ||
      !SDT ||
      !Email ||
      !DiaChi ||
      !QueQuan ||
      !MaHocVan
    ) {
      return res.status(404).json({
        success: false,
        msg: "Missing Input!",
      });
    } else {
      const y = await db.NhanVien.findOne({
        where: { CCCD },
      });
      if (y != null) {
        return res.status(400).json({
          success: false,
          msg: "Bi trung cccd",
        });
      }

      const z = await db.NhanVien.findOne({
        where: {
          SDT,
        },
      });
      if (z != null) {
        return res.status(400).json({
          success: false,
          msg: "Bi trung sdt",
        });
      }

      const k = await db.NhanVien.findOne({
        where: {
          Email,
        },
      });
      if (k != null) {
        return res.status(400).json({
          success: false,
          msg: "Bi trung Email",
        });
      }

      const r = await db.NhanVien.findOne({
        where: { MaNV },
      });
      console.log(r);
      if (r === null) {
        const x = await db.NhanVien.findOrCreate({
          where: {
            MaNV,
          },
          defaults: {
            MaNV,
            MaChucVu,
            HoTen,
            NgaySinh,
            GioiTinh,
            CCCD,
            SDT,
            Email,
            DiaChi,
            QueQuan,
            MaHocVan,
          },
        });
        return res.status(200).json({
          success: true,
          msg: "Tao thanh cong",
        });
      } else {
        return res.status(400).json({
          success: false,
          msg: "Bi trung ma nhan vien",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller:" + error,
    });
  }
};

// chinh sua nhan vien
exports.editNV = async (req, res) => {
  try {
    const { MaNV } = req.params;
    const {
      MaChucVu,
      HoTen,
      NgaySinh,
      GioiTinh,
      CCCD,
      SDT,
      Email,
      DiaChi,
      QueQuan,
      MaHocVan,
    } = req.body;
    if (
      !MaChucVu ||
      !HoTen ||
      !NgaySinh ||
      !GioiTinh ||
      !CCCD ||
      !SDT ||
      !Email ||
      !DiaChi ||
      !QueQuan ||
      !MaHocVan
    ) {
      return res.status(404).json({
        success: false,
        msg: "Missing Input!",
      });
    } else {
      const g = await db.NhanVien.findOne({
        where: {
          MaNV,
          CCCD,
          SDT,
          Email,
        },
      });
      console.log(g);
      if (g != null) {
        const x = await db.NhanVien.update(
          {
            MaChucVu,
            HoTen,
            NgaySinh,
            GioiTinh,
            CCCD,
            SDT,
            Email,
            DiaChi,
            QueQuan,
            MaHocVan,
          },
          {
            where: { MaNV },
          }
        );
        return ReS(res, 200, "TaoThanhCong");
      } else {
        const x = await db.NhanVien.update(
          {
            MaChucVu,
            HoTen,
            NgaySinh,
            GioiTinh,
            CCCD,
            SDT,
            Email,
            DiaChi,
            QueQuan,
            MaHocVan,
          },
          {
            where: { MaNV },
          }
        );
        return ReS(res, 200, "TaoThanhCong");
      }
    }
  } catch (error) {
    {
      return ReE(res, 404, "TaoKhongThanhCong");
    }
  }
};

/// xoa thong tin nhan vien
exports.delNV = async (req, res) => {
  try {
  } catch (error) {}
};

/// ============================ Tao Hop Dong ============================= ///
//
exports.createHD = async (req, res) => {
  try {
    const { MaHDLD, MaNV, NgayBatDau, NgayKetThuc, NgayKy } = req.body;

    const x = await db.HDLD.create({});
  } catch (error) {}
};

/// ========================= Bac luong =================================== ///
//Tao ma bac

exports.createMB = async (req, res) => {
  try {
  } catch (error) {}
};

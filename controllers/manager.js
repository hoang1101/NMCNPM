const moment = require("moment/moment");
const { Op, where } = require("sequelize");
const { sequelize, Sequelize } = require("../models");
const db = require("../models");
const { ReE, ReS, SS, TE } = require("./util.service");

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

// lấy ra danh sách học vấn
exports.DSHV = async (req, res) => {
  try {
    const x = await db.HocVan.findAll({});
    return SS(res, x, 200);
  } catch (error) {
    return ReE(res, 500, "Fali");
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

// lấy ra danh sách học vấn
exports.DSCV = async (req, res) => {
  try {
    const x = await db.ChucVu.findAll({});
    return SS(res, x, 200);
  } catch (error) {
    return ReE(res, 500, "Fali");
  }
};

/// =========================== Nhan Vien ================================ ///
// tao thong tin nhan vien
exports.createNV = async (req, res) => {
  try {
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
      const r = await db.TaiKhoan.create({
        HoatDong: "1",
      });
      if (r !== null) {
        // const kt = await db.TaiKhoan.findOne({
        //   where: { TenTaiKhoan: null },
        // });
        // console.log(kt);
        const x = await db.NhanVien.findOrCreate({
          where: {
            MaNV: r.MaNV,
          },
          defaults: {
            MaNV: r.MaNV,
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
        return res.status(200).json({
          success: false,
          msg: "Tao that bai",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Du lieu nhap vao bi trung" + error,
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
      // console.log(g);
      if (g != null) {
        console.log("a1");
        let x = await db.NhanVien.update(
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
        console.log("a");
        let x = await db.NhanVien.update(
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

/// ========================= Bac luong =================================== ///
//Tao ma bac

exports.createMB = async (req, res) => {
  try {
    const { HeSo } = req.body;
    if (!HeSo) {
      return ReE(res, 404, "Khong the bo trong he so");
    } else {
      const x = await db.BacLuong.create({
        HeSo,
      });
      return ReS(res, 200, "Tao thanh cong");
    }
  } catch (error) {
    return ReE(res, 500, error);
  }
};

// chinh sua ma bac

exports.editMB = async (req, res) => {
  try {
    const { MaBac } = req.params;
    const { HeSo } = req.body;
    if (!HeSo) {
      ReE(res, 404, "Khong the bo trong HeSo");
    } else {
      let x = await db.HDLD.findOne({
        where: {
          MaBac,
        },
      });
      console.log(x);
      if (x === null) {
        x = await db.BacLuong.update(
          {
            HeSo,
          },
          {
            where: { MaBac },
          }
        );
        return ReS(res, 200, "Update thanh cong");
      } else {
        ReE(res, 404, "MaBac nay da ton tai trong HDLD");
      }
    }
  } catch (error) {
    return ReE(res, 500, error);
  }
};
// xoa ma bac
exports.delMB = async (req, res) => {
  try {
    const { MaBac } = req.params;
    let x = await db.HDLD.findOne({
      where: {
        MaBac,
      },
    });
    if (x === null) {
      x = await db.BacLuong.destroy({
        where: { MaBac },
      });
      return ReS(res, 200, "Xoa thanh cong");
    } else {
      return ReE(res, 404, "Da cos nhan vien co ma bac nay");
    }
  } catch (error) {
    return ReE(res, 500, error);
  }
};
// lay ra danh sach bac luong
exports.DSBL = async (req, res) => {
  try {
    const x = await db.BacLuong.findAll({});
    return SS(res, x, 200);
  } catch (error) {
    return ReE(res, 500, error);
  }
};
/// ========================== KTKL ============================ ///
// tao mot KTKL
exports.createKTKL = async (req, res) => {
  try {
    const { MaNV, HinhThuc, NgayQD, LiDo, SoTien } = req.body;
    if (!MaNV || !HinhThuc || !LiDo || !SoTien) {
      return ReE(res, 400, "Khong the de trong");
    } else {
      const x = await db.KTKL.create({
        MaNV,
        HinhThuc,
        NgayQD: Date.now(),
        LiDo,
        SoTien,
      });
      // console.log(HinhThuc);
      // console.log(SoTien);
      // const q = await db.PhieuLuong.findOne({
      //   MaNV,
      // });
      // const data = q.TienKTKL;
      // if (HinhThuc != 1) {
      //   let z = await db.PhieuLuong.update(
      //     {
      //       TienKTKL: data - SoTien,
      //     },
      //     { where: { MaNV } }
      //   );
      //   return ReS(res, 200, "TaoThanhCong");
      // } else {
      //   let p = await db.PhieuLuong.update(
      //     {
      //       TienKTKL: data + SoTien,
      //     },
      //     { where: { MaNV } }
      //   );
      return ReS(res, 200, "TaoThanhCong");
      // }
    }
    // }
  } catch (error) {
    ReE(res, 500, error);
  }
};

// chinh sua mot ktkl
exports.editKTKL = async (req, res) => {
  try {
    const { SoQD } = req.params;
    const { MaNV, HinhThuc, LiDo, SoTien, NgayQD } = req.body;
    const dulieu = new Date();
    const dulieutrue = dulieu.getMonth() + 1;
    const y = await db.KTKL.findOne({
      where: { SoQD },
    });
    // console.log(dulieutrue);
    // console.log(y.NgayQD.getMonth() + 1, dulieutrue);
    if (y.NgayQD.getMonth() === dulieu.getMonth()) {
      let x = await db.KTKL.update(
        { MaNV, HinhThuc, LiDo, SoTien },
        {
          where: {
            SoQD,
          },
        }
      );
      return ReS(res, 200, "Capnhatthanhcong");
    } else {
      return ReE(res, 400, "khoong the cap nhat");
    }
  } catch (error) {
    return ReE(res, 500, error);
  }
};

// xoa mot ktkl
exports.delKTKL = async (req, res) => {
  try {
    const { SoQD } = req.params;
    const dulieu = new Date();
    const y = await db.KTKL.findOne({
      where: { SoQD },
    });
    // console.log(dulieutrue);
    // console.log(y.NgayQD.getMonth() + 1, dulieutrue);
    if (y.NgayQD.getMonth() === dulieu.getMonth()) {
      let x = await db.KTKL.destroy({
        where: {
          SoQD,
        },
      });
      return ReS(res, 200, "Xoathanhcong");
    } else {
      return ReE(res, 400, "Xoakhongthanhcong");
    }
  } catch (error) {
    return ReE(res, 500, error);
  }
};
// DANH SACH KHEN THUONG KY LUAT
exports.DSKTKL = async (req, res) => {
  try {
    const x = await db.KTKL.findAll({});
    return SS(res, x, 200);
  } catch (error) {
    return ReE(res, 500, error);
  }
};

/// ========================= HDLD ============================ ///
//tao hop dong lao dong
exports.createHDLD = async (req, res) => {
  try {
    const { MaNV, NgayBatDau, NgayKetThuc, MaBac, NgayKy, LCB } = req.body;
    if (!MaNV || !NgayBatDau || !NgayKetThuc || !MaBac) {
      return ReE(res, 400, "MissingInput");
    } else {
      const dulieu = new Date();
      const NBD = new Date(NgayBatDau);
      const NKT = new Date(NgayKetThuc);
      // console.log(NBD >= dulieu);
      // console.log(NBD.getMonth(), NKT.getMonth(), dulieu.getMonth());
      console.log((NBD < NKT && NBD > dulieu) === false);
      if (NBD < NKT && NBD > dulieu) {
        const x = await db.HDLD.create({
          MaNV,
          NgayBatDau,
          NgayKetThuc,
          MaBac,
          NgayKy: Date(),
          LCB: 1800000,
        });
        return ReS(res, 200, "Tao thanh cong");
      } else {
        return ReE(res, 400, "Loi ngay bat dau lon hon");
      }
    }
  } catch (error) {
    return ReE(res, 500, error);
  }
};

// chinh sua hop dong
exports.editHDLD = async (req, res) => {
  try {
    const { MaHDLD } = req.params;
    const { MaNV, NgayBatDau, NgayKetThuc, MaBac, NgayKy } = req.body;
    if (!MaNV || !NgayBatDau || !NgayKetThuc || !MaBac) {
      return ReE(res, 400, "MissingInput");
    } else {
      const x = await db.HDLD.findOne({
        where: { MaHDLD },
      });
      const y = await db.PhieuLuong.findOne({
        where: { MaNV },
      });
      // console.log(x.NgayBatDau);
      if (x.NgayBatDau < new Date() && y !== null) {
        return ReE(res, 400, "Khong the chinh sua");
      } else {
        const NBD = new Date(NgayBatDau);
        const NKT = new Date(NgayKetThuc);
        const NK = new Date(NgayKy);
        console.log(NBD < NKT, NBD > new Date(), NK < NBD, NK >= new Date());
        if (NBD < NKT && NBD >= new Date() && NK <= NBD && NK >= new Date()) {
          const y = await db.HDLD.update(
            {
              MaNV,
              NgayBatDau,
              NgayKetThuc,
              MaBac,
              // NgayKy,
            },
            {
              where: { MaHDLD },
            }
          );
          return ReS(res, 200, "Update thanh cong");
        } else {
          return ReE(res, 404, "Loi ngay bat dau lon hon");
        }
      }
    }
  } catch (error) {
    return ReE(res, 500, error);
  }
};
// danh sach hop dong lao dong
exports.DSHDLD = async (req, res) => {
  try {
    const x = await db.HDLD.findAll({
      where: {
        NgayKetThuc: {
          [Op.gt]: new Date(),
        },
      },
    });
    return SS(res, x, 200);
  } catch (error) {
    return ReE(res, 500, error);
  }
};
/// ================= PieuLuong ===================== ///
//taophieuluong
exports.createPL = async (req, res) => {
  try {
    const {
      MaNV,
      ThangTL,
      NamTL,
      NgayLap,
      SoNgayCong,
      SoNgayNghi,
      TienUng,
      TienKTKL,
      SoTienLinh,
    } = req.body;
    if (!MaNV || !SoNgayCong || !SoNgayNghi || !TienUng) {
      return ReE(res, 400, "MissingInput!");
    } else {
      const y = await db.HDLD.findOne({
        where: {
          MaNV,
          NgayBatDau: {
            [Op.lt]: new Date(),
          },
        },
        attributes: ["MaBac", "LCB"],
      });
      if (y === null) {
        return ReE(res, 400, "Ban chua co hop dong");
      }
      console.log(y.MaBac);
      const z = await db.BacLuong.findOne({
        where: { MaBac: y.MaBac },
        attributes: ["HeSo"],
      });
      if (z === null) {
        return ReE(res, 400, "Ban chua co hop dong");
      }
      console.log(z.HeSo);

      const k = await db.KTKL.findAll({
        where: {
          MaNV,
        },
      });
      // console.log(k);

      let tong = 0;
      const thang = new Date().getMonth() + 1;
      for (let i of k) {
        console.log(thang, i.dataValues.NgayQD.getMonth() + 1, thang);
        if (
          i.dataValues.NgayQD.getMonth() + 1 === thang &&
          i.dataValues.HinhThuc === true
        ) {
          tong += i.dataValues.SoTien;
        } else if (
          i.dataValues.NgayQD.getMonth() + 1 === ThangTL &&
          i.dataValues.HinhThuc === false
        ) {
          tong -= i.dataValues.SoTien;
        }
      }

      // console.log("tong:", tong, y, z);
      const x =
        y.LCB * z.HeSo +
        tong -
        TienUng -
        SoNgayNghi * ((y.LCB * z.HeSo) / 30) +
        (SoNgayCong - 26) * ((y.LCB * z.HeSo) / 30);
      const haha = await db.PhieuLuong.create({
        MaNV,
        ThangTL: new Date().getMonth() + 1,
        NamTL: new Date().getFullYear(),
        LCB: y.LCB,
        NgayLap: new Date(),
        SoNgayCong,
        SoNgayNghi,
        TienUng,
        TienKTKL: tong,
        SoTienLinh: x,
      });
      console.log(
        MaNV,
        ThangTL,
        NamTL,
        NgayLap,
        SoNgayCong,
        SoNgayNghi,
        TienUng,
        TienKTKL,
        SoTienLinh,
        x
      );
      return ReS(res, 200, "Tao thanh cong");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: error,
    });
  }
};
// chinh sua phieu luong
exports.editPL = async (req, res) => {
  try {
    const { MaNV1, ThangTL1, NamTL1 } = req.params;
    const {
      SoNgayCong,
      SoNgayNghi,
      TienUng,
      MaNV,
      ThangTL,
      NamTL,
      TienKTKL,
      SoTienLinh,
    } = req.body;
    if (!MaNV || !SoNgayCong || !SoNgayNghi || !TienUng || !ThangTL || !NamTL) {
      return ReE(res, 400, "MissingInput!");
    } else {
      const y = await db.HDLD.findOne({
        where: { MaNV },
        attributes: ["MaBac", "LCB"],
      });
      if (y === null) {
        return ReE(res, 400, "Ban chua co hop dong");
      }
      console.log(y.MaBac);
      const z = await db.BacLuong.findOne({
        where: { MaBac: y.MaBac },
        attributes: ["HeSo"],
      });
      if (z === null) {
        return ReE(res, 400, "Ban chua co hop dong");
      }
      console.log(z.HeSo);
      const k = await db.KTKL.findAll({
        where: {
          MaNV,
        },
      });
      // console.log(k);

      let tong = 0;
      const thang = new Date().getMonth();
      for (let i of k) {
        console.log(ThangTL, i.dataValues.NgayQD.getMonth() + 1);
        if (
          i.dataValues.NgayQD.getMonth() + 1 === ThangTL &&
          i.dataValues.HinhThuc === true
        ) {
          tong += i.dataValues.SoTien;
        } else if (
          i.dataValues.NgayQD.getMonth() + 1 === ThangTL &&
          i.dataValues.HinhThuc === false
        ) {
          tong -= i.dataValues.SoTien;
        }
      }
      console.log("tong:", tong, y, z);
      const x =
        y.LCB * z.HeSo +
        tong -
        TienUng -
        SoNgayNghi * ((y.LCB * z.HeSo) / 30) +
        (SoNgayCong - 26) * ((y.LCB * z.HeSo) / 30);
      const haha = await db.PhieuLuong.update(
        {
          MaNV,
          ThangTL,
          NamTL,
          LCB: y.LCB,
          SoNgayCong,
          SoNgayNghi,
          TienUng,
          TienKTKL: tong,
          SoTienLinh: x,
        },
        {
          where: {
            MaNV: MaNV1,
            ThangTL: ThangTL1,
            NamTL: NamTL1,
          },
        }
      );
      return ReS(res, 200, "Tao thanh cong");
    }
  } catch (error) {
    return ReE(res, 500, error);
  }
};

// DSPL
exports.DSPL = async (req, res) => {
  try {
    const x = await db.PhieuLuong.findAll({});
    return SS(res, x, 200);
  } catch (error) {
    return ReE(res, 500, error);
  }
};

/// ================================ LOC ================================== ///
// loc nhan vien NKT < ngay hien tai (HDLD MANV)
exports.getNVHD = async (req, res) => {
  try {
    const x = await db.HDLD.findAll({
      NgayKetThuc: {
        [Op.lt]: new Date(),
      },
      //gt lon hon //lt nho hon

      // NgayBatDau: {
      //   [Op.ep]: NgayKetThuc,
      // },

      attributes: ["MaNV"],
    });
    // console.log(NgayKetThuc);
    return SS(res, x, 200);
  } catch (error) {
    return res.status(500).json({
      error: -1,
      msg: error,
    });
  }
};

/// loc cac nhan vien da co hop dong hoat dong
exports.NVHD = async (req, res) => {
  try {
    const x = await db.NhanVien.findAll({
      include: {
        model: db.TaiKhoan,
        as: "taikhoan",
        where: { HoatDong: 1 },
        attributes: [],
      },
      include: {
        model: db.HDLD,
        as: "hdld",
        where: {
          NgayKetThuc: {
            [Op.gt]: new Date(),
          },
        },
        attributes: [],
      },
      // attributes: [],
    });
    return SS(res, x, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail" + error,
    });
  }
};

// cac nhan vien khong con hoat dong
exports.NVKHD = async (req, res) => {
  try {
    const x = await db.NhanVien.findAll({
      include: {
        model: db.TaiKhoan,
        as: "taikhoan",
        where: {
          HoatDong: 1,
        },
        attributes: [],
      },
      include: {
        model: db.HDLD,
        as: "hdld",
        where: {
          NgayKetThuc: {
            [Op.lt]: new Date(),
          },
        },
        attributes: [],
      },
    });
    return SS(res, x, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail" + error,
    });
  }
};

// nhan vien chua co hop dong
exports.NVCHD = async (req, res) => {
  try {
    const x = await db.NhanVien.findAll({
      include: [
        {
          model: db.HDLD,
          required: false,
          as: "hdld",
        },
      ],
      where: {
        "$HDLD.MaNV$": null,
      },
    });
    return SS(res, x, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail" + error,
    });
  }
};

// nhan vien chua duwoc tao thong tin tai khoan

exports.NVNIF = async (req, res) => {
  try {
    const x = await db.NhanVien.findAll({
      include: [
        {
          model: db.TaiKhoan,
          required: false,
          as: "taikhoan",
        },
      ],
      where: {
        "$TaiKhoan.TenTaiKhoan$": null,
      },
    });
    return SS(res, x, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail" + error,
    });
  }
};

// Nhan vien
// danh sach hop dong lao dong cua 1 nhan vien
exports.DSHDLDNV = async (req, res) => {
  try {
    const { MaNV } = req.params;
    const x = await db.HDLD.findAll({
      where: {
        NgayKetThuc: {
          [Op.gt]: new Date(),
        },
        MaNV,
      },
    });
    return SS(res, x, 200);
  } catch (error) {
    return ReE(res, 500, error);
  }
};

// danh sach phieu luong cua 1 nhan vien
exports.DSPLNV = async (req, res) => {
  try {
    const { MaNV } = req.params;
    const x = await db.PhieuLuong.findAll({
      where: {
        MaNV,
      },
    });
    return SS(res, x, 200);
  } catch (error) {
    return ReE(res, 500, error);
  }
};
// danh sach khen thuong ky luat nhan vien
exports.DSKTKLNV = async (req, res) => {
  try {
    const { MaNV } = req.params;
    const x = await db.KTKL.findAll({
      where: {
        MaNV,
      },
    });
    return SS(res, x, 200);
  } catch (error) {
    return ReE(res, 500, error);
  }
};
// lay ra thong tin cua mot nhan vien
exports.info = async (req, res) => {
  try {
    const { MaNV } = req.params;
    const x = await db.NhanVien.findOne({
      where: {
        MaNV,
      },
    });
    // console.log(NgayKetThuc);
    return SS(res, x, 200);
  } catch (error) {
    return res.status(500).json({
      error: -1,
      msg: error,
    });
  }
};
// chinh sua thong tin mot nhan vien
exports.editInfo = async (req, res) => {
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
    if (!SDT || !Email || !DiaChi) {
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
      // console.log(g);
      if (g != null) {
        console.log("a1");
        let x = await db.NhanVien.update(
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
        console.log("a");
        let x = await db.NhanVien.update(
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
      return ReE(res, 404, error);
    }
  }
};

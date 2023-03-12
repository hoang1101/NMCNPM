const db = require("../models");
const TaiKhoan = require("../models/taikhoan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ReE, SS } = require("./util.service");
const { Op } = require("sequelize");
require("dotenv").config();

// danh sach cac tai khoan
exports.acountlist = async (req, res) => {
  try {
    const acount = await db.TaiKhoan.findAll({
      where: { TenTaiKhoan: { [Op.ne]: null } },
    });
    if (!acount) {
      return res.status(404).json({
        success: false,
        msg: "Khong co tai khoan nao!",
      });
    } else {
      return res.status(200).json({
        success: true,
        acount,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

const hashPassword = (MatKhau) =>
  bcrypt.hashSync(MatKhau, bcrypt.genSaltSync(12));
// chinh sua mot tai khoan
exports.acountEdit = async (req, res) => {
  try {
    const { MaNV } = req.params;
    const { TenTaiKhoan, MatKhau, MaQuyen } = req.body;
    if (!TenTaiKhoan || !MatKhau) {
      return res.status(500).json({
        success: false,
        msg: "Missing Input!",
      });
    }
    let taikhoan = await db.TaiKhoan.findOne({
      where: {
        MaNV,
      },
    });
    if (!taikhoan) {
      return res.status(404).json({
        success: false,
        msg: "Not Found",
      });
    } else {
      taikhoan = await db.TaiKhoan.update(
        {
          TenTaiKhoan,
          MatKhau: hashPassword(MatKhau),
          MaQuyen,
        },
        {
          where: {
            MaNV: MaNV,
          },
        }
      );
    }
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

// khoa mot tai khoan
exports.acountLock = async (req, res) => {
  try {
    const { MaNV } = req.params;
    if (!MaNV) {
      return res.status(500).json({
        success: false,
        msg: "Missing Input!",
      });
    }
    const x = await db.NhanVien.findOne({
      include: {
        model: db.HDLD,
        as: "hdld",
        where: {
          [Op.or]: [
            { NgayKetThuc: { [Op.lt]: new Date() } },
            {
              TrangThai: 0,
            },
          ],
        },
      },
      where: {
        MaNV,
      },
    });
    console.log(x);
    if (x !== null) {
      let taikhoan = await db.TaiKhoan.findOne({
        where: {
          MaNV,
        },
      });
      console.log(taikhoan);
      if (!taikhoan) {
        return res.status(404).json({
          success: false,
          msg: "Not Found",
        });
      } else {
        taikhoan = await db.TaiKhoan.update(
          {
            HoatDong: "0",
          },
          {
            where: {
              MaNV,
            },
          }
        );
      }
      return res.status(200).json({
        success: true,
        // data: taikhoan,
      });
    } else {
      return res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

// mo khoa tai khoan
exports.acountUnlock = async (req, res) => {
  try {
    const { MaNV } = req.params;
    if (!MaNV) {
      return res.status(500).json({
        success: false,
        msg: "Missing Input!",
      });
    }
    const x = await db.NhanVien.findOne({
      include: {
        model: db.HDLD,
        as: "hdld",
        where: {
          [Op.or]: [
            { NgayKetThuc: { [Op.gt]: new Date() }, NgayHuy: null },
            {
              TrangThai: 1,
            },
          ],
        },
      },
      where: {
        MaNV,
      },
    });
    console.log(x);
    if (x !== null) {
      let taikhoan = await db.TaiKhoan.findOne({
        where: {
          MaNV,
        },
      });
      console.log(taikhoan);
      if (!taikhoan) {
        return res.status(404).json({
          success: false,
          msg: "Not Found",
        });
      } else {
        taikhoan = await db.TaiKhoan.update(
          {
            HoatDong: 1,
          },
          {
            where: {
              MaNV,
            },
          }
        );
      }
      return res.status(200).json({
        success: true,
        // data: taikhoan,
      });
    } else {
      return res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

// Xoa tai khoan

// danh sach quyen
exports.getQuyen = async (req, res) => {
  try {
    const x = await db.Quyen.findAll({});
    return SS(res, x, 200);
  } catch (error) {
    return ReE(res, 500, error);
  }
};

exports.doiMatKhau = async (req, res) => {
  const { MaNV } = req.params;
  const { passwordOld, passwordNew, passwordConfirm } = req.body;
  try {
    if (!passwordOld || !passwordNew || !passwordConfirm) {
      return res.status(500).json({
        success: false,
        msg: "Missing Input!",
      });
    }

    let taikhoan = await db.TaiKhoan.findOne({ MaNV });
    // console.log(taikhoan);

    const isPassword = bcrypt.hashSync(req.body.passwordOld, taikhoan.MatKhau);

    if (!isPassword) {
      return res.status(400).json({
        success: false,
        msg: "Sai mat khau!",
      });
    } else {
      if (req.body.passwordNew !== req.body.passwordConfirm) {
        return res.status(400).json({
          success: false,
          msg: "Mat khau moi khong khop!",
        });
      } else {
        taikhoan = await db.TaiKhoan.update(
          {
            MatKhau: hashPassword(passwordNew),
          },
          {
            where: {
              MaNV,
            },
          }
        );

        return res.status(200).json({
          success: true,
          msg: "Thay doi mat khau thanh cong",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

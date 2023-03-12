const TaiKhoan = require("../models/taikhoan");
const taikhoan = require("../models/taikhoan");
const bcrypt = require("bcrypt");
const authController = require("./authController");
const db = require("../models");
const tt = require("../controllers/function");

const hashPassword = (MatKhau) => {
  bcrypt.hashPassword(MatKhau, bcrypt.genSaltSync(12));
};

exports.register = async (req, res) => {
  const { TenTaiKhoan, MaQuyen } = req.body;
  try {
    if (!MaQuyen || !TenTaiKhoan)
      return res.status(400).json({
        success: false,
        error: 1,
        msg: "Missing inputs !",
      });
    const response = await authController.registerService(req.body);

    if (response.success === true) {
      return res.status(200).json({
        success: true,
        response,
      });
    } else {
      return res.status(404).json({
        success: false,
        response,
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

exports.login = async (req, res) => {
  const { TenTaiKhoan, MatKhau } = req.body;

  try {
    if (!TenTaiKhoan || !MatKhau)
      return res.status(400).json({
        success: false,
        error: 1,
        msg: "Missing inputs !",
      });

    const taikhoan = await db.TaiKhoan.findOne({
      where: {
        TenTaiKhoan,
      },
    });
    if (!taikhoan.HoatDong) {
      return res.status(400).json({
        success: false,
        error: 1,
        msg: "Tai khoan bi khoa",
      });
    } else {
      const response = await authController.loginService(req.body);
      taikhoan.MatKhau = undefined;

      if (response.success === true) {
        return res.status(200).json({
          success: true,
          response,
          data: taikhoan,
        });
      } else {
        return res.status(404).json({
          success: false,
          response,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

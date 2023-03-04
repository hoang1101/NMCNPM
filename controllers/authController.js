const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const hashPassword = (MatKhau) =>
  bcrypt.hashSync(MatKhau, bcrypt.genSaltSync(12));

exports.registerService = ({ TenTaiKhoan, MatKhau, MaQuyen }) =>
  new Promise(async (resolve, reject) => {
    try {
      // const column = await db.TaiKhoan.describe();

      // const x = Object.keys(column).pop();
      // console.log(x);
      const response = await db.TaiKhoan.findOrCreate({
        where: {
          TenTaiKhoan,
        },
        defaults: {
          TenTaiKhoan,
          MatKhau: hashPassword(MatKhau),
          MaQuyen,
          HoatDong: "1",
        },
      });

      const token =
        response[1] &&
        jwt.sign(
          {
            MaNV: response[1].MaNV,
            MatKhau: response[1].MatKhau,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "365d",
          }
        );
      resolve({
        error: token ? 0 : 2, // 0 thanh cong // 2 that bai
        msg: token
          ? "Register is successfully !"
          : "TaiKhoan has been aldready used !",
        token: token || null,
        success: token ? true : false,
      });
    } catch (error) {
      reject(error);
    }
  });

exports.loginService = ({ TenTaiKhoan, MatKhau }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.TaiKhoan.findOne({
        where: {
          TenTaiKhoan,
        },
        raw: true,
      });
      const isCorrect =
        response && bcrypt.compareSync(MatKhau, response.MatKhau);
      const token =
        isCorrect &&
        jwt.sign(
          {
            TenTaiKhoan: response.TenTaiKhoan,
            MatKhau: response.MatKhau,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "365d",
          }
        );

      resolve({
        error: token ? 0 : 2,
        msg: token
          ? "Login is successfully !"
          : response
          ? "Password is wrong !"
          : "email not found !",
        token: token || null,
        success: token ? true : false,
      });
    } catch (error) {
      reject(error);
    }
  });

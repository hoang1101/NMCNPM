const jwt = require("jsonwebtoken");
const { info } = require("../controllers/function");
const taikhoan = require("../models/taikhoan");
const TaiKhoan = require("../models/taikhoan");
require("dotenv").config();
const db = require("../models");

exports.verifyToken = (req, res, next) => {
  const token = req.get("Authorization");
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.SECRET_KEY, (error, taikhoan) => {
      if (error) {
        res.status(403).json("Token is not vilid");
      }
      req.taikhoan = taikhoan;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated!");
  }
};

exports.verifyAdmin = (req, res, next) => {
  this.verifyToken(req, res, async () => {
    const data = req.taikhoan.TenTaiKhoan;
    const taikhoan = await db.TaiKhoan.findOne({
      where: {
        TenTaiKhoan: data,
      },
    });

    console.log(taikhoan.MaQuyen);
    if (taikhoan.MaQuyen === 1) {
      next();
    } else {
      res.status(403).json("You are not permission!");
    }
  });
};

exports.verifyManager = (req, res, next) => {
  this.verifyToken(req, res, async () => {
    const data = req.taikhoan.TenTaiKhoan;
    const taikhoan = await db.TaiKhoan.findOne({
      where: {
        TenTaiKhoan: data,
      },
    });

    console.log(taikhoan.MaQuyen);
    if (taikhoan.MaQuyen === 2) {
      next();
    } else {
      res.status(403).json("You are not permission!");
    }
  });
};

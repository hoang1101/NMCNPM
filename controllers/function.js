const taikhoan = require("../models/taikhoan");
const db = require("../models");

exports.info = async (MaNV) => {
  try {
    const role = await db.taikhoan.findOne({
      where: {
        MaNV,
      },
      raw: true,
    });
    return role;
  } catch (error) {
    return error;
  }
};

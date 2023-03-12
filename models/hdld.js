const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "HDLD",
    {
      MaHDLD: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      MaNV: {
        type: DataTypes.INTEGER,
      },
      NgayBatDau: {
        type: DataTypes.DATE,
      },
      NgayKetThuc: {
        type: DataTypes.DATE,
      },
      NgayKy: {
        type: DataTypes.DATE,
      },
      LCB: {
        type: DataTypes.INTEGER,
        defaultValue: 18000000,
      },
      NgayHuy: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      TrangThai: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
      freezeTableName: "hdld",
    }
  );

  Model.associate = function (models) {
    Model.belongsTo(models.BacLuong, {
      foreignKey: "MaBac",
      as: "bacluong",
    });
    Model.belongsTo(models.NhanVien, {
      foreignKey: "MaNV",
      as: "nhanvien",
    });
  };
  return Model;
};

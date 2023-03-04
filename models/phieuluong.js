const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "PhieuLuong",
    {
      MaNV: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      ThangTL: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      NamTL: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      NgayLap: {
        type: DataTypes.INTEGER,
      },
      LCB: {
        type: DataTypes.INTEGER,
      },
      SoNgayCong: {
        type: DataTypes.INTEGER,
      },
      SoNgayNghi: {
        type: DataTypes.INTEGER,
      },
      TienKTKL: {
        type: DataTypes.INTEGER,
      },
      SoTienLinh: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: "phieuluong",
    }
  );

  Model.associate = function (models) {
    Model.belongsTo(models.NhanVien, {
      foreignKey: "MaNV",
      as: "nhanvien",
    });
  };
  return Model;
};

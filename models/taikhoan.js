const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "TaiKhoan",
    {
      MaNV: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      TenTaiKhoan: {
        type: DataTypes.STRING,
        unique: true,
      },
      MatKhau: {
        type: DataTypes.STRING,
      },
      MaQuyen: {
        type: DataTypes.INTEGER,
      },
      HoatDong: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
      freezeTableName: "taikhoan",
    }
  );

  Model.associate = function (models) {
    Model.belongsTo(models.Quyen, {
      foreignKey: "MaQuyen",
      as: "quyen",
    });
    Model.hasOne(models.NhanVien, {
      foreignKey: "MaNV",
      as: "nhanvien",
    });
  };
  return Model;
};

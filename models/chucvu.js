const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "ChucVu",
    {
      MaChucVu: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      TenChucVu: {
        type: DataTypes.STRING,
        unique: true,
      },
      MoTa: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: "chucvu",
    }
  );

  Model.associate = function (models) {
    Model.hasMany(models.NhanVien, {
      foreignKey: "MaChucVu",
      as: "nhanvien",
    });
  };
  return Model;
};

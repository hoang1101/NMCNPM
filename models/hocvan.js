const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "HocVan",
    {
      MaHocVan: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      TrinhDo: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: "hocvan",
    }
  );

  Model.associate = function (models) {
    Model.hasMany(models.NhanVien, {
      foreignKey: "MaHocVan",
      as: "nhanvien",
    });
  };
  return Model;
};

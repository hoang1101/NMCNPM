const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "Quyen",
    {
      MaQuyen: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      TenQuyen: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: "quyen",
    }
  );

  Model.associate = function (models) {
    Model.hasMany(models.TaiKhoan, {
      foreignKey: "MaQuyen",
      as: "taikhoan",
    });
  };
  return Model;
};

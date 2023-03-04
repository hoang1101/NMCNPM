const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "KTKL",
    {
      SoQD: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      MaNV: {
        type: DataTypes.INTEGER,
      },
      HinhThuc: {
        type: DataTypes.BOOLEAN,
      },
      NgayQD: {
        type: DataTypes.DATEONLY,
      },
      LiDo: {
        type: DataTypes.STRING,
      },
      SoTien: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: "ktkl",
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

const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "BacLuong",
    {
      MaBac: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      HeSo: {
        type: DataTypes.FLOAT,
        unique: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: "bacluong",
    }
  );

  Model.associate = function (models) {
    Model.hasMany(models.HDLD, {
      foreignKey: "MaBac",
      as: "hdld",
    });
  };
  return Model;
};

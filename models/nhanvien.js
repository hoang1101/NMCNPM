const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "NhanVien",
    {
      MaNV: {
        type: DataTypes.INTEGER,
        // autoIncrement: true,
        primaryKey: true,
      },
      HoTen: {
        type: DataTypes.STRING,
      },
      MaChucVu: {
        type: DataTypes.INTEGER,
      },
      NgaySinh: {
        type: DataTypes.DATEONLY,
      },
      GioiTinh: {
        type: DataTypes.BOOLEAN,
        default: 1,
      },
      CCCD: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [13, 13],
        },
      },
      SDT: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [10, 10],
        },
      },
      Email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      DiaChi: {
        type: DataTypes.STRING,
      },
      QueQuan: {
        type: DataTypes.STRING,
      },
      MaHocVan: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: "nhanvien",
    }
  );

  Model.associate = function (models) {
    Model.belongsTo(models.TaiKhoan, {
      foreignKey: "MaNV",
      as: "taikhoan",
    });
    Model.hasMany(models.PhieuLuong, {
      foreignKey: "MaNV",
      as: "phieuluong",
    });
    Model.belongsTo(models.HocVan, {
      foreignKey: "MaHocVan",
      as: "hocvan",
    });
    Model.hasMany(models.KTKL, {
      foreignKey: "MaNV",
      as: "ktkl",
    });
    Model.hasMany(models.HDLD, {
      foreignKey: "MaNV",
      as: "hdld",
    });
    Model.belongsTo(models.ChucVu, {
      foreignKey: "MaChucVu",
      as: "chucvu",
    });
  };
  return Model;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.impression, {
        foreignKey: 'user_id'
      });
    }
  };
  user.init({
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_name',
      validate: {
        notEmpty: {
          msg: "名前を入力してください。"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email',
      validate: {
        notEmpty: {
          msg: "メールアドレスを入力してください。"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password',
      validate: {
        notEmpty: {
          msg: "パスワードを入力してください。"
        }
      }
    },
    user_path: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'user_path'
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
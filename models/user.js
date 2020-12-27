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
      field: 'user_name'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
    },
    user_path: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_path'
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class impression extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      impression.belongsTo(models.user, {
        foreignKey: 'user_id'
      });
      impression.belongsTo(models.book, {
        foreignKey: 'book_id'
      });
    }
  };
  impression.init({
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      field:'title'
    },
    impression: {
      type: DataTypes.TEXT,
      allowNull: false,
      field:'impression'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:'user_id'
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:'book_id'
    },
    genre: {
      type: DataTypes.TEXT,
      allowNull: false,
      field:'genre'
    }
  }, {
    sequelize,
    modelName: 'impression',
  });
  return impression;
};
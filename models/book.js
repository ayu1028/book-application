'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book.hasMany(models.impression, {
        foreignKey: 'book_id'
      });
    }
  };
  book.init({
    book_name: {
      type: DataTypes.TEXT,
      allowNull:false,
      field:'book_name'
    },
    author: {
      type: DataTypes.TEXT,
      allowNull:false,
      field:'author'
    },
    isbn: {
      type: DataTypes.INTEGER,
      allowNull:true,
      field:'isbn'
    },
    book_path: {
      type: DataTypes.STRING,
      allowNull:true,
      field:'book_path'
    }
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};
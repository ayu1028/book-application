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
      field:'book_name',
      validate: {
        notEmpty: {
          msg: "本のタイトルを入力してください。"
        }
      }
    },
    author: {
      type: DataTypes.TEXT,
      allowNull:false,
      field:'author',
      validate: {
        notEmpty: {
          msg: "著者を入力してください。"
        }
      }
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: '0000000000000',
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
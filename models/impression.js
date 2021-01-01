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
      field:'title',
      validate: {
        notEmpty: {
          msg: "感想のタイトルを入力してください。"
        }
      }
    },
    impression: {
      type: DataTypes.TEXT,
      allowNull: false,
      field:'impression',
      validate: {
        notEmpty: {
          msg: "感想を入力してください。"
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
      field:'genre',
      validate: {
        notEmpty: {
          msg: "ジャンルを選択してください。"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'impression',
  });
  return impression;
};
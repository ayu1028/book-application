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
      this.belongsTo(models.user, {
        foreignKey: 'user_id'
      });
      this.belongsTo(models.book, {
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
    genre: {
      type: DataTypes.TEXT,
      allowNull: false,
      field:'genre',
      validate: {
        isNotSelected(value) {
          if(value === 'notSelected') {
            throw new Error('ジャンルを選択してください。');
          }
        }
      }
    },
    visible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'visible',
      defaultValue: 1
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
    }
  }, {
    sequelize,
    modelName: 'impression',
  });
  return impression;
};
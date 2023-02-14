'use strict';
const {Model, Validator} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
        {foreignKey: 'ownerId', as: 'Owner'}
      )
      Spot.hasMany(
        models.Review,
        {foreignKey: 'spotId'}
      )
      Spot.hasMany(
        models.SpotImage,
        {foreignKey: 'spotId'}
      )
      Spot.hasMany(
        models.Booking,
        {foreignKey: 'spotId'}
      )
      Spot.hasMany(
        models.Favorite,
        {foreignKey: 'spotId'}
      )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4,100]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
      validate: {
        min: -200,
        max: 200
      }
    },
    lng: {
      type: DataTypes.FLOAT,
      validate: {
        min: -200,
        max: 200
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
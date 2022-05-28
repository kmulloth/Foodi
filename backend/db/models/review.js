'use strict';
module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define('Review', {
    user_id: DataTypes.INTEGER,
    business_id: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  reviews.associate = function(models) {
    // associations can be defined here
    reviews.belongsTo(models.User, { foreignKey: 'user_id' });
    reviews.belongsTo(models.Business, { foreignKey: 'business_id' });
  };
  return reviews;
};

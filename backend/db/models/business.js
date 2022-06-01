'use strict';
module.exports = (sequelize, DataTypes) => {
  const businesses = sequelize.define('Business', {
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    owner_id: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    location: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    likes: DataTypes.INTEGER
  }, {});
  businesses.associate = function(models) {
    // associations can be defined here
    businesses.belongsTo(models.User, { foreignKey: 'owner_id' });
    businesses.hasMany(models.Review, { foreignKey: 'business_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: 'true' });
    businesses.belongsToMany(models.Tag, { through: 'tags_businesses', foreignKey: 'business_id', otherKey: 'tag_id' });
    businesses.belongsToMany(models.User, { through: 'likes', foreignKey: 'business_id', otherKey: 'user_id' });

  };
  return businesses;
};

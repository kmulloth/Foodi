'use strict';
module.exports = (sequelize, DataTypes) => {
  const tags = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {});
  tags.associate = function(models) {
    // associations can be defined here
    tags.belongsToMany(models.Business, { through: 'tags_businesses', foreignKey: 'tag_id', otherKey: 'business_id' });
  };
  return tags;
};

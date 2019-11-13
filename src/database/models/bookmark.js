'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookmark = sequelize.define('Bookmarks', {
    UserId: DataTypes.INTEGER,
    AccommodationId: DataTypes.INTEGER,
  }, {});
  bookmark.associate = function(models) {
      bookmark.belongsTo(models.Users, {
        foreignKey: 'UserId',
        targetKey: 'id',
        allowNull: false,
      });  
      bookmark.belongsTo(models.Accommodations, {
        foreignKey: 'AccommodationId',
        targetKey: 'id',
        allowNull: false,
      }); 
  };
  return bookmark;
};
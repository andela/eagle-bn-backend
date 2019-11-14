'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chats = sequelize.define('Chats', {
    authorId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    AccommodationId: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER
  }, {});
  Chats.associate = function(models) {
      Chats.belongsTo(models.Users, {
          foreignKey: 'authorId',
          targetKey: 'id',
          allowNull: false,
          as:'author',
        });
      Chats.belongsTo(models.Users, {
          foreignKey: 'receiverId',
          targetKey: 'id',
          allowNull: true, 
          as: 'receiver'
      });
      Chats.belongsTo(models.Chats, {
        foreignKey: 'parentId',
        targetKey: 'id',
        allowNull: true, 
        as: 'parent'
      });
      Chats.belongsTo(models.Accommodations, {
      foreignKey: 'AccommodationId',
      targetKey: 'id',
      allowNull: true, 
      as: 'accommodation'
      });
  };
  return Chats;
};
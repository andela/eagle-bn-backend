'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chats = sequelize.define('Chats', {
    authorId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  Chats.associate = function(models) {
      Chats.belongsTo(models.Users, {
          foreignKey: 'authorId',
          targetKey: 'id',
          allowNull: false,
        });
      Chats.belongsTo(models.Users, {
          foreignKey: 'receiverId',
          targetKey: 'id',
          allowNull: true,
      });
  };
  return Chats;
};
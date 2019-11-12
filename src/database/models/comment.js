'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    comment: { type: DataTypes.STRING, allowNull: false },
    parent: {type: DataTypes.INTEGER, allowNull: true}, 
    deletedAt: {type: DataTypes.DATE,allowNull: true, }
  }, { freezeTableName: true });
  Comments.associate = function(models) {
    Comments.belongsTo(models.Users, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    Comments.belongsTo(models.Requests, {
        foreignKey: 'requestId',
        targetKey: 'id',
      });

  };
  return Comments;
};

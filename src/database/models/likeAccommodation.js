'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likings = sequelize.define('Likings', {
    isLiked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    accommodationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, { freezeTableName: true });
  Likings.associate = function(models) {
    Likings.belongsTo(models.Users, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      Likings.belongsTo(models.Accommodations, {
        foreignKey: 'accommodationId',
        targetKey: 'id',
      });

  };
  return Likings;
};

module.exports = (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodations', {
    userid: DataTypes.INTEGER,
    name:DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    availableSpace: DataTypes.STRING,
    cost: DataTypes.DOUBLE,
    services: DataTypes.STRING,
    amenities: DataTypes.STRING,
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USD',
    }
  }, { freezeTableName: true });
  Accommodation.associate = function(models) {
      Accommodation.belongsTo(models.Users, {
          foreignKey: 'userid',
          targetKey: 'id',
        });
  Accommodation.hasMany(models.AccommodationImages, {
    foreignKey: 'accommodationid',
    targetKey: 'id',
  });
  Accommodation.hasMany(models.Bookmarks, {
    foreignKey: {
      allowNull: true,
    },
    onDelete: 'SET NULL',
});
  };
  return Accommodation;
};

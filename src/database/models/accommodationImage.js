module.exports = (sequelize, DataTypes) => {
    const AccommodationIm = sequelize.define('AccommodationImages', {
      accommodationid: DataTypes.INTEGER,
      imageurl: DataTypes.STRING,
    }, { freezeTableName: true });
    AccommodationIm.associate = function(models) {
         AccommodationIm.belongsTo(models.Accommodations, {
          foreignKey: 'accommodationid',  
          targetKey: 'id',
          });        
    };
    return AccommodationIm;
  };

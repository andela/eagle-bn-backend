/**
 * @swagger
 *
 * definitions:
 *   Accommodation:
 *     type: object
 *     required:
 *     properties:
 *       id:
 *         type: string
 *       userid:
 *         type: string
 *       description:
 *         type: string
 *       address:
 *         type: string
 *       availableSpace: 
 *         type: string
 *       cost:
 *         type: string
 *       services:
 *         type: string
 *       amenities: 
 *         type: string
 */
module.exports = (sequelize, DataTypes) => {
    const Accommodation = sequelize.define('Accommodations', {
      userid: DataTypes.INTEGER,
      description: DataTypes.STRING,
      address: DataTypes.STRING,
      availableSpace: DataTypes.STRING,
      cost: DataTypes.DOUBLE,
      services: DataTypes.STRING,
      amenities: DataTypes.STRING
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
    };
    return Accommodation;
  };

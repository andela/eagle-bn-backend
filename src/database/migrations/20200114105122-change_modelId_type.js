'use strict';
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Notifications', 'modelId', {
      type: Sequelize.STRING,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Notifications', 'modelId', {
      type: Sequelize.STRING,
    })
  }
};

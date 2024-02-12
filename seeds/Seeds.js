const sequelize = require('../config/connection');
const { User } = require('../models');
const { Invoice } = require('../models');

const userData = require('./userData.json');
const invoice = require('./invoicesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Invoice.bulkCreate(invoice, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
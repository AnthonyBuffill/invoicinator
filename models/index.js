const User = require('./user');
const Invoice = require('./invoice');


User.hasMany(Invoice, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  

  Invoice.belongsTo(User, {
    foreignKey: 'user_id',
  });

module.exports = { User, Invoice };


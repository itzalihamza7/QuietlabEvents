
module.exports = function (db) {
 
  db.authorizations.belongsTo(db.users, { as: 'user', foreignKey: 'user_id' });
  db.users.hasMany(db.authorizations, { as: 'authorizations', foreignKey: 'user_id' });
  db.stores.hasMany(db.events, { as:'events' , foreignKey: 'store_id' });
  db.events.belongsTo(db.stores, { as:'store', foreignKey: 'store_id' });
}
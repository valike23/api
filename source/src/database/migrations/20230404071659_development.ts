const knex = require('knex');

exports.up = function (knex) {
  return knex.schema
   
    .createTable('admins', function (table) {
      table.increments('id');
      table.string('email').unique();
      table.string('password');
      table.string('name');
      table.timestamps(false, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('admins');
};

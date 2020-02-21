'use strict';

module.exports = {
    async up(knex) {

        await knex.schema.createTable('user', (table) => {

            table.increments('id');
            table.string('username').unique();
            table.string('email').unique();
            table.string('firstName');
            table.string('lastName');
            table.string('password');

            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        });
    },
    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    }
};

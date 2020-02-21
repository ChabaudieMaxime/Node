'use strict';

module.exports = {
    async up(knex) {

        await knex.schema.createTable('cart', (table) => {

            table.increments('id');
            table.integer('idUser');
            table.boolean('payed');

        });

        await knex.schema.createTable('cart_movies', (table) => {

            table.integer('idCart');
            table.integer('idMovie');

        });
    },
    async down(knex) {

        await knex.schema.dropTableIfExists('cart');
        await knex.schema.dropTableIfExists('cart_movies');
    }
};

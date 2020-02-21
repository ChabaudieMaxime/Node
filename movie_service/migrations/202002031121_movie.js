'use strict';

module.exports = {
    async up(knex) {

        await knex.schema.createTable('movie', (table) => {

            table.increments('id');
            table.string('title');
            table.date('releaseDate');
            table.string('director');
            table.float('price');

        });
    },
    async down(knex) {

        await knex.schema.dropTableIfExists('movie');
    }
};

'use strict';

const Schmervice = require('schmervice');
const got = require('got');
const Boom = require('@hapi/boom');

const instance = got.extend({resolveBodyOnly: true,responseType: 'json',
    hooks: {
        beforeRequest: [
            options => {
                if (!options.context && !options.ctx.token) {
                    throw new Error('Token required');
                }

                options.headers.authorization = options.ctx.token;

            }
        ]
    }
});

module.exports = class MovieService extends Schmervice.Service {

    list(query, ctx = {}) {

        const { Movie } = this.server.models();

        if (query.title) return Movie.query(ctx.trx).select()
            .where({title: query.title});
        else return Movie.query(ctx.trx);
    }

    findById(id, ctx = {}) {

        const { Movie } = this.server.models();

        return Movie.query(ctx.trx).findById(id);
    }

    create(movie, ctx = {}) {

        const { Movie } = this.server.models();

        return Movie.query(ctx.trx).insert(movie);
    }

    async update(id, movie, ctx = {}) {

        const { Movie } = this.server.models();

        await Movie.query(ctx.trx).where({id}).first().patch(movie);

        return this.findById(id);
    }

    async delete(id, ctx = {}) {

        const { Movie } = this.server.models();

        try {
            const response = await instance.delete('http://127.0.0.1:3000/cart/deleteAllCartMovies/'+id, {ctx});

            return Movie.query(ctx.trx).delete().where({ id : id });
        } catch (error) {
            console.log(error);
            throw Boom.badRequest();
        }


    }
};

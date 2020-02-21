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

module.exports = class PayementService extends Schmervice.Service {
/*
    list(query, ctx = {}) {

        const { Movie } = this.server.models();

        if (query.title) return Movie.query(ctx.trx).select()
            .where({title: query.title});
        else return Movie.query(ctx.trx);
    }
*/
    findById(id, ctx = {}) {

        const { Cart } = this.server.models();

        return Cart.query(ctx.trx).findById(id);
    }


    async create(cart, ctx = {}) {
            try {
                const response = await instance('http://127.0.0.1:3000/user/'+cart.idUser, {ctx});

                const { Cart } = this.server.models();

                return Cart.query(ctx.trx).insert(cart);
            } catch (error) {
                throw Boom.badRequest();
            }


    }

    async createCartMovie(cart_movie, ctx = {}) {
        try {
            const response = await instance('http://127.0.0.1:3000/movie/'+cart_movie.idMovie, {ctx});
            const cart = await this.findById(cart_movie.idCart);

            if ( cart ) {
                const {Cart_Movie} = this.server.models();

                return Cart_Movie.query(ctx.trx).insert(cart_movie);
            }

            throw Boom.notFound();
        } catch (error) {
            console.log(error);
            throw Boom.badRequest();
        }
    }

    async deleteCartMovie(cart_movie, ctx = {}) {
        try {
            const response = await instance('http://127.0.0.1:3000/movie/'+cart_movie.idMovie, {ctx});
            const cart = await this.findById(cart_movie.idCart);

            if ( cart ) {
                const {Cart_Movie} = this.server.models();

                return Cart_Movie.query(ctx.trx).delete().where({idCart : cart_movie.idCart,idMovie : cart_movie.idMovie}).limit(1);
            }

            throw Boom.notFound();
        } catch (error) {
            console.log(error);
            throw Boom.badRequest();
        }
    }

    async deleteAllCartMovies(idMovie, ctx = {}) {

        try {

            const {Cart_Movie} = this.server.models();

            return Cart_Movie.query(ctx.trx).delete().where({idMovie : idMovie}).debug();

        } catch (error) {
            console.log(error);
            throw Boom.badRequest();
        }
    }

    async findCart(id, ctx = {}) {

        const { Cart } = this.server.models();
        const { Cart_Movie } = this.server.models();

        const cart = await Cart.query(ctx.trx).findById(id);

        if (cart) {

            const cartMovies = await Cart_Movie.query(ctx.trx).select()
                .where({idCart: id});

            const movies = await Promise.all(cartMovies.map(movie => instance('http://127.0.0.1:3000/movie/'+movie.idMovie, {ctx})));
            let price=0;

            for (let i=0;i<movies.length;i++) {
                price += movies[i].price;
            }

            price *= 1.2;

            return {
                idCart : id,
                price : price,
                movies : movies,
            }
        }
        throw Boom.badRequest();
    }

    async payCart(id, cardNumber, ctx = {}) {

        const { Cart } = this.server.models();

        const cart = await Cart.query(ctx.trx).findById(id);

        if (cart) {
            cart.payed=true;
            return Cart.query(ctx.trx).where({id}).first().patch(cart);
        }

        throw Boom.notFound();

    }
    /*

    async update(id, movie, ctx = {}) {

        const { Movie } = this.server.models();

        await Movie.query(ctx.trx).where({id}).first().patch(movie);

        return this.findById(id);
    }

    delete(id, ctx = {}) {

        const { Movie } = this.server.models();

        return Movie.query(ctx.trx).delete().where({ id });
    }
*/};

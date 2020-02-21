'use strict';

const Toys = require('toys');
const Joi  = require('@hapi/joi');
const Cart = require('../models/cart');
const CartMovies = require('../models/cart_movies');

const defaults = Toys.withRouteDefaults({
    options : {
        tags     : ['api', 'cart', 'cart_movie'],
        response : {
            schema : Joi.object({
                id        : Cart.field('id'),
                idUser     : Cart.field('idUser'),
            })
        }
    }
});

module.exports = defaults([
    {
        method  : 'post',
        path    : '/cart',
        options : {
            validate : {
                payload : Joi.object({
                    idUser  : Cart.field('idUser').required(),

                })
            },
            response : {
                emptyStatusCode : 204,
                schema : true
            },
        },

        handler : (request) => {

            const { payementService } = request.services();

            return payementService.create(request.payload, request.auth);
        }
    },
    {
        method  : 'post',
        path    : '/cart/createCartMovie',
        options : {
            validate : {
                payload : Joi.object({
                    idCart : CartMovies.field('idCart').required(),
                    idMovie : CartMovies.field('idMovie').required(),
                })
            },
            response : {
                emptyStatusCode : 204,
                schema : true
            }
        },
        handler : async (request) => {

            const { payementService } = request.services();

            return payementService.createCartMovie(request.payload, request.auth);

        }
    },
    {
        method  : 'delete',
        path    : '/cart/deleteCartMovie',
        options : {
            validate : {
                payload : Joi.object({
                    idCart : CartMovies.field('idCart').required(),
                    idMovie : CartMovies.field('idMovie').required(),
                })
            },
            response : {
                emptyStatusCode : 204,
                schema : true
            }
        },
        handler : async (request) => {

            const { payementService } = request.services();

            return payementService.deleteCartMovie(request.payload, request.auth);

        }
    },
    {
        method  : 'delete',
        path    : '/cart/deleteAllCartMovies/{id}',
        options : {
            validate : {
                params : Joi.object({
                    id : CartMovies.field('idMovie'),
                })
            },
            response : {
                emptyStatusCode : 204,
                schema : true
            }
        },
        handler : async (request) => {

            console.log(request.params);

            const { payementService } = request.services();

            return payementService.deleteAllCartMovies(request.params.id, request.auth);

        }
    },
    {
        method  : 'get',
        path    : '/cart/{id}',
        options : {
            validate : {
                params : Joi.object({
                    id : Cart.field('id')
                })
            },
            response : {
                emptyStatusCode : 204,
                schema : true
            }
        },
        handler : async (request) => {

            const { payementService } = request.services();

            return payementService.findCart(request.params.id, request.auth);
        }
    },
    {
        method  : 'post',
        path    : '/cart/payement',
        options : {
            validate : {
                payload : Joi.object({
                    idCart : Cart.field('id').required(),
                    cardNumber : Joi.string().required().min(16).max(16),
                    cardCode : Joi.string().required().min(3).max(3),
                    name : Joi.string().required(),
                    lastname : Joi.string().required(),

                })
            },
            response : {
                emptyStatusCode : 204,
                schema : true
            }
        },
        handler : async (request) => {

            const { payementService } = request.services();

            return payementService.payCart(request.payload.idCart, request.payload.cardNumber, request.auth);
        }
    },/*
    {//TODO: Créer la route GET /user_service/{id} pour récuperer un utilisateur
        method  : 'get',
        path    : '/movie/{id}',
         options : {
             validate : {
                 params : Joi.object({
                     id : Movie.field('id')
                 })
             },
             response : {
                 emptyStatusCode : 204,
                 schema : true
             }
         },
        handler : async (request) => {

            const { movieService } = request.services();

            return movieService.findById(request.params.id);
        }
    },//TODO: Créer la route PATCH /user_service/{id} pour modifier un utilisateur

    {
        method  : 'patch',
        path    : '/movie/{id}',
        options : {
            validate : {
                params : Joi.object({
                    id : Movie.field('id')
                }),
                payload : Joi.object({
                    title  : Movie.field('title').required(),
                    releaseDate : Movie.field('releaseDate').required(),
                    director  : Movie.field('director').required()
                })
            },
            response : {
                emptyStatusCode : 204,
                schema : true
            }
        },
        handler : async (request) => {

            const { movieService } = request.services();

            return movieService.update(request.params.id,request.payload);
        }
    },/*
    {
        method  : 'post',
        path    : '/user_service/login',
        options : {
            validate : {
                payload : Joi.object({
                    username  : User.field('username').required(),
                    password  : User.field('password').required()
                })
            },
            response : {
                emptyStatusCode : 204,
                schema: Joi.object({
                    token:Joi.string()
                })
            },
            auth    : false
        },
        handler : async (request) => {

            const { authService } = request.services();

            return authService.login(request.payload.username, request.payload.password, request);
        }
    }*/
]);

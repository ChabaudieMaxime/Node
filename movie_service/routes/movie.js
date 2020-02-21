'use strict';

const Toys = require('toys');
const Joi  = require('@hapi/joi');
const Movie = require('../models/movie');

const defaults = Toys.withRouteDefaults({
    options : {
        tags     : ['api', 'movie'],
        response : {
            schema : Joi.object({
                id        : Movie.field('id'),
                title     : Movie.field('title'),
                releaseDate : Movie.field('releaseDate'),
                director : Movie.field('director')
            })
        }
    }
});

module.exports = defaults([
    {
        method  : 'post',
        path    : '/movie',
        options : {
            validate : {
                payload : Joi.object({
                    title  : Movie.field('title').required(),
                    releaseDate : Movie.field('releaseDate').required(),
                    director  : Movie.field('director').required(),
                    price  : Movie.field('price').required(),
                })
            },
            response : {
                emptyStatusCode : 204,
                schema : true
            },
        },

        handler : (request) => {

            const { movieService } = request.services();

            return movieService.create(request.payload);
        }
    },
    {
        method  : 'delete',
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

            await movieService.delete(request.params.id, request.auth);

            return "";
        }
    },//TODO: Créer la route GET /users pour lister les utilisateurs
    {
        method  : 'get',
        path    : '/movies',
        options : {
            response: {
                emptyStatusCode: 204,
                schema: true
            },
            validate: {
                query:
                    Joi.object({
                        title: Joi.string()
                    })
            }

        },
        handler : async (request) => {

            const { movieService } = request.services();

            return movieService.list(request.query);
        }
    },
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

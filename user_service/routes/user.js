'use strict';

const Toys = require('toys');
const Joi  = require('@hapi/joi');
const User = require('../models/user');

const defaults = Toys.withRouteDefaults({
    options : {
        tags     : ['api', 'user'],
        response : {
            schema : Joi.object({
                id        : User.field('id'),
                username  : User.field('username'),
                firstName : User.field('firstName'),
                lastName  : User.field('lastName'),
                email     : User.field('email'),
                createdAt : User.field('createdAt'),
                updatedAt : User.field('updatedAt')
            })
        }
    }
});

module.exports = defaults([
    {
        method  : 'post',
        path    : '/user',
        options : {
            validate : {
                payload : Joi.object({
                    username  : User.field('username').required(),
                    firstName : User.field('firstName').required(),
                    lastName  : User.field('lastName').required(),
                    email     : User.field('email').required(),
                    password  : User.field('password').required()
                })
            },
            auth    : false
        },

        handler : (request) => {

            const { userService } = request.services();

            return userService.create(request.payload);
        }
    },
    {
        method  : 'delete',
        path    : '/user/{id}',
        options : {
            validate : {
                params : Joi.object({
                    id : User.field('id')
                })
            },
            response : {
                emptyStatusCode : 204,
                schema : true
            }
        },
        handler : async (request) => {

            const { userService } = request.services();

            await userService.delete(request.params.id);

            return "";
        }
    },//TODO: Créer la route GET /users pour lister les utilisateurs
    {
        method  : 'get',
        path    : '/users',
        options : {
            response : {
                emptyStatusCode : 204,
                schema : true
            }
        },
        handler : async (request) => {

            const { userService } = request.services();

            return userService.list();
        }
    },
    {//TODO: Créer la route GET /user/{id} pour récuperer un utilisateur
        method  : 'get',
        path    : '/user/{id}',
         options : {
             validate : {
                 params : Joi.object({
                     id : User.field('id')
                 })
             },
             response : {
                 schema : true
             }
         },
        handler : async (request) => {

            const { userService } = request.services();

            return userService.findById(request.params.id);
        }
    },//TODO: Créer la route PATCH /user/{id} pour modifier un utilisateur

    {
        method  : 'patch',
        path    : '/user/{id}',
        options : {
            validate : {
                params : Joi.object({
                    id : User.field('id')
                }),
                payload : Joi.object({
                    username  : User.field('username').required(),
                    firstName : User.field('firstName').required(),
                    lastName  : User.field('lastName').required(),
                    email     : User.field('email').required(),
                    password  : User.field('password').required()
                })
            },
            response : {
                emptyStatusCode : 204,
                schema : true
            }
        },
        handler : async (request) => {

            const { userService } = request.services();

            return userService.update(request.params.id,request.payload);
        }
    },
    {
        method  : 'post',
        path    : '/user/login',
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
    }
]);

'use strict';

const Schwifty = require('schwifty');
const Joi      = require('@hapi/joi');

module.exports = class Movie extends Schwifty.Model {

    static get tableName() {

        return 'movie';
    }

    static field(name) {
        return this.getJoiSchema().extract(name)
            .optional()
            .options({noDefaults: true});
    }

    static get joiSchema() {

        return Joi.object({
            id    : Joi.number().integer(),
            title : Joi.string().max(255),
            releaseDate : Joi.date(),
            director : Joi.string().max(255),
            price : Joi.number()
        });
    }

};

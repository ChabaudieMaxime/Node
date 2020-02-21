'use strict';

const Schwifty = require('schwifty');
const Joi      = require('@hapi/joi');

module.exports = class Cart_Movie extends Schwifty.Model {

    static get tableName() {

        return 'cart_movies';
    }

    static field(name) {
        return this.getJoiSchema().extract(name)
            .optional()
            .options({noDefaults: true});
    }

    static get joiSchema() {

        return Joi.object({
            idCart    : Joi.number().integer(),
            idMovie : Joi.number().integer(),
        });
    }

};

'use strict';

const Schwifty = require('schwifty');
const Joi      = require('@hapi/joi');

module.exports = class Cart extends Schwifty.Model {

    static get tableName() {

        return 'cart';
    }

    static field(name) {
        return this.getJoiSchema().extract(name)
            .optional()
            .options({noDefaults: true});
    }

    static get joiSchema() {

        return Joi.object({
            id    : Joi.number().integer(),
            idUser : Joi.number().integer(),
            payed : Joi.boolean(),
        });
    }

};

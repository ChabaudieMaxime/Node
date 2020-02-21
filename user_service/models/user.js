'use strict';

const Schwifty = require('schwifty');
const Joi      = require('@hapi/joi');

module.exports = class User extends Schwifty.Model {

    static get tableName() {

        return 'user';
    }

    static field(name) {
        return this.getJoiSchema().extract(name)
            .optional()
            .options({noDefaults: true});
    }

    static get joiSchema() {

        return Joi.object({
            id        : Joi.number().integer(),
            username  : Joi.string().max(255),
            email     : Joi.string().email(),
            firstName : Joi.string().max(100),
            lastName  : Joi.string().max(100),
            password  : Joi.string(),
            createdAt : Joi.date(),
            updatedAt : Joi.date()
        });
    }

    $beforeInsert() {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate() {

        this.updatedAt = new Date();
    }

};

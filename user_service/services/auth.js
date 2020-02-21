'use strict';

const Schmervice = require('schmervice');
const Boom       = require('@hapi/boom');
const Jwt        = require('jsonwebtoken');

module.exports = class AuthService extends Schmervice.Service {

    async login(username, password, request, ctx = {}) {

        const { userService } = request.services();
        const user = userService.findByUsernameAndPassword(username,password);

        const result = await user.execute();

        if (result.length===1) {
            const token = Jwt.sign({username:result[0].username},'123');
            return {token};
        }



        return Boom.forbidden();

    }
};

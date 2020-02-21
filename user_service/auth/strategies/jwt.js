'use strict';

module.exports = (server, options) => {

    return {
        name    : 'jwt',
        scheme  : 'jwt',
        options : {
            key      : '123',
            validate : async (decoded, request) => {

                return { isValid : true };

                /*const { userService } = request.services(true);

                try {
                    console.log(decoded.id);

                    await userService.findById(decoded.id);

                    return { isValid : true };
                } catch (error) {

                    return { isValid : false };
                }*/
            }
        }
    };
};

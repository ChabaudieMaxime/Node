'use strict';

const HauteCouture = require('haute-couture');
const Package = require('../package.json');

exports.plugin = {
    name: "movie",
    register: async (server, options) => {

        // Custom plugin code can go here

        await HauteCouture.using()(server, options);
    }
};

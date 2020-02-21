'use strict';

const Toys = require('toys');
const Avocat = require('avocat');

module.exports = Toys.onPreResponse((request, h) => {

    const { response: error } = request;

    Avocat.rethrow(error);

    return h.continue;
});
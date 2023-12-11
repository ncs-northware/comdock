'use strict';

/**
 * lei service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lei.lei');

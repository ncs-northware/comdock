'use strict';

/**
 * external-shareholder service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::external-shareholder.external-shareholder');

'use strict';

/**
 * hr-public service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hr-public.hr-public');

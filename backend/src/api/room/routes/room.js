'use strict';

/**
 * room router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::room.room', {
    config: {
      find: {
        middlewares: ["api::room.room-populate-middleware"]
      },
      findOne: {
        middlewares: ["api::room.room-populate-middleware"]
      },
    }
  });

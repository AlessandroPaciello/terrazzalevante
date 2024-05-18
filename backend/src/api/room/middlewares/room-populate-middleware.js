"use strict";

/**
 * `page-populate-middleware` middleware
 */

// const populate = {
//   picture: {
//     fields: ["url", "alternativeText", "caption", "width", "height"],
//   },
//   about: {
//     fields: ["label", "value"],
//   },
//   image: {
//     fields: ["url", "alternativeText", "caption", "width", "height"],
//   },
//   gallery: {
//     fields: ["url", "alternativeText", "caption", "width", "height"],
//   },
//   seo: {
//     fields: ["metaTitle", "metaDescription"],
//     populate: { shareImage: true },
//   }
// };

const populate = {
  contentSections: {
    populate: {
      picture: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      room: {
        fields: ["title", "description"],
        populate: {
          about: {
            fields: ["label", "value"],
          },
          image: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
          gallery: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          }
        }
      },
      rooms: {
        fields: ["title", "description"],
        populate: {
          about: {
            fields: ["label", "value"],
          },
          image: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        }
      },
      services: {
        fields: ["title", "description"],
        populate: {
          about: {
            fields: ["label", "value"],
          },
          image: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
          gallery: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          }
        }
      },
      inputs: {
        fields: ["label", "placeholder", "type", "extend"],
        populate: {
          options: {
            filends: ["label", "value"],
          }
        }
      },
      submit: {
        populate: true
      },
      success: {
        populate: true
      },
    }
  },

  seo: {
    fields: ["metaTitle", "metaDescription"],
    populate: { shareImage: true },
  }
};

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query = {
      populate,
      filters: { slug: ctx.query.filters.slug },
      locale: ctx.query.locale,
    };

    await next();
  };
};

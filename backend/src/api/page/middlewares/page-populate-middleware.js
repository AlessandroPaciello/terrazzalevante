"use strict";

/**
 * `page-populate-middleware` middleware
 */

const populate = {
  contentSections: {
    populate: {
      picture: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      buttons: {
        populate: true,
      },
      feature: {
        populate: {
          fields: ["title", "description", "showLink", "newTab", "url", "text"],
          room: {
            fields: ["title", "description"],
            populate: {
              // about: {
              //   fields: ["label", "value"],
              // },
              image: {
                fields: ["url", "alternativeText", "caption", "width", "height"],
              },
            }
          }
          // media: {
          //   fields: ["url", "alternativeText", "caption", "width", "height"],
          // },
        },
      },
      testimonials: {
        populate: {
          picture: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      plans: {
        populate: ["product_features"],
      },
      submitButton: {
        populate: true,
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
      }
    },
    featureColumn: {
      fields: ["title", "description"],
    },
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

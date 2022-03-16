module.exports = {
  siteMetadata: {
    title: `todo-prototyp-app`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: ['gatsby-plugin-sass'],
};

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

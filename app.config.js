const dotenv = require('dotenv');
dotenv.config();

module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    BASE_URL: process.env.BASE_URL
  },
});

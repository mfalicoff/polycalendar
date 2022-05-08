const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    reactStrictMode: true,
    env: {
        ROUTE: process.env.ROUTE,
    },
});

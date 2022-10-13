const path = require("path");
const glob = require("glob");
module.exports = {
    mode: "production",
    watch: true,
    entry: {
        snake: glob.sync("./assets/js/snake/*.js"),
        2048: glob.sync("./assets/js/2048/*.js"),
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "assets/js/bundle/"),
        clean: true,
    },
};

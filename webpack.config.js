const path = require("path");
const glob = require("glob");
module.exports = {
    mode: "production",
    watch: true,
    entry: {
        snake: glob.sync("./assets/js/snake/*.js"),
        rsp: glob.sync("./assets/js/rsp/*.js"),
        match: glob.sync("./assets/js/match/*.js"),
        2048: glob.sync("./assets/js/2048/*.js"),
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "assets/js/bundle/"),
        clean: true,
    },
};

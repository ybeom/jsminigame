const path = require("path");
const glob = require("glob");
module.exports = {
    mode: "production",
    watch: true,
    entry: {
        snake: glob.sync("./assets/js/snake/*.js"),
        // rsp: glob.sync("./assets/js/rsp/*.js"),
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "assets/js/bundle/"),
        clean: true,
    },
};

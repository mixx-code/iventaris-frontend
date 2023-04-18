const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const compression = require("compression");
const helmet = require("helmet");
const config = require("./webpack.config.js");

const compiler = webpack(config);
const server = new WebpackDevServer({
  setupMiddlewares: (app, options) => {
    app.use(webpackDevMiddleware(compiler, options));
    app.use(webpackHotMiddleware(compiler));
    app.use(compression());
    app.use(helmet());
  },
});

server.listen(8080);

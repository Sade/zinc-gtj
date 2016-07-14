const path = require('path');

const pkg = require('./package.json');
const parts = require('./libs/parts');

const merge = require('webpack-merge');
const validate = require('webpack-validator');

const PATHS = {
    app: path.join(__dirname, 'app'),
    style: [
        path.join(__dirname, 'node_modules', 'purecss'),
        path.join(__dirname, 'app/scss', 'bundle.scss')
    ],
    build: path.join(__dirname, 'build')
};

const common = {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
        style: PATHS.style,
        app: PATHS.app,
        vendor: Object.keys(pkg.dependencies)
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        // Tweak this to match your GitHub project name
        publicPath: '/' + pkg.name + '/',
        filename: '[name].js'
    }
};

var config;

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
    case 'build':
    case 'stats':
        config = merge(
            common,
            {
                devtool: 'source-map',
                output: {
                    path: PATHS.build,
                    filename: '[name].[chunkhash].js',
                    // This is used for require.ensure. The setup
                    // will work without but this is useful to set.
                    chunkFilename: '[chunkhash].js'
                }
            },
            parts.clean(PATHS.build),
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            parts.extractBundle({
                name: 'vendor',
                entries: ['react']
            }),
            parts.babelJS(PATHS.app),
            parts.setupHTML(pkg),
            parts.extractCSS(PATHS.style),
            parts.purifyCSS([PATHS.app]),
            parts.minify()
        );
        break;
    default:
        config = merge(
            common,
            {
                devtool: 'eval-source-map'
            },
            parts.babelJS(PATHS.app),
            parts.setupHTML(pkg),
            parts.extractCSS(PATHS.style),
            parts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = validate(config, {
        quiet: true
    }
);
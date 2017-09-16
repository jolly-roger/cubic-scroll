const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

export default{
    input: 'src/index.js',
    plugins: [
        babel({
            presets: ['es2015-rollup'],
            babelrc: false,
            exclude: 'node_modules/**'
        }),
        //uglify()
    ],
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'fluidScroll'
    }
};
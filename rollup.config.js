import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/jsx/index.jsx',
  output: {
    format: 'iife',
    file: 'dist/app.js',
    name: 'app',
    sourcemap: false,
    strict: true
  },
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main', 'jsnext:main']
    }),
    babel({
      sourceMap: false,
      exclude: 'node_modules/**',
      babelrc: false,
      plugins: [
        ['@babel/plugin-transform-react-jsx', {'pragma': 'h'}],
      ]
    }),
    commonjs({
      include: 'node_modules/**',
    })
  ]
};

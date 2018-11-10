import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/jsx/index.jsx',
  output: {
    format: 'iife',
    file: 'dist/app.js',
    name: 'app',
    sourcemap: true,
    strict: true
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    babel({
      sourceMap: true,
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

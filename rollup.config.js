import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';


const extensions = ['.js', '.jsx', '.ts', '.tsx']

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
      extensions,
      mainFields: ['module', 'main', 'jsnext:main']
    }),
    babel({
      extensions,
      sourceMap: false,
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        ['@babel/preset-typescript', { isTSX: true, allExtensions: true, jsxPragma: 'h' }]
      ],
      plugins: [
        ['@babel/plugin-transform-react-jsx', { pragma: 'h', pragmaFrag: 'Fragment', }],
      ]
    }),
    commonjs({
      include: 'node_modules/**',
    })
  ]
};

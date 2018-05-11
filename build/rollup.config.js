import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default  {
  input: 'source/main.js',
  output: {
    file: 'assets/dist/script.js',
    format: 'iife',
    name: 'main',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  },
  external: ['react', 'react-dom'],
  plugins: [
    babel({
      presets: [
        [
          'env',
          { modules: false }
        ]
      ],
      plugins: [
        'external-helpers'
      ],
      externalHelpers: true
    }),
    commonjs(),
    nodeResolve({
      jsnext: true
    })
  ]
};

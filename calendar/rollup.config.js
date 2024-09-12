import { babel } from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.ts",
  output: {
    file: './dist/bundle.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    peerDepsExternal(),
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: ["@babel/env", "@babel/react", "@babel/preset-typescript"]
    }),
    typescript()
  ]
};
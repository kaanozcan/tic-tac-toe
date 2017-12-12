const path = require("path");

const cwd = process.cwd();

require("babel-register")({
  plugins: [
    ["babel-plugin-module-resolver", {
      root: [cwd],
      alias: {
        lib: path.join(cwd, "/lib"),
        src: path.join(cwd, "/src"),
        server: path.join(cwd, "/src/server")
      }
    }]
  ].map((plugin) => {
    if (typeof plugin === "string") {
      return require.resolve(plugin);
    }

    return [require.resolve(plugin[0]), plugin[1]];
  }),
  presets: [
    "babel-preset-es2015",
    "babel-preset-stage-0"
  ].map(require.resolve),
});

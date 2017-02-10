System.config({
  baseURL: "dev",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "gibon": "npm:gibon@0.3.2",
    "underscore": "npm:underscore@1.8.3"
  }
});

module.exports = {
  apps: [
    {
      name: "my-app",
      script: "serve",
      interpreter: "node",
      args: "-l 3000 -s frontend/build",
      node_args: "--loader ts-node/esm",
    },
  ],
};

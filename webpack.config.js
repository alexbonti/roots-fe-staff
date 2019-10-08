module.exports = {
  module: {
    loaders: [
      {
        test: /plugin\.css$/,
        loaders: ["style-loader", "css"]
      }
    ],
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

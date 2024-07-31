const express = require("express");
const app = express();
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/ducdev",
  publicKey: "public_BGrQKRolO4l3XPbDjMv8IxPx1oo=",
  privateKey: "private_0bMt9Qj/9sD+r3EqAf3Sa8H+UjA=",
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/auth", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.listen(3001, function () {
  console.log("Live at Port 3001");
});

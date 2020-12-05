// dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

// sets up express app and port
var app = express();
var PORT = process.env.PORT || 8000;

// express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());






















// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
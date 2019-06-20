const fs = require('fs');
let books = require("../books.json");

module.exports = books

module.exports.save = () => {
  fs.writeFile("./books.json", JSON.stringify(books), () => {
  	console.log("saved")
  });
}
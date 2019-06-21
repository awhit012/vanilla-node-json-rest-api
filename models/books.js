const fs = require('fs')
const books = require("../books.json");
const bookSchema = {
	title: "string",
	author: "string",
	pages: "number",
	currentPage: "number",
	status: "string"
}

const save = (bookData) => {
  fs.writeFile("./books.json", JSON.stringify(books), () => {
  	console.log("saved")
  });
}


module.exports = {
	all: books,
	save: save, 
	schema: bookSchema
}


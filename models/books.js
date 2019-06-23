const fs = require('fs')
const books = require("../books.json");
class Books {
	bookSchema() {
		return {
			title: "string",
			author: "string",
			pages: "number",
			currentPage: "number",
			status: "string"
		}
	}

	books() {
		return books 
	}

	save(bookData) {
	  fs.writeFile("./books.json", JSON.stringify(bookData), () => {
	  	console.log("saved")
	  });
	}

	validate(bookData) {
		// TODO: make this happen
		return bookData
	}

}

const bookModel = new Books()

module.exports = {
	books: bookModel.books,
	save: bookModel.save, 
	schema: bookModel.bookSchema, 
	validate: bookModel.validate
}


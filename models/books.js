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
		let validatedBook = {}
		let schema = bookSchema()
		for (key in schema) {
			// if the type of the bookData matches the schema
			if(typeof bookData[key] == schema[key]) {
				// set the validatedBook key to the bookData value
				validatedBook[key] = bookData[key]
			}
		}
		return validatedBook
	}	

}

const bookModel = new Books()

module.exports = {
	books: bookModel.books,
	save: bookModel.save, 
	schema: bookModel.bookSchema, 
	validate: bookModel.validate
}


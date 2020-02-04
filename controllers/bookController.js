class BooksController {
	constructor() {
		this.error = {error: "not found"}
		this.headers = {};
	  this.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
	  this.headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE'
	  this.headers['Access-Control-Allow-Credentials'] = true
	  this.headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type'
	  this.headers["Access-Control-Allow-Headers"] = "X-Requested-With";
		this.headers['Content-Type'] = 'application/json'
		this.model = require('../models/books')
	}

	sendError(response) {
  	response.writeHead(404, this.headers);
		response.end(JSON.stringify(this.error))
	}	

	getAll(response) {
  	response.writeHead(200, this.headers);
		response.end(JSON.stringify(this.model.books()))
	}

	post(request, response) {
		let body = [];
		request.on('data', (chunk) => {
		  body.push(chunk);
		}).on('end', () => {
		  body = Buffer.concat(body).toString();
		  body = JSON.parse(body)
		  let book = this.model.validate(body)
		  book.id = this.model.books().length + 1
		  this.model.books().push(book)
		  this.model.save(this.model.books())
		});
  	response.writeHead(200, this.headers);
		response.end();
	}

	getOne(response, bookId) {
		let foundBook = this.find(bookId)
		if (foundBook) {
			response.end(JSON.stringify(foundBook))
		} else {
			this.error.method = "getOne"
			this.sendError(response)
		}
	}

	editOne(request, response, bookId) {
		let foundBook = this.find(bookId)
		if (foundBook.book) {
			let body = [];
			request.on('data', (chunk) => {
			  body.push(chunk);
			}).on('end', () => {
			  body = Buffer.concat(body).toString();
			  try {
			  	body = JSON.parse(body)
			  	console.log("body:", body)
				}
				catch(error) {
					this.error.method = "editOne JSON error"
				  this.sendError(response)
				  return
				}
				let validatedData = this.model.validate(body)
			  this.model.books()[foundBook.index] = validatedData
			  this.model.save(this.model.books())
			});
			response.writeHead(200, this.headers);
			response.end();
		} else {
			this.error.method = "editOne findBook error"
			this.sendError(response)
		}

	}

	delete(response, bookId) {
		let foundBook = this.find(bookId)
		if( !foundBook.book) {
			this.sendError(response)
			return
		}
		this.model.books().splice(foundBook.index, 1)
		this.model.save(this.model.books())
		response.writeHead(200, this.headers);
		response.end(JSON.stringify(this.model.books()));
	}

	find(bookId) {
		let foundBook
		let bookIndex
		this.model.books().forEach( (book, index) => {
			if(book.id == bookId) {
				foundBook = book
				bookIndex = index
			} 
		})
		return {book: foundBook, index: bookIndex}
	}
}

module.exports = new BooksController()
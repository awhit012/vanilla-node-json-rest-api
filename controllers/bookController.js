const Books = require('../models/books')

class BooksController {
	constructor() {
		this.error = JSON.stringify({error: "not found"})
		this.headers = {};
	  this.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
	  this.headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE'
	  this.headers['Access-Control-Allow-Credentials'] = true
		this.headers['Content-Type'] = 'application/json'
	}

	validate(bookData) {
		const validatedData = {}
		Object.keys(Books.schema).forEach( (key) => {
			if (typeof bookData[key] === Books.schema[key]) {
				validatedData[key] = bookData[key]
			}
		})
		return validatedData
	}

	sendError(response) {
  	response.writeHead(404, this.headers);
		response.end(this.error)
	}	

	getAll(response) {
  	response.writeHead(200, this.headers);
		response.end(JSON.stringify(Books.all))
	}

	post(request, response) {
		let body = [];
		request.on('data', (chunk) => {
		  body.push(chunk);
		}).on('end', () => {
		  body = Buffer.concat(body).toString();
		  body = JSON.parse(body)
		  let book = this.validate(body)
		  book.id = Books.all.length + 1
		  Books.all.push(book)
		  Books.save()
		});
  	response.writeHead(200, this.headers);
		response.end();
	}

	getOne(response, bookId) {
		let foundBook = this.find(bookId)
		console.log(foundBook)
		if (foundBook) {
			response.end(JSON.stringify(foundBook))
		} else {
			this.sendError(response)
		}
	}

	editOne(request, response, bookId) {
		let foundBook = this.find(bookId)
		if (foundBook) {
			let body = [];
			request.on('data', (chunk) => {
			  body.push(chunk);
			}).on('end', () => {
			  body = Buffer.concat(body).toString();
			  try {
			  	body = JSON.parse(body)
				}
				catch(error) {
				  console.error(error);
				  this.sendError(response)
				  return
				}
				let book = this.validate(body)
			  Object.keys(book).forEach( (key) => {
			  	console.log(key, foundBook[key], book[key])
			  	foundBook[key] = book[key]
			  })
			  Books.all.push(book)
			  Books.save()
			});
  		response.writeHead(200, this.headers);
			response.end();
		} else {
			this.sendError(response)
		}

	}

	delete(response, bookId) {
		let foundBook 
		Books.all.forEach( (book, index) => {
			// console.log(book, book.id, bookId)
			if(book.id === bookId) {
				foundBook = book
				Books.all.splice(index, 1)
  			response.writeHead(200, this.headers);
				response.end(JSON.stringify(Books.all));
			}
		})
		if( !foundBook) {
			this.sendError(response)
		}
	}

	find(bookId) {
		let foundBook
		Books.all.forEach( (book) => {
			if(book.id === bookId) {
				foundBook = book
			} 
		})
		return foundBook
	}
}

module.exports = new BooksController()
const Books = require('../models/books')

class BooksController {
	getAll(response) {
		response.end(JSON.stringify(Books))
	}

	post(request, response) {
		let body = [];
		request.on('data', (chunk) => {
		  body.push(chunk);
		}).on('end', () => {
		  body = Buffer.concat(body).toString();
		  body = JSON.parse(body)
		  let id = Books.length + 1
		  body.id = id
		  Books.push(body)
		  Books.save()
		});

		response.writeHead(200, {
		  'Content-Type': 'application/json',
		});
		response.end();
	}

	getOne(response, bookId) {
		let foundBook = this.find(bookId)
		console.log(foundBook)
		if (foundBook) {
			response.end(JSON.stringify(foundBook))
		} else {
			return "not found"
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
			  body = JSON.parse(body)
			  Object.keys(body).forEach( (key) => {
			  	console.log(key, foundBook[key], body[key])
			  	foundBook[key] = body[key]
			  })
			  Books.save()
			});

			response.writeHead(200, {
			  'Content-Type': 'application/json',
			});
			response.end();
		}

	}

	delete(response, bookId) {
		let foundBook 
		Books.forEach( (book, index) => {
			// console.log(book, book.id, bookId)
			if(book.id === bookId) {
				foundBook = book
				Books.splice(index, 1)
				response.writeHead(200, {
			  	'Content-Type': 'application/json',
				});
				response.end(JSON.stringify(Books));
			}
		})
		if( !foundBook) {
			return "not found"
		}
	}

	find(bookId) {
		let foundBook
		Books.forEach( (book) => {
			if(book.id === bookId) {
				foundBook = book
			} 
		})
		return foundBook
	}
}

module.exports = new BooksController()
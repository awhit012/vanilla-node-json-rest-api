const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 5000

var books = books || require("./books.json");
console.log(books)

class BooksController {
	constructor(request, response) {
		this.request = request
		this.response = response
	}

	getAll() {
		this.response.end(JSON.stringify(books))
	}

	post() {
		let body = [];
		this.request.on('data', (chunk) => {
		  body.push(chunk);
		}).on('end', () => {
		  body = Buffer.concat(body).toString();
		  body = JSON.parse(body)
		  let id = books.length + 1
		  body.id = id
		  books.push(body)
		  save()
		});

		this.response.writeHead(200, {
		  'Content-Type': 'application/json',
		});
		this.response.end();
	}

	getOne(bookId) {
		let foundBook = this.find(bookId)
		console.log(foundBook)
		if (foundBook) {
			this.response.end(JSON.stringify(foundBook))
		} else {
			notFound(this.response)
		}
	}

	editOne(bookId) {
		let foundBook = this.find(bookId)
		if (foundBook) {
			let body = [];
			this.request.on('data', (chunk) => {
			  body.push(chunk);
			}).on('end', () => {
			  body = Buffer.concat(body).toString();
			  body = JSON.parse(body)
			  Object.keys(body).forEach( (key) => {
			  	console.log(key, foundBook[key], body[key])
			  	foundBook[key] = body[key]
			  })
			  save()
			});

			this.response.writeHead(200, {
			  'Content-Type': 'application/json',
			});
			this.response.end();
		}

	}

	delete(bookId) {
		let foundBook 
		books.forEach( (book, index) => {
			// console.log(book, book.id, bookId)
			if(book.id === bookId) {
				foundBook = book
				books.splice(index, 1)
				this.response.writeHead(200, {
			  	'Content-Type': 'application/json',
				});
				this.response.end(JSON.stringify(books));
			}
		})
		if( !foundBook) {
			notFound(this.response)
		}
	}

	find(bookId) {
		// console.log(bookId)
		let foundBook
		books.forEach( (book) => {
			// console.log(book, book.id, bookId)
			if(book.id === bookId) {
				foundBook = book
			} 
		})
		return foundBook
	}
}

class BooksRouter {
	constructor(request, response) {
		this.booksController = new BooksController(request, response)
		this.request = request
		this.response = response
		this.handleRequest()
	}

	handleRequest() {
		if(this.request.url === "/books") {
			if (this.request.method === "GET") {
      	this.booksController.getAll();
	    } else if (this.request.method === "POST") {
	    	this.booksController.post();
	    } else {
	    	notFound(response)
	    } 
		}	else {
			let bookId = parseInt(this.request.url.slice(7))
			if(bookId !== NaN) {
				if (this.request.method === "GET") {
					this.booksController.getOne(bookId)

				} else if (this.request.method === "PUT") {
					this.booksController.editOne(bookId)
				} else if (this.request.method === "DELETE"){
					this.booksController.delete(bookId)
				}
			}
		}
	}
}

const server = http.createServer((request, response) => { 
  let baseUrl = request.url.slice(0,6)
  if ( baseUrl === "/books") {
  	let booksRouter = new BooksRouter(request, response)
  	booksRouter.handleRequest()
  } else {
    notFound(response)
  }
});

const notFound = (response) => {
	console.log('not found')
	response.writeHead(404, {
  	'Content-Type': 'application/json',
	});
	response.end();
}

const save = () => {
	console.log("saving")
  fs.writeFile("./books.json", JSON.stringify(books), () => {
  	console.log("saved")
  });
}



server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
const BooksController = require('./controllers/bookController')

class BooksRouter {
	handleRequest(request, response) {
		if(request.url === "/books") {
			if (request.method === "GET") {
      	BooksController.getAll(response);
	    } else if (request.method === "POST") {
	    	BooksController.post(request, response);
	    } else {
	    	return "not found"
	    } 
		}	else {
			let bookId = parseInt(request.url.slice(7))
			if(bookId !== NaN) {
				if (request.method === "GET") {
					BooksController.getOne(response, bookId)

				} else if (request.method === "PUT") {
					BooksController.editOne(request, response, bookId)
				} else if (request.method === "DELETE"){
					BooksController.delete(response, bookId)
				}
			}
		}
	}
}

module.exports = new BooksRouter()
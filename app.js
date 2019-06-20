const http = require('http');

const PORT = 8080;

const books = [
	{id: 1, title: "The Teachings of Don Juan", author: "Carlos Casteñeda", pages: 288, status: "complete", currentPage: 288},
	{id: 2, title: "You Don't Know JavaScript: Up and Going", author: "Kyle Simpson", pages: 87, status: "complete", currentPage: 87},
	{id: 3, title: "Permaculture: A Designers' Manual", author: "Bill Mollison", pages: 576, status: "toRead", currentPage: 0},
	{id: 4, title: "Atlantis: Insights from a Lost Civilization", author: "Shirley Andrews", pages: 292, status: "inProgress", currentPage: 96},
]   

class BooksController {
	getBooks(response) {
		response.end(JSON.stringify(books))
	}

	postBook(request, response) {
		let body = [];
		request.on('data', (chunk) => {
		  body.push(chunk);
		}).on('end', () => {
		  body = Buffer.concat(body).toString();
		  body = JSON.parse(body)
		  let id = books.length + 1
		  body.id = id
		  books.push(body)
		});

		response.writeHead(200, {
		  'Content-Type': 'application/json',
		  'X-Powered-By': 'bacon'
		});
		response.end();
	}
}

const server = http.createServer((request, response) => { 
  const booksController = new BooksController()
  if (request.url === "/books") {
    if (request.method === "GET") {
      booksController.getBooks(response);
    } else if (request.method === "POST") {
    	booksController.postBook(request, response);
    } else {
      // others... (PUT, DELETE, etc...)
    } 
  } else {
    // any other route...
  }
});



server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
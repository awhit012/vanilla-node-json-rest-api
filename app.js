const http = require('http');
const BooksController = require('./controllers/bookController')
const BooksRouter = require('./router.js')
const PORT = process.env.PORT || 5000


const server = http.createServer((request, response) => { 
  let baseUrl = request.url.slice(0,6)
  if ( baseUrl === "/books") {
  	BooksRouter.handleRequest(request, response)
  } else {
    notFound(response)
  }
});

const notFound = (response) => {
  console.log('not found error, app.js')
	response.writeHead(404, {
  	'Content-Type': 'application/json',
	});
	response.end();
}



server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
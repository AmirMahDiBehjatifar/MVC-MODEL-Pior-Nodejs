const http = require("http");
const PORT = 8080;
const ProductController = require("./controller/ProductController");
const ErrorHandller = require("./controller/errorHandeller");



http.createServer(function (req, res) {
    const apiRoute = "api";
    const productsRoute = `/${apiRoute}/products`;
    const regexId = /\/api\/products\/[0-9]+/;
    const { url, method } = req;

    if (url == productsRoute && method == 'GET') {
        ProductController.getProducts(req, res)
    } else if (url.match(regexId) && method == 'GET') {
        ProductController.getByID(req, res)
    } else if (url == productsRoute && method == 'POST') {
        ProductController.create(req, res)
    } else if (url.match(regexId) && method == 'DELETE') {
        ProductController.remove(req, res)
    } else if (url.match(regexId) && method == 'PUT') {
        ProductController.update(req, res)
    } else {
        ErrorHandller.pageNotFound(res)
    }
}).listen(PORT)
console.log(`Server runned port ${PORT}`)
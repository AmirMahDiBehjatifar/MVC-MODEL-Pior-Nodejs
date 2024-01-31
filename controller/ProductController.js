const productModel = require("../model/ProductsModel");
const ErrorHandeller = require("./errorHandeller")

async function getProducts(req, res) {
    try {
        const products = await productModel.find();
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(products))
        res.end()
    } catch (error) {
        console.log(error);
    }
}

async function getByID(req, res) {
    try {
        const [, , , ID] = req.url.split("/");

        const productId = await productModel.findByid(ID)
        if (!productId) {
            ErrorHandeller.notFound(res)
        } else {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(productId));
            res.end();
        }
    } catch (error) {
        console.log(error);
    }
}

async function create(req, res) {
    try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            const product = {...JSON.parse(body),createdAt: new Date(),}
            const result = await productModel.create(product)
            res.writeHead('201', { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(result));
            res.end();
        })
    } catch (error) {
        console.log(error);
    }
}
async function update(req, res) {
    try {
        let body = '';
        const ID = req.url.split("/")[3];
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            const parsedBody = { ...JSON.parse(body) }
            const product = await productModel.findByid(ID)
            if (!product) {
                res.writeHead(404, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify({
                    message: "Not Found any Product"
                }))
                res.end()
            } else {
                const result = await productModel.update(ID,parsedBody)
                res.writeHead('201', { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(result));
                res.end();
            }
        })
        
    } catch (error) {
        console.log(error);
    }
}
async function remove(req, res) {
    try {
        const [, , , ID] = req.url.split("/");

        const productId = await productModel.findByid(ID)
        if (!productId) {
            ErrorHandeller.notFound(res)
        } else {
            const result = await productModel.remove(ID)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(result));
            res.end();
        }
    } catch (error) {
        console.log(error);
    }
}
const ProductController = {
    getProducts,
    getByID,
    create,
    remove,
    update
}
module.exports = ProductController
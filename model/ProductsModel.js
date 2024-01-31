const { ObjectId } = require("mongodb");
const ConnectToMongodb = require("./../utils/mongo-connection");
const fs = require("fs");
const { resolve } = require("path");
const productCollection = "product"

async function find() {
    const db = await new ConnectToMongodb().Get();
    return new Promise(async (resolve, reject) => {
        const products = db.collection(productCollection).find({}, { sort: { _id: -1 } }).toArray();
        resolve(products)
    })
}

async function findByid(id) {
    const db = await new ConnectToMongodb().Get();
    return new Promise(async (resolve) => {
        const productId = db.collection(productCollection).findOne({ _id: new ObjectId(id) })
        resolve(productId)
    })
}

async function create(product) {
    const db = await new ConnectToMongodb().Get();
    return new Promise(async (resolve, reject) => {
        const result = await db.collection(productCollection).insertOne({ product })
        resolve(result)
    })
}
async function update(id, payload) {
    const db = await new ConnectToMongodb().Get();
    return new Promise(async (resolve, reject) => {
        const result = await db.collection(productCollection).updateOne({ _id: new ObjectId(id) }, {
            $set: { ...payload }
        })
        resolve(result)
    })
}
async function remove(id) {
    const db = await new ConnectToMongodb().Get();
    return new Promise(async (resolve, reject) => {
        const result = await db.collection(productCollection).deleteOne({ _id: new ObjectId(id) });
        resolve(result)
    })
}
const productModel = {
    find,
    findByid,
    update,
    remove,
    create
}

module.exports = productModel;
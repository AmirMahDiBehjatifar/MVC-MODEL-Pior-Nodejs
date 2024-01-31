const { MongoClient } = require("mongodb");

module.exports = class ConnectToMongodb {
    #DB_URI = "mongodb://localhost:27017/myShop";
    #db = null;
    async #connect() {
        try {
            let client = new MongoClient(this.#DB_URI);
            let db = client.db()
            return db
        }
        catch (error) {
            console.log(error.message);
        }
    }
    async Get() {
        try {
            if (this.#db) {
                console.log('connection is already alive ');
                return this.#db;
            }
            this.#db = await this.#connect();
            return this.#db
        } catch (error) {
            console.log(error.message);
        }

    }
}
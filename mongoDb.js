const MongoClient = require('mongodb').MongoClient;

let dbName = "Database";
let connectionString = "mongodb://localhost:27017";
const getDb = async () => {
    let connection = await MongoClient.connect(connectionString);
    let db = connection.db(dbName);
    return db;
};

const getCollection = async (name) => {
    let db = await getDb();
    let collection = db.collection(name);
    return collection;
    };

const createDocument = async () => {
    let collection = await getCollection('people')
    let result = collection.insertOne({ name: 'Siri1', age: 30 })
    console.log(result)

}

createDocument()
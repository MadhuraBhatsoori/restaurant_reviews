const fs = require('fs');
const { MongoClient } = require('mongodb');


const uri = "mongodb://localhost:27017";  
const dbName = "redpanda";  
const collectionName = "redpanda";  

async function main() {
    const client = new MongoClient(uri);

    try {
        
        await client.connect();
        const data = JSON.parse(fs.readFileSync('reviews.json', 'utf8'));  
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertMany(data);  

        console.log(`${result.insertedCount} documents were inserted.`);
    } catch (err) {
        console.error(err);
    } finally {

        await client.close();
    }
}
main().catch(console.error);

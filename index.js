const { MongoClient } = require("mongodb");

// Connection URL
const uri = "mongodb://127.0.0.1:27017"; // Replace with your MongoDB URI

// Database Name
const dbName = "myDatabase"; // Replace with your database name

// Create a MongoClient instance
const client = new MongoClient(uri);

async function main() {
   try {
      // Connect to the MongoDB server
      await client.connect();
      console.log("Connected to MongoDB");

      // Access a specific database
      const db = client.db(dbName);

      // Perform operations (e.g., create a collection)
      const collection = db.collection("myCollection"); // Replace with your collection name

      // Insert a document
      const result = await collection.insertOne({
         name: "Vidushi",
         age: 20,
         _id: 3,
      });
      console.log("Document inserted with _id:", result.insertedId);

      // Find a document
      const document = await collection.findOne({ name: "Vidushi" });
      console.log("Found document:", document);
   } catch (error) {
      console.error("Error connecting to MongoDB:", error);
   } finally {
      // Close the connection
      await client.close();
   }
}

main();

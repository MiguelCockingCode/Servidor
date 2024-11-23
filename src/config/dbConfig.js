import { MongoClient } from "mongodb";

export default async function connectDatabase(stringConnection) {
    let mongoClient;

    try{
        mongoClient = new MongoClient(stringConnection);
        console.log("Connecting the cluster of database...");
        await mongoClient.connect();
        console.log("Successfully connected to MongoDB Atlas!");

        return mongoClient;
    }catch(error){
        console.error("Connection fail to database!", error);
        process.exit();
    }
}
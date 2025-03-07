import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv;
/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 *
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */

const conn = process.env.DB_STRING;

export const connection = mongoose.createConnection(conn, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
   username: String,
   hash: String,
   salt: String,
});

connection.model("User", UserSchema);

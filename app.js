import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { MongoClient } from "mongodb";
import { router } from "./routes/index.js";
import { config } from "dotenv";

config(); // Correctly invoking dotenv configuration

const app = express();
const dbString = "mongodb://127.0.0.1:27017/";
const dbName = "myDatabase"; // Replace with your database name

// MongoDB Client Connection
const client = new MongoClient(dbString);
await client.connect();
console.log("Connected to MongoDB");

// Uncomment this if you are using Mongoose
// mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Mongoose connected to MongoDB"))
//   .catch(err => console.error("Mongoose connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Store Setup
const sessionsStore = MongoStore.create({
   mongoUrl: dbString,
   collection: "sessions",
});

app.use(
   session({
      secret: "some secret",
      resave: false,
      saveUninitialized: true,
      store: sessionsStore,
      cookie: {
         maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
   })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
   console.log(req.session);
   if (req.session.viewCount) {
      req.session.viewCount += 1;
   } else {
      req.session.viewCount = 1;
   }
   res.send(
      `<h1>Hello Vids! You have visited this page ${req.session.viewCount} times.</h1>`
   );
});

app.use(router);

// Error Handling Middleware
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send("Something went wrong!");
});

// Start Server
app.listen(3000, () => {
   console.log("Server is running on port 3000");
});

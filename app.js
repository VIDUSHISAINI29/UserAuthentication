import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
// import MongoStore from "connect-mongo";
// import passport from "passport";
// import { MongoClient } from "mongodb";
// import { router } from "./routes/index.js";
import { config } from "dotenv";

config(); // Load environment variables

const app = express();
import { MongoClient } from "mongodb";

const client = new MongoClient(dbString);
await client.connect();

const sessionsStore = MongoStore.create({
   clientPromise: Promise.resolve(client),
   collectionName: "Employees",
});

// const client = new MongoClient(dbString);
// // client.connect().then(() => console.log("Connected to MongoDB")).catch(err => console.error("MongoDB Connection Error:", err));

// // // Connect to MongoDB using Mongoose
// // mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
// //    .then(() => console.log("Mongoose connected to MongoDB"))
// //    .catch(err => console.error("Mongoose connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Store Setup


app.use(
   session({
      secret: "some secret",
      resave: false,
      saveUninitialized: true,
      store: sessionsStore,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
   })
);

// app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.get("/", (req, res) => {
   // if (req.session.viewCount) {
   //    req.session.viewCount += 1;
   // } else {
   //    req.session.viewCount = 1;
   // }
   // res.send(`<h1>Hello Vids! You have visited this page ${req.session.viewCount} times.</h1>`);
   res.send(`<h1>Hello Vids! You have visited this page 3 times.</h1>`);
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

import express from "express";
import mongoose, { connect } from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { MongoClient } from "mongodb";

// const mongoStore = connectMongo(session);

const app = express();
const dbString = "mongodb://127.0.0.1:27017/";

const dbName = "myDatabase"; // Replace with your database name

// Create a MongoClient instance
const client = new MongoClient(dbString);

await client.connect();

// main();

const db = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
         maxAge: 1000 * 60 * 60 * 24,
      },
   })
);

app.get("/", (req, res, next) => {
   console.log(req.session);
   if (req.session.viewCount) {
      req.session.viewCount = req.session.viewCount + 1;
   } else {
      req.session.viewCount = 1;
   }
   res.send(
      `<h1>Hello Vids And You have visited this page ${req.session.viewCount} times. </h1>`
   );
});

app.use(passport.initialize);
app.use(passport.session());
app.listen(3000, () => {
   console.log("Server is running on port 3000");
});

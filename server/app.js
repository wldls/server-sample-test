// libs
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import detectPort from "detect-port";
import chalk from "chalk";
import cors from "cors";

// api
import docs from "./utils/api-doc";
import posts from "./api/posts";

// set mongo db
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose.connect(
  "mongodb+srv://test:1234@cluster0-wgaoc.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

let port;
const configServer = async () => {
  port = 3000 || (await detectPort(3000));
};
configServer();

// server setting
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/posts", posts);

// start
app.listen(port, () => {
  console.log(
    `${chalk.white.bgHex("#23875b").bold(` VUE SERVER IS RUNNING ON ${port} `)}`
  );
});

app.use("/api", docs);

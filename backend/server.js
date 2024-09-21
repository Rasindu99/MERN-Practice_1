import express from "express";
import { connectDB } from "./config/db.js";


const app = express();

app.get("/", (req, res) => {
  res.send("server is ready ...");
});


app.listen(5000, () => {
  connectDB();
  console.log("server started at PORT 5000 !!!");
});
 
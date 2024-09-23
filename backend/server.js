import express from "express";
import { connectDB } from "./config/db.js";

import productRoutes from './routes/product.route.js';
import dotenv from "dotenv";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("server started at PORT !!!"+ PORT  );
});
 
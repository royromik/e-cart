import express from "express";
import products from "./data/products.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("api is running...");
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id == req.params.id); 
  res.send(product);
});

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));

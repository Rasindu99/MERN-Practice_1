import Product from "../models/product.model.js";
import mongoose from 'mongoose';


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({success: true, data: products});
  } catch (error) {
    res.status(500).json({success: false, message: "Unable to fetch Products"});
  }
}

export const deleteProduct =  async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product Id" }); 
  }
  
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted"});
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error"});
  }
}

export const createProduct = async (req, res) => {
  const product = req.body;

  if(!product.name || !product.price ||  !product.image) {
    return res.status(400).json({ successs:false, message:"Please fill all fields"});
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ successs: true, data: newProduct});
  } catch (error) {
    console.error("Error in create product", error.message);
    res.status(500).json({ successs:false, message:"Server error while adding file"});
  }

}

export const updateProduct = async (req, res) => {
  const {id} = req.params;

  const product = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product Id" }); // this will checks just the structure of the id is ok or not
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
    res.status(200).json({success: true, data: updatedProduct});
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error"});
  }
}
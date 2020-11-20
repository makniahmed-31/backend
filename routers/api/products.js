const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const { check, validationResult } = require("express-validator");

//@route GET      api/products
//@descreption    products route
//@access         Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res.status(400).json({ msg: "No Availables Products " });
    }

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST      api/products
//@descreption    products route
//@access         Public
router.post(
  "/",
  [
    check("productName", "productName is required").notEmpty(),
    check("productCtg", "productCtg is required").notEmpty(),
    check("productImg", "productImg is required").notEmpty(),
    check("productDesc", "productDesc is required").notEmpty(),
    check("productPrice", "productPrice is required").notEmpty(),
  ],
  async (req, res) => {
    const {
      productName,
      productCtg,
      productImg,
      productDesc,
      productPrice,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
      const newProduct = new Product({
        productName,
        productCtg,
        productImg,
        productDesc,
        productPrice,
      });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: errors.array() });
    }
  }
);

//@route DELETE      api/products
//@descreption    delete products
//@access         Public

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.deleteOne({ _id: id });
    res.json(`Product deleted :) `);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: errors.array() });
  }
});


//@route UPDATE      api/products
//@descreption    updates products
//@access         Private

router.post("/:id", async (req, res) => {
    const { id } = req.params;
    const {
        productName,
        productCtg,
        productImg,
        productDesc,
        productPrice,
      } = req.body;
    try {
      const updatedProduct = {
        productName,
        productCtg,
        productImg,
        productDesc,
        productPrice,
      };
      const updatedRes = await Product.findByIdAndUpdate(id,updatedProduct);

         res.json(updatedRes);

    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: errors.array() });
    }
  });

  

module.exports = router;

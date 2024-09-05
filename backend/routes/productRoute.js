const express = require('express');
const router = express.Router();
const {
  addProduct,
  updateProduct,
  getAllProduct,
  destroyProduct,
  showProductDetail,
} = require("../controllers/productController");

const multer = require('multer');
const {storage} = require('../cloudConfig')
const upload = multer({ storage })



//show all product
router.get('', getAllProduct);

// //add product route
router.post('/add', upload.single('image'), addProduct); 


//show single product detail
router.get('/product/:id', showProductDetail);

//update product route
router.put('/:id/edit', upload.single('image'), updateProduct);

//delete route
router.delete('/:id', destroyProduct);

module.exports = router;

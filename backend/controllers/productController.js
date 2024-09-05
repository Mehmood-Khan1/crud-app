const Product = require('../models/productModel');

const getAllProduct = async(req, res) => {
    try {
        const allProduct = await Product.find();
        res.status(200).json(allProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message)
    }
}

const showProductDetail =  async(req, res) => {
    try {
        const {id} = req.params
        let singledata = await Product.findById(id);
        res.status(200).json(singledata);
    } catch(err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
}

const addProduct = async(req, res) => {
    const {name, description} = req.body;
    const url = req.file.path;
    console.log(url);
    try {
        const product = new Product ({
            name: name,
            description: description,
            image: url
        });
        const newProduct = await product.save();

        res.status(200).json("product added successfully")
        console.log(newProduct);

    } catch (err) {
        res.status(500).json({message: err.message});
        console.log(err);
    }    
}

const updateProduct = async(req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;
    const url = req.file ? req.file.path : req.body.image;

    try {
        const product = await Product.findByIdAndUpdate(
            id, 
                { name, description, image: url },
                { new: true }
            );
        const updateProduct = await product.save();
        
        res.status(200).json({message: updateProduct});

    } catch(err) {
        res.status(500).json({message: err.message})
        console.log(err.message);
    }

}

const destroyProduct = async(req, res) => {
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({message: "product deleted"})
    } catch (err) {
        res.status(500).json(err.message);
    } 
}

module.exports = {
    getAllProduct,
    addProduct, 
    showProductDetail,
    updateProduct, 
    destroyProduct
}


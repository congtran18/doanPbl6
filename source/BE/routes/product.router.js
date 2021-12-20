const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const { v4: uuidv4 } = require('uuid')
// const fs =require('fs')
const multer =require("multer")
let path = require('path');
const validate = require('../middleware/validate');
const productController = require('../controllers/product.controller');
const productValidation = require('../validations/product.validation');

const fileFilter = (req, file, cb) => {
	const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
	if (allowedFileTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads');
    },
	filename: (req, file, callback) => {
		callback(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
	}
});
let upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

router.route('/')
	  .get(verifyToken, validate(productValidation.getProducts), productController.getProduct)
	  .post(verifyToken, upload.array('image', 6), validate(productValidation.postProduct), productController.postProduct)

router.route('/:id')
	  .put(verifyToken, upload.array('image', 5), validate(productValidation.updateProduct), productController.putProduct)
	  .delete(verifyToken, validate(productValidation.deleteProduct), productController.deleteProduct)
	  .get(verifyToken, productController.findProduct)

router.get('/typeProduct/type', verifyToken, validate(productValidation.getTypeProduct), productController.getTypeProduct)

router.get('/categoryProduct/category', verifyToken, validate(productValidation.getCategoryProduct), productController.getCategoryProduct)

module.exports = router

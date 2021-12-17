const express = require('express')
const verifyToken = require('../middleware/auth')
const Product = require('../models/Product.model')
const ProductType = require('../models/ProductType.model')
const ProductCategory = require('../models/ProductCategory.model')
const { v4: uuidv4 } = require('uuid')
const fs =require('fs')
const multer =require("multer")
let path = require('path');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const getProduct = async (req, res) => {
    	//populate móc ra toàn bộ user

		let query;
		let total;
		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.limit) || 8;
		const skip = (page - 1) * pageSize;

		const {filters, types, categories} = req.query;
		var productfilter = {"user" : req.userId}

        if(filters){
			// Object.assign(productfilter, {"realname": {$regex: filters, $options: 'i' }});
			productfilter.realname = new RegExp(filters, 'i');
        }
        if(types){
			// Object.assign(productfilter, {"type": types});
			productfilter.type = types;
        }
        if(categories){
			// Object.assign(productfilter, {"category": categories});
			productfilter.category = categories;
        }

        query = await Product.find(productfilter).sort({createdAt:-1})
        .populate('user', [
            'username' //chỉ bỏ vào trường name
        ]).populate('type').populate('category').skip(skip).limit(pageSize);

        total = await Product.countDocuments(productfilter);

		const pages = Math.ceil(total / pageSize);

		if (page > pages) {
		  return res.status(404).json({
			status: "fail",
			message: "No page found",
		  });
		}

		const result = await query;

		res.json({ success: true, count: result.length, page, pages, data: result })

}

const findProduct = async (req, res) => {
		const productDeleteCondition = { _id: req.params.id }
		const findProduct = await Product.findOne(productDeleteCondition).populate('type').populate('category')

		// User not authorised or post not found
		if (!findProduct)
			return res.status(401).json({
				success: false,
				message: 'product not found or user not authorised'
		})

		res.json({ success: true, findProduct })
}

const postProduct = async (req, res) => {
    const { realname, type, category,categoryname, cost, description } = req.body

	const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    // for (var i = 0; i < req.files.length; i++) {
    //     reqFiles.push(url + '/uploads/' + req.files[i].filename)
    // }

	let code;
	let codeexit;
	//Sinh ra mã ko bị trùng
	do{
		code = ((categoryname.split(" ")).concat("-").concat(realname.split(" ")))
		code = code.map((codeelement) => codeelement[0]).join('').concat("00").concat((Math.floor(Math.random() * 1000).toString()))
		//loại bỏ dấu tiếng việt
		code = code.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/g, 'd').replace(/Đ/g, 'D');
		code = code.toUpperCase()
		codeexit = await Product.findOne({ code: code });
	}while(codeexit !== null)

	try {
		const newProduct = new Product({
			realname,
			code,
			type,
			category,
			cost,
			description,
			image: reqFiles,
			user: req.userId
		})
		await newProduct.save()

		res.json({ success: true, message: 'THÊM SẢN PHẨM THÀNH CÔNG!', product: newProduct })
	} catch (error) {
		console.log(error)
		throw new ApiError(httpStatus.NOT_FOUND, 'Insert not success');
	}
}

const putProduct = async (req, res) => {
    const { realname, code, type, category, cost, description, image, updateimage } = req.body
	//req.files.length
	const reqFiles = [];
	let indexfile = 0;
	let indexnotfile = 0;
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < 5; i++) {
		if(updateimage[i] === '1'){
        	reqFiles.push(url + '/uploads/' + req.files[indexfile].filename);
			indexfile = indexfile + 1;
			// console.log(req.files[indexfile].filename);
		}else if(Array.isArray(image)){
			reqFiles.push(image[indexnotfile]);
			indexnotfile = indexnotfile + 1;
		}else{
			reqFiles.push(image)
		}
    }

	let updatedProduct; 
	
	try {
		updatedProduct = {
			realname,
			code,
			type,
			category,
			cost,
			description,
			image: reqFiles,
		}

		const productUpdateCondition = { _id: req.params.id, user: req.userId }

		updatedProduct = await Product.findOneAndUpdate(
			productUpdateCondition,
			updatedProduct,
			{ new: true }
		)
		//sau khi update thì được đưa vào hàm ko thì trả lại product cũ
		// User not authorised to update product or product not found
		if (!updatedProduct)
			return res.status(401).json({
				success: false,
				message: 'product not found or user not authorised'
			})
		res.json({
			success: true,
			message: 'CẬP NHẬT SẢN PHẨM THÀNH CÔNG!',
			product: updatedProduct
		})
	} catch (error) {
		console.log(error)
		throw new ApiError(httpStatus.NOT_FOUND, 'Update not success');
	}
}

const deleteProduct = async (req, res) => {
    try {
		const productDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedProduct = await Product.findOneAndDelete(productDeleteCondition)

		// User not authorised or post not found
		if (!deletedProduct)
			return res.status(401).json({
				success: false,
				message: 'product not found or user not authorised'
			})

		res.json({ success: true, message: 'XOÁ THÀNH CÔNG!', product: deletedProduct })
	} catch (error) {
		console.log(error)
		throw new ApiError(httpStatus.NOT_FOUND, 'Delete not success');
	}
}

const getTypeProduct = async (req, res) => {
	try {

		let query = await ProductType.find();

		const result = await query;

		res.json({ success: true, typeProducts: result })
	} catch (error) {
		// console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

const getCategoryProduct = async (req, res) => {
	try {
		let query = ProductCategory.find({ type: req.query.typeID });
		let data = await query;
		if(!data) {
			//404
		}
		// const result = await query;
		res.json({ success: true, categoryProducts: data })

	} catch (error) {
		// console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}	
}

module.exports = {
    getProduct,
    postProduct,
	findProduct,
    putProduct,
    deleteProduct,
    getTypeProduct,
    getCategoryProduct,
};
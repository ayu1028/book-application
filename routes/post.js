const express = require('express');
const router = express.Router();
const db = require('../models/index');
const multer = require('multer');
const upload = multer({dest: './public/images/uploads'});
const cloudinary = require('cloudinary').v2;

require('dotenv').config();
const env = process.env;

cloudinary.config({
	cloud_name: env.NAME,
	api_key: env.KEY,
	api_secret: env.SECRET_KEY
});

router.get('/', (req, res, next) => {
	const data = {
		title: 'The Books'
	};
	res.render('post', data);
});

router.post('/', upload.single('book_img'), (req, res, next) => {
	console.log(req.body);
	console.log(req.file);
	res.redirect('/');
});

module.exports = router;

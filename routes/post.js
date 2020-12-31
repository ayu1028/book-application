const express = require('express');
const router = express.Router();
const db = require('../models/index');
const multer = require('multer');
const upload = multer({dest: './public/images/uploads'});

router.get('/', (req, res, next) => {
	const data = {
		title: 'The Books'
	};
	res.render('post', data);
});

router.post('/', upload.single('book_img'), (req, res, next) => {
	const data = req.body;
	console.log(data);
	console.log(req.file);
	res.redirect('/');
});

module.exports = router;

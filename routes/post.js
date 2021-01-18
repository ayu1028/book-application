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
		title: 'The Books',
		err: null
	};
	res.render('post', data);
});

router.post('/', upload.single('book_img'), (req, res, next) => {
	const userId = req.session.user_id ? req.session.user_id : 0;
	const bookName = req.body.book_name;
	const author = req.body.author;
	const title = req.body.title;
	const impressionText = req.body.impression;
	const genre = req.body.genre;
	const visible = req.body.visible;
	const filePath = req.file ? req.file.path : null;

	cloudinary.uploader.upload(filePath, async(err, results) => {
		const noImage = 'https://res.cloudinary.com/dtmue1o4b/image/upload/v1609480442/l_e_others_500_ifonin.png';
		const imagePath = results ? results.url : noImage;

		await db.sequelize.sync();
		let trn = await db.sequelize.transaction();
		try {
			const bookForm = {
				book_name: bookName,
				author: author,
				book_path: imagePath
			};
			const book = await db.book.create(bookForm, {transaction: trn});
			const impForm = {
				title: title,
				impression: impressionText,
				user_id: userId,
				book_id: book.id,
				genre: genre,
				visible: visible
			};
			const impression = await db.impression.create(impForm, {transaction: trn});
			await trn.commit();
			res.redirect('/');
		} catch(err) {
			await trn.rollback();
			const data = {
				title: 'The Books',
				err: err
			};
			console.log(err);
			res.render('post', data);
		}
	});
});

module.exports = router;

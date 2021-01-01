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
	const filePath = req.file ? req.file.path : null;
	cloudinary.uploader.upload(filePath, (err, results) => {
		file = () => {
			if(!err) {
				return results.url;
			} else {
				return 'https://res.cloudinary.com/dtmue1o4b/image/upload/v1609480442/l_e_others_500_ifonin.png';
			}
		}
		const imagePath = file();
		const bookForm = {
			book_name: req.body.book_name,
			author: req.body.author,
			book_path: imagePath
		};
		db.sequelize.sync().then(() => {
			db.book.create(bookForm).then((book) => {
				const impForm = {
					title: req.body.title,
					impression: req.body.impression,
					book_id: book.dataValues.id,
					genre: req.body.genre
				};
				db.sequelize.sync().then(() => {
					db.impression.create(impForm).then((imp) => {
						res.redirect('/');
					}).catch((err) => {
						const data = {
							title: 'The Books',
							err: err
						};
						res.render('post', data);
					});
				});
			}).catch((err) => {
				const data = {
					title: 'The Books',
					err: err
				};
				res.render('post', data);
			});
		});
	});
});

module.exports = router;

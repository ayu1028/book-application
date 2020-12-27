const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', (req, res, next) => {
	db.impression.findAll({
		include: [
			{
				model: db.user,
				required: true
			},
			{
				model: db.book,
				required: true
			}
		]
	})
	.then((imps) => {
//		console.log(imps);
		const data = {
			title: 'The Books',
			contents: imps
		}
		console.log(data.contents);
		res.render('top', data);
	})
	.catch((err) => {
		console.log(err);
	});
//	res.render('top', {title: 'top'});
});

module.exports = router;

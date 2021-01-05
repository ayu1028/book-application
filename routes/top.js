const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', async (req, res, next) => {
	const findForm = req.query.genre ?
	{
		where: {genre: req.query.genre},
		include: [
			{ model: db.user, required: false },
			{ model: db.book, required: true }
		]
	} :
	 {
		include: [
			{ model: db.user, required: false },
			{ model: db.book, required: true }
		]
	};
	const impsAll = await db.impression.findAll(findForm);
	const data = {
		title: 'The Books',
		contents: impsAll
	};
	console.log(res.locals.number);
	res.render('top', data);
});

module.exports = router;

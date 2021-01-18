const express = require('express');
const router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

router.get('/', async (req, res, next) => {
	const whereForm = req.query.genre ? 
	{[Op.and]: [{genre: req.query.genre},{visible: 1}]} : {visible: 1};
	const findForm = {
		order: [['updatedAt', 'DESC']],
		where: whereForm,
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
	res.render('top', data);
});

module.exports = router;

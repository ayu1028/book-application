const express = require('express');
const router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

router.get('/', async (req, res, next) => {
	res.render('top');
});

router.post('/search', async (req, res, next) => {
	const formSelector = (genre) => {
		if (genre === 'すべて') {
			return {visible: 1};
		} else {
			return {[Op.and]: [{genre: req.body.genre},{visible: 1}]};
		}
	};
	const whereForm = formSelector(req.body.genre);
	const findForm = {
		order: [['updatedAt', 'DESC']],
		where: whereForm,
		include: [
			{ model: db.user, required: false },
			{ model: db.book, required: true }
		]
	};
	const impsAll = await db.impression.findAll(findForm);
	res.send(impsAll);
});

module.exports = router;

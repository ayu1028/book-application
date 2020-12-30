const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', (req, res, next) => {
	const data = {
		title: 'The Books'
	};
	res.render('post', data);
});

module.exports = router;

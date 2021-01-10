var express = require('express');
var router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

/* GET users listing. */
router.get('/:user_id/', async (req, res, next) => {
  const userId = req.params.user_id;
  if(userId != req.session.user_id) {
    res.redirect('/');
  }
  res.send('users');
});

module.exports = router;


db.Sequelize.query
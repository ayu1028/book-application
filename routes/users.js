var express = require('express');
var router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

router.get('/:user_id/', async (req, res, next) => {
  const userId = req.params.user_id;
  if(userId != req.session.user_id) {
    res.redirect('/');
  }
  const whereForm = req.query.genre ? 
  {[Op.and]: [{user_id: userId}, {genre: req.query.genre}]} : {user_id: userId};
  const findForm = {
    order: [['updatedAt', 'DESC']],
    where: whereForm,
    include: [
      { model: db.user, required: false },
      { model: db.book, required: true }
    ]
  };
  const impsAll = await db.impression.findAll(findForm);
  res.render('users', {
    title: `User's Page`,
    contents: impsAll
  });
});

module.exports = router;
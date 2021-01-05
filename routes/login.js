const express = require('express');
const db = require('../models/index');
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const findUser = await db.user.findOne({
    where: {
      email: email
    }
  });
  if(findUser) {
    const passwordHash = findUser.password;
    if(bcrypt.compareSync(password, passwordHash)) {
      req.session.user_id = findUser.id;
      res.redirect('/');
    } else {
      res.render('login', {
        incorrect: "パスワードが一致しません"
      });
    }
  } else {
    res.render('login', {
      incorrect: "ユーザーが存在しません"
    });
  }
});

module.exports = router;
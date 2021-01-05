const express = require('express');
const session = require('express-session');
const db = require('../models/index');
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('register');
});

router.post('/', async (req, res, next) => {
  const userName = req.body.user_name;
  const email = req.body.email;
  const password = req.body.password;
  const findUser = await db.user.findAll({
    where: {
      [Op.or]: [
        {user_name: userName},
        {email: email}
      ]
    }
  });
  const userExists = findUser.length;
  if(userExists) {
    res.render('register', {
      userExists: 'ユーザー名／メールアドレスは既に使われています。'
    });
  } else {
    await db.sequelize.sync();
    let trn = await db.sequelize.transaction();
    const passwordHash = bcrypt.hashSync(password, 10);
    const pass = password ? passwordHash : password;
    const userForm = {
      user_name: userName,
      email: email,
      password: pass
    };
    try {
      const createUser = await db.user.create(userForm, { transaction: trn });
      await trn.commit();
      res.redirect('/login');
    } catch(err) {
      await trn.rollback();
      res.render('register', {
        err: err
      });
    }
  }
});

module.exports = router;
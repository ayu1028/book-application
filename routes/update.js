const express = require('express');
const router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

router.get('/:impression_id', async (req, res, next) => {
  const userId = req.session.user_id;
  const impId = req.params.impression_id;
  try {
    const impression = await db.impression.findOne({
      where: {[Op.and]: [{id: impId}, {user_id: userId}]},
      include: [
        { model: db.user, required: false },
        { model: db.book, required: true }
      ]
    });
    if (impression) {
      res.render('impression_update', {
        title: 'The Books',
        contents: impression
      });
    } else {
      res.redirect('/');
    }
  } catch(err) {
    res.redirect('/');
  }
});

router.post('/:impression_id', async (req, res, next) => {
  const userId = req.session.user_id;
  const impId = req.params.impression_id;
  const title = req.body.title;
  const impressionText = req.body.impression;
  const visible = req.body.visible;
  try {
    const updateForm = {
      title: title,
      impression: impressionText,
      visible: visible
    };
    const whereForm = {where: {id: impId}};
    const impression = await db.impression.update(updateForm, whereForm);
    res.redirect(`/users/${userId}`);
  } catch (err) {
    res.redirect(`/update/${impId}`);
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

router.post('/:impression_id', async (req, res, next) => {
  const userId = req.session.user_id;
  const impId = req.params.impression_id;
  try {
    await db.impression.destroy({
      where: {
        [Op.and]: [{id: impId}, {user_id: userId}]
      }
    });
    res.redirect(`/users/${userId}`);
  } catch(err) {
    res.redirect(`/update/${impId}`);
  }
});

module.exports = router;
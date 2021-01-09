var express = require('express');
var router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

/* GET home page. */
router.get('/:imp_id', async (req, res, next) => {
  const impId = req.params.imp_id;
  const impression = await db.impression.findOne({
    where: {[Op.and]:[{ id: impId },{visible: 1}]},
    include: [
      { model: db.user, required: false },
      { model: db.book, required: true }
    ]
  });
  const data = {
    title: 'The Books',
    contents: impression
  };
//  console.log(data.contents.user.user_name);
  res.render('impression', data);
});

module.exports = router;

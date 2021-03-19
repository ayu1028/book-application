const db = require('./models/index');
const Op = db.Sequelize.Op;

module.exports = async (req, res, next) => {
	const userId = req.session.user_id;
	if (userId) {
		const loginUser = await db.user.findOne({
			where: {
				id: userId
			}
		});
		if (loginUser) {
			const countNumber = await db.impression.findAll({
				attributes: [
					'genre',
					[db.sequelize.fn('COUNT', db.sequelize.col('genre')), 'n_genre']
				],
				group: 'genre',
				where: {
					user_id: userId
				}
			});
			res.locals.user = loginUser;

			let totalNumber = 0;
			for (let i in countNumber) {
				totalNumber = totalNumber + countNumber[i].dataValues.n_genre;
			};
			
			res.locals.number = countNumber;
			res.locals.totalNumber = totalNumber;
		} else {
			res.locals.user = false;
		}
	}
	next();
};

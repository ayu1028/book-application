const db = require('./models/index');
const Op = db.Sequelize.Op;

module.exports = async (req, res, next) => {
	const userId = req.session.user_id;
	if(userId){
		const loginUser = await db.user.findOne({
			where: {
				id: userId
			}
		});
		if(loginUser) {
			const countNumber = await db.impression.count({
				where: {
					user_id: userId
				}
			});
			res.locals.user = loginUser;
			res.locals.number = countNumber;
		} else {
			res.locals.user = false;
		}
	}
	next();
};
require('dotenv').config();
const env = process.env;

module.exports = {
  'development': {
    'username': env.USER_NAME,
    'password': env.PASSWORD,
    'database': env.DATABASE,
    'host': env.HOST,
    'dialect': 'mysql'
  },
  'test': {
    'username': env.USER_NAME,
    'password': env.PASSWORD,
    'database': env.DATABASE,
    'host': env.HOST,
    'dialect': 'mysql'
  },
  'production': {
    'username': env.USER_NAME,
    'password': env.PASSWORD,
    'database': env.DATABASE,
    'host': env.HOST,
    'dialect': 'mysql'
  }
};

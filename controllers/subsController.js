const subsDao = require('../daos/subsDao');
const usersDao = require('../daos/usersDao');
const subUtil = require('../utilities/subUtil');

const handleAddSubscription = (db) => (req, res) => {
  const {subName, subPrice, subDate, userEmail } = req.body;
  usersDao.getUserIdByEmail(userEmail, db)
    .then(data => {
      const userId = data[0].id;
      subsDao.insertSub(subName, subPrice, subDate, userId, db)
      .then(success => {
        const subObj = subUtil.createSubObj(subName, subPrice, subDate);
        res.json(subObj);
      })
      .catch(fail => res.json('unable to add sub'))
    }).catch(err => {
      res.status(400).json('unable to get user by email')}
    )
}

const handleDeleteSubscription = (db) => (req, res) => {
  const {subName, userEmail } = req.body;
  usersDao.getUserIdByEmail(userEmail, db)
    .then(data => {
      const userId = data[0].id;
      subsDao.deleteSub(subName, userId, db)
      .then(data => {
        res.json('db updated, now erase front end sub component')
      }).catch(err => res.status(400).json('unable to delete sub'))
    }).catch(err => {
      res.status(400).json('unable to get user by email')}
    )
}

const handGetSubscriptions = (db) => (req, res) => {
  const { email } = req.body;
  usersDao.getUserIdByEmail(email, db)
    .then(data => {
      const userId = data[0].id;
      console.log(userId);
      subsDao.getSubs(userId, db)
      .then(subs => res.json(subs))
      .catch(err => res.json('could NOT retrieve subs'))
    }).catch(err => {
      res.status(400).json('unable to get user by email')}
    )
}

module.exports = {
  handleAddSubscription: handleAddSubscription,
  handleDeleteSubscription: handleDeleteSubscription,
  handGetSubscriptions: handGetSubscriptions
};

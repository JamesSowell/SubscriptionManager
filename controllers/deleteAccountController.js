// NOT USED
const usersDao = require('../daos/usersDao');
const subsDao = require('../daos/subsDao');

const handeDeleteAccount = (db) => (req, res) => {
  const { email } = req.body;
  usersDao.getUserIdByEmail(email, db) // lines 6-12 goes through model, is for constraints
    .then(data =>{
      const userId = data[0].id;
      subsDao.deleteSubsOfUserId(userId, db)
          .then(eraseUser => {
            console.log(userId);
            usersDao.deleteUser(userId, db)
              .then(success => res.json("successfully erased User"))
              .catch(err => res.json("erased subs but not user"))
          })
          .catch(err => res.json('error erasing all subs from user_id'))

    }).catch(err => res.json('error locating USERID from email'))
}

module.exports = {
  handeDeleteAccount: handeDeleteAccount
};

// Was going to use this, but because of user_id foreign key, we can't
// erase the user without erasing the associated subs
/*
.finally(eraseUser => {
  console.log(data[0].id);
  db.select('*').from('users')
    .where('id', '=', data[0].id)
    .del()
})
*/

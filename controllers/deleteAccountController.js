const handeDeleteAccount = (db) => (req, res) => {
  const { email } = req.body
  db.select('id').from('users').where('email', '=', email)
    .then(data =>{
      db.select('*').from('subs')
        .where('user_id', '=', data[0].id)
        .del()
          .then(eraseUser => {
            console.log(data[0].id);
            db.select('*').from('users')
              .where('id', '=', data[0].id)
              .del()
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

const usersDao = require('../daos/usersDao');

const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, name, password } = req.body;
  if(!email || !name || !password){      // put this is password utility
    return res.status(400).json('incorrect form submissions');
  }
  const hash = bcrypt.hashSync(password);
    usersDao.insertUser(name, email, hash, db)
    .then(data => res.json(email))
    .catch(err => res.json("could not insert into users"));
}

module.exports = {
  handleRegister: handleRegister
};

/*
db.transaction(trx => {
  trx.insert({
    hash: hash,
    email: email
  })
  .into('logins')
  .returning('email') //email -> loginEmail
  .then(loginEmail => {
    return trx('users')
      .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date()
        })
        .then(user => {
          res.json(user[0]);
        })
  })
  .then(trx.commit) //finalizes
  .catch(trx.rollback) // undos changes
})
.catch(err => res.status(400).json('unable to register'))
*/

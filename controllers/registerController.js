// WORKS
const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, name, password } = req.body;
  if(!email || !name || !password){
    return res.status(400).json('incorrect form submissions');
  }
  const hash = bcrypt.hashSync(password);
    db('users').insert({  // give this to userDao
      name: name,
      email: email,
      hash: hash
    })
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

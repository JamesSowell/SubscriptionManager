const usersModel = require('../models/usersModel');

// DELETEACCOUNT
const handeDeleteAccount = (db) => (req, res) => {
  const { email } = req.body;
  usersModel.deleteAccount(email, db)
    .then(success => res.json("successfully erased User"))
    .catch(err => res.status(400).json(err.message));
}


// REGISTER
const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, name, password } = req.body;
  usersModel.register(name, email, password, db, bcrypt)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err.message));
}


// SIGNIN
const handleSignin = (db, bcrypt) => (req, res) =>{
  const {email, password } = req.body;
  usersModel.signin(password, email, db, bcrypt)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err.message));
}

module.exports = {
  handeDeleteAccount: handeDeleteAccount,
  handleRegister: handleRegister,
  handleSignin: handleSignin
};

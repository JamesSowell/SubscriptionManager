const usersDao = require('../daos/usersDao');
const subsDao = require('../daos/subsDao');
const userUtil = require('../utilities/userUtil');
const usersModel = require('../models/usersModel');

// DELETEACCOUNT
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


// REGISTER
const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, name, password } = req.body;
  userUtil.isValidRegisterInput(email, name, password);
  const hash = bcrypt.hashSync(password);
    usersDao.insertUser(name, email, hash, db)
    .catch(err => res.json("user already in the system"))
    .then(data => {
      const user = userUtil.userCreate(email, name);
      res.json(user);
    })
    .catch(err => res.json("err could not insert into users"));
}


// SIGNIN
const handleSignin = (db, bcrypt) => (req, res) =>{
  const {email, password } = req.body;
  userUtil.isValidInput(password, email);
  usersDao.getUserByEmail(email, db)
    .then(data => {
      if(userUtil.isValidUser(password, data[0].hash, bcrypt)){
        const user = userUtil.userResponse(data[0]);
        return res.json(user);
      }else{
        res.status(400).json('something went wrong at else statement');
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
  handeDeleteAccount: handeDeleteAccount,
  handleRegister: handleRegister,
  handleSignin: handleSignin
};

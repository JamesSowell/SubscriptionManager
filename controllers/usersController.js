const usersDao = require('../daos/usersDao');
const subsDao = require('../daos/subsDao');

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
  if(!email || !name || !password){      // put this is password utility
    return res.status(400).json('incorrect form submissions');
  }
  const hash = bcrypt.hashSync(password);
    usersDao.insertUser(name, email, hash, db)
    .then(data => res.json(email))
    .catch(err => res.json("could not insert into users"));
}


// SIGNIN
const handleSignin = (db, bcrypt) => (req, res) =>{
  const {email, password } = req.body;
  if(!email || !password){
    return res.status(400).json('incorrect form submissions');
  }
  usersDao.getUserByEmail(email, db)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash); //sent to utility
      if(isValid){
        return res.json(data[0].email);
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

const usersDao = require('../daos/usersDao');
const subsDao = require('../daos/subsDao');
const userUtil = require('../utilities/userUtil');
const usersModel = require('../models/usersModel');

const deleteAccount = (email, db) => {
    return usersDao.getUserIdByEmail(email, db)
            .then(data =>{
              if(!data){
                return Promise.reject(new Error("This email is not in system")); // err is handled fine, but isn't showing my error
              }
              const userId = data[0].id;
              subsDao.deleteSubsOfUserId(userId, db)
                  .then(eraseUser => {
                    console.log(userId);
                    usersDao.deleteUser(userId, db)
                      .then(success => {return;})
                      .catch(err => {throw new Error("erased subs but not user")})
                  })
                  .catch(err => {throw new Error('error erasing all subs from user_id')});
            });
}

const register = (name, email, password, db, bcrypt) => {
  const isValid = userUtil.isValidRegisterInput(email, name, password);
  if(!isValid){
    return Promise.reject(new Error("Invalid register Input"));
  }
  const hash = bcrypt.hashSync(password);
  return usersDao.insertUser(name, email, hash, db)
          .then(data => {
            const user = userUtil.userCreate(email, name);
            return user;
          })
          .catch(err => {throw new Error("user is already in system");})

}

const signin = (password, email, db, bcrypt) => {
    const isValid = userUtil.isValidInput(password, email);
    if(!isValid){
      return Promise.reject(new Error("One or more input left empty"));
    }
    return usersDao.getUserByEmail(email, db)
            .then(data => {
              if(!data[0]){
                throw new Error("user with this password and email doens't exist");
              }
              if(userUtil.isValidUser(password, data[0].hash, bcrypt)){
                return userUtil.userResponse(data[0]);
              }else{
                return Promise.reject(new Error("password did not match data base userPassword"));
              }
            });
}

module.exports ={
  deleteAccount: deleteAccount,
  register: register,
  signin: signin
};

// register and signin call this utility

// hash

// verify password

const isValidUser = (password, hash, bcrypt) => {
   return bcrypt.compareSync(password, hash);
}

const isValidInput = (email, password) => {
  if(!email || !password){
    return res.status(400).json('incorrect form submissions');
  }
}

const isValidRegisterInput = (email, password, name) =>{
  if(!email || !name || !password){
    return res.status(400).json('incorrect form submissions');
  }
}

const userResponse = (data) => {
  const user = (({email, name}) => ({email, name}))(data);
  return user;
}

const userCreate = (email, name) => {
  const user = {
    email: email,
    name: name
  }

  return user;
}

module.exports = {
  isValidUser: isValidUser,
  isValidInput: isValidInput,
  isValidRegisterInput: isValidRegisterInput,
  userResponse: userResponse,
  userCreate: userCreate
}

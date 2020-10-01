// register and signin call this utility

// hash

// verify password

const isValidUser = (password, hash, bcrypt) => {
   return bcrypt.compareSync(password, hash);
}

const isValidInput = (email, password) => {
  return email && password;
}

const isValidRegisterInput = (email, password, name) =>{
  return email && password && name;
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

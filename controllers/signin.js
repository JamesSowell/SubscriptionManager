const handleSignin = (db, bcrypt) => (req, res) =>{
  const {email, password } = req.body;
  if(!email || !password){
    return res.status(400).json('incorrect form submissions');
  }
  console.log(email, password);
  db.select('email', 'hash').from('logins') // was not working because logins was empty, fix register foist
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash); //returns list of elements where email=front-end-email
      if(isValid){
        return db.select('*').from('users') //always use return when doing something to database
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      }else{
        res.status(400).json('something went wrong at else statement');
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports  = {
  handleSignin: handleSignin
};

const handleSignin = (db, bcrypt) => (req, res) =>{
  const {email, password } = req.body;
  if(!email || !password){
    return res.status(400).json('incorrect form submissions');
  }
  console.log(email, password);//line seven passed to DAO
  db.select('email', 'hash').from('logins') // was not working because logins was empty, fix register foist
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash); //sent to utility
      if(isValid){
        return db.select('*').from('users') // sent to Dao
          .where('email', '=', email)
          .then(user => {
            res.json(user[0]) //return name and all subscriptions
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

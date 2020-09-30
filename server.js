const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

const subsController = require('./controllers/subsController');
const signinController = require('./controllers/signinController');
const registerController = require('./controllers/registerController');
const deleteAccountController = require('./controllers/deleteAccountController');

const db = knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'subscriptionmanager'
  }
});
const app = express();

app.use(bodyParser.json());
app.use(cors());

// register will put users password and email in logins and user database. DONE
// new data will go to front-end state which will use ID to match with foreign keys
app.post('/register', registerController.handleRegister(db, bcrypt));
// signin is responsible for responding users SUBSCRIPTIONS. DONE
app.post('/signin', signinController.handleSignin(db, bcrypt));
// delete will erase user's subscriptions first an then the users
app.delete('/deleteaccount', deleteAccountController.handeDeleteAccount(db));



app.post('/addsubscription', subsController.handleAddSubscription(db));

app.delete('/deletesubscription', subsController.handleDeleteSubscription(db));

app.get('/getsubscriptions', subsController.handGetSubscriptions(db))

//app.patch('/updatesubscription', will return new value to front end comp)




app.listen(3000, (req, res) => {
  console.log('app is running on port 3000');
})

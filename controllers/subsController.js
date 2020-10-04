const subsModel = require('../models/subsModel');

const handleAddSubscription = (db) => (req, res) => {
  const {subName, subPrice, userEmail } = req.body;
  console.log({subName: subName, subPrice: subPrice, userEmail: userEmail});
  subsModel.addSubscription(subName, subPrice, userEmail, db)
    .then(subObj => res.json(subObj))
    .catch(err => {
      res.status(400).json(err.message)}
    );
}

const handleDeleteSubscription = (db) => (req, res) => {
  const {subName, userEmail } = req.body;
  console.log({subName: subName, userEmail: userEmail});
  subsModel.deleteSubscription(subName, userEmail, db)
    .then(sucess => res.json('sub erased'))
    .catch(err => {
      res.status(400).json(err.message)}
    );
}

const handGetSubscriptions = (db) => (req, res) => {
  const { email } = req.body;
  subsModel.getSubscriptions(email, db)
    .then(subs => res.json(subs))
    .catch(err => {
      res.status(400).json(err.message)}
    );
}

module.exports = {
  handleAddSubscription: handleAddSubscription,
  handleDeleteSubscription: handleDeleteSubscription,
  handGetSubscriptions: handGetSubscriptions
};

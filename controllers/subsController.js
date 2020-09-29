const subsDao = require('./subsDao');

// FOR SOME REASON:
// subsDao is showing up as empty. the problem best described:
// nested file requires are weird. Udemy course did not teach this

const handleAddSubscription = (db) => (req, res) => {
  const {subName, subPrice, subDate, userId } = req.body;
  db('subs').insert({
    sub_name: subName,
    sub_price: subPrice,
    start_date: subDate,
    user_id: userId
  })
    .then(data => {
      res.json("send user back to front end to put into sub comp")
    }).catch(err => res.status(400).json('unable to add sub'))
}

const handleDeleteSubscription = (db) => (req, res) => {
  const {subName, userId } = req.body;
  db('subs').where({sub_name: subName})
    .andWhere({user_id: userId})
    .del()
    .then(data => {
      res.json('db updated, now erase front end sub component')
    }).catch(err => res.status(400).json('unable to delete sub'))
}

module.exports = {
  handleAddSubscription: handleAddSubscription,
  handleDeleteSubscription: handleDeleteSubscription
};

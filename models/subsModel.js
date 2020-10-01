const subsDao = require('../daos/subsDao');
const usersDao = require('../daos/usersDao');
const subUtil = require('../utilities/subUtil');

const addSubscription = (subName, subPrice, subDate, userEmail, db) => {
  return usersDao.getUserIdByEmail(userEmail, db)
          .then(data => {
            const userId = data[0].id;
            return subsDao.insertSub(subName, subPrice, subDate, userId, db)
                    .then(success => {
                      return subUtil.createSubObj(subName, subPrice, subDate);
                    })
                    .catch(fail => {
                      return Promise.reject(new Error('unable to add sub'));
                    })
          });
}

const deleteSubscription = (subName, userEmail, db) => {
  return usersDao.getUserIdByEmail(userEmail, db)
          .then(data => {
            const userId = data[0].id;
            return subsDao.deleteSub(subName, userId, db)
              .then(data => {
                return;
              }).catch(err => {
                Promise.reject(new Error('unable to delete sub'));
              })
          });
}

const getSubscriptions = (email, db) => {
  return usersDao.getUserIdByEmail(email, db)
          .then(data => {
            const userId = data[0].id;
            console.log(userId);
            return subsDao.getSubs(userId, db)
                    .then(subs => {
                      return subs;
                    })
                    .catch(err => {
                      return Promise.reject(new Error('could NOT retrieve subs'));
                    })
          });
}

module.exports ={
  addSubscription: addSubscription,
  deleteSubscription: deleteSubscription,
  getSubscriptions: getSubscriptions
};

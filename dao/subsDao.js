const insertSub = (subName, subPrice, subDate, userId, db) =>{
  return db('subs').insert({
    sub_name: subName,
    sub_price: subPrice,
    start_date: subDate,
    user_id: userId
  });
}

const deleteSub = (subName, userId, db) => { //make email instead of id
  return db('subs').where({sub_name: subName}) // use join to erase all subs at once
    .andWhere({user_id: userId})            // fron END DOESN't need ID from db
    .del();
}

const sup = 5;


module.exports = {
  insertSub: insertSub,
  deleteSub: deleteSub,
  sup: sup
};

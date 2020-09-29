const insertSub = (subName, subPrice, subDate, userId, db) =>{
  db('subs').insert({
    sub_name: subName,
    sub_price: subPrice,
    start_date: subDate,
    user_id: userId
  })
}

const deleteSub = (subName, userId, db) => {
  db('subs').where({sub_name: subName})
    .andWhere({user_id: userId})
    .del()
}

const sup = () =>{
  return 5;
}


module.exports = {
  insertSub: insertSub,
  deleteSub: deleteSub,
  sup: sup
};

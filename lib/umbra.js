var ObjectID = require('mongodb').ObjectID

module.exports = function (app) {
  app.umbra = {}

  app.umbra.returnWork = function (cb) {
    app.db.returnCollection('umbraMatches', function (err, umbra) {

      umbra.count({ complete: false },function(err, count){
        var skip = Math.floor(Math.random() * (count - 1 + 1)) + 1;
        umbra.find({ complete: false }).skip(skip).limit(1).toArray(function (err, results) {
          if (results.length == 0) {
            cb(false)
          } else {
            results[0].totalLeft = count
            cb(results[0])
          }
        })

      })
    })
  }
// { id: '56db566b1312bc1468f7abb5',
//   results:
//    [ { id: 'depectedIn',
//        desc: 'The person is depicted in this photo' },
//      { id: 'promotional', desc: 'promotional resource' } ],
//   user: 'asd' }


  app.umbra.saveWork = function (work,cb) {
    app.db.returnCollection('umbraMatches', function (err, umbra) {
      var id = new ObjectID(work.id)
      console.log(id)
      console.log(work.id,{ complete: true, results: work.results, user: work.user})
      umbra.update({_id: id}, {$set: { complete: true, results: work.results, user: work.user}},function(err,results){
        if (err) console.log(err)
        if (cb) cb()
      })
    })
  }


}

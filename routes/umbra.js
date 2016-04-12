var _ = require('highland')
module.exports = function (app) {
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
  })


  app.get('/api/v1/umbra', function (req, res) {
    if (req.query.action) {
      if (req.query.action.toLowerCase() === 'work') {
        app.umbra.returnWork(function (work) {
          res.type('application/json')
          res.status(200).send(JSON.stringify(work, null, 2))
          return true
        })
        return true
      }
      if (req.query.action.toLowerCase() === 'download') {

        res.setHeader('Content-disposition', 'attachment; filename=lj_umbra_complete_'+new Date().toString().replace(/\s/g,'_')+'.ndjson');
        res.setHeader('Content-type', 'application/json');


        app.db.returnCollection('umbraMatches', function (err, umbra) {
          _(umbra.find({complete:true}))
            .map(function (r){
              res.write(JSON.stringify(r)+"\n");
            })
            .done(function(){
              res.end();
            })
        })
        return true
      }


    } else {
      res.type('application/json')
      res.status(500).send(JSON.stringify({error: 'No Action requested'}, null, 2))
    }
  })

  app.post('/api/v1/umbra', function (req, res) {
    if (req.query.action) {
      if (req.query.action.toLowerCase() === 'save') {
        app.umbra.saveWork(req.body, function () {
          res.status(200).send("{}")
          return true
        })
      }
    }
  })



// other routes..
}

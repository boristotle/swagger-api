var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://@localhost/memories";

// GET ALL memories
router.get('/api/v1/memories', function(req, res, next){
 pg.connect(conString, function(err, client, done){
    client.query('SELECT * FROM memories', function(err, result){
      done();
      res.json(result.rows);
    })
  })
})


// INSERT A NEW MEMORY
router.post('/api/v1/memories', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    client.query('INSERT INTO memories (old_days, these_days, year VALUES ($1, $2, $3', [req.body.oldDays, req.body.theseDays, req.body.year], function(err, result){
      done();
      res.json(result.rows);
    })
  })
})

// GET ALL MEMORIES FOR A GIVEN year
router.get('/api/v1/memories/:year', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    client.query('SELECT * FROM memories WHERE year=' + req.params.year, function(err, result){
      done();
      res.json(result.rows);
    })
  })
})


// GET A UNIQUE LIST OF ALL THE YEARS FROM THE MEMORIES DATABASE
router.get('/api/v1/memories/years', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    client.query('SELECT DISTINCT year FROM memories', function(err, result){
      res.json(result.rows);
    })
  })
})






module.exports = router;
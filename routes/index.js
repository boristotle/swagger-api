var express = require('express');
var router = express.Router();
var pg = require('pg');
var dotenv = require('dotenv')
var cors = require('cors');
var conString = process.env.DATABASE_URL || "postgres://@localhost/memoriesapp";

// GET ALL memories
router.get('/api/v1/memories', function(req, res, next){
 pg.connect(conString, function(err, client, done){
    client.query('SELECT * FROM memories', function(err, result){
      done();
      res.json(result);
    })
  })
})


// INSERT A NEW MEMORY
router.post('/api/v1/memories', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    client.query('INSERT INTO memories (old_days, these_days, year) VALUES ($1, $2, $3)',
      [req.body.data.attributes.old_days, req.body.data.attributes.these_days, req.body.data.attributes.year], function(err, result){
      done();
      res.json(result);
    })
  })
})


// GET A UNIQUE LIST OF ALL THE YEARS FROM THE MEMORIES DATABASE
router.get('/api/v1/memories/years', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    client.query('SELECT DISTINCT year FROM memories', function(err, result){
      done(); 
      var output = [];
      for (var i = 0; i < result.rows.length; i++) {
        output.push(result.rows[i].year)
      }
      res.json(output);
    })
  })  
})

// GET ALL MEMORIES FOR A GIVEN year
router.get('/api/v1/memories/:year', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    client.query('SELECT * FROM memories WHERE year=' + req.params.year, function(err, result){
      done();
      res.json(result);
    })
  })
})








module.exports = router;
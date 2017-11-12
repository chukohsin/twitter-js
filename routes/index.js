const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');
const bodyParser = require('body-parser');

module.exports = function (io) {

	router.get('/', function (req, res) {
	  let tweets = tweetBank.list();
	  res.render( 'index', { tweets: tweets, showForm: true} );
	});

	router.get('/stylesheets/style.css', (req, res) => {
		res.sendFile('/Users/KoHsinChu/graceHopperProgram/juniorPhase/twitter-js/public/stylesheets/style.css');
	})

	router.get('/users/:name', function(req, res) {
	  var name = req.params.name;
	  var list = tweetBank.find( {name: name} );
	  res.render( 'index', { tweets: list } );
	});

	router.get('/tweets/:id', function(req, res) {
	  var id = req.params.id;
	  var list = tweetBank.find( {id: id} );
	  res.render( 'index', { tweets: list } );
	});

	router.post('/tweets', function(req, res) {
	 	var newTweet = tweetBank.add(req.body.name, req.body.text);
	    io.sockets.emit('new_tweet', newTweet);
	  	res.redirect('/');
	});

	return router;
};
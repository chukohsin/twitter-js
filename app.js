const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks')
const routes = require('./routes');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const path = require('path');


app.use(morgan('dev'));


app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true}); // point nunjucks to the proper directory for templates
// nunjucks.render('index.html', {title: 'Hello', people: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Candy'}]}, function(err, output) {
// 	console.log(output);
// })


app.use(express.static(path.join(__dirname, '/public')))

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


var io = socketio.listen(server);
app.use( '/', routes(io) );


// app.use('/', (req, res, next) => {
// 	console.log(req.method, req.path, res.statusCode);
// 	next();
// })

// app.get('/', function(req, res, next) {
// 	const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
// 	res.render( 'index', {title: 'Hall of Fame', people: people} );
// })


var server = app.listen(3000, function(){
	console.log('Listening on port 3000!');
});





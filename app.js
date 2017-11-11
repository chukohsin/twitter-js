const morgan = require('morgan')
const express = require('express');
const app = express();

app.use(morgan('dev'));



// app.use('/', (req, res, next) => {
// 	console.log(req.method, req.path, res.statusCode);
// 	next();
// })

app.get('/', function(req, res, next) {
	res.send('Welcome!');
})













app.listen(3000, function(){
	console.log('Listening on port 3000!');
});
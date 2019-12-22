const express = require('express')
const bodyParser = require('body-parser');
const myValidation = require('./my-validation-script');
const PORT = process.env.PORT || 5000;

var app = express();

app.use(bodyParser.json());

app.get('/', function(request, response){
   response.header("Content-Security-Policy", "default-src 'self';script-src 'self';object-src 'none';img-src 'self';media-src 'self';frame-src 'none';font-src 'self' data:;connect-src 'self';style-src 'self'");
   response.send("<h1>Start page</h1><p>Будем использовать NodeJS для валидации на стороне сервера (переиспользование JS кода валидации)");
});

app.get('/validate1', function(request, response){
	response.header("Content-Security-Policy", "default-src 'self';script-src 'self';object-src 'none';img-src 'self';media-src 'self';frame-src 'none';font-src 'self' data:;connect-src 'self';style-src 'self'");
	response.send("<h1>Get method not implements</h1>");
});
app.post('/validate', function(request, response){
	if(!request.body) return response.sendStatus(400);
	let obj = request.body;
	let validationResult = myValidation.testJs(obj);
	if ( validationResult != null ) {
		response.status(400).json(validationResult);
	}
	console.log(request.body);      // your JSON
	response.send(request.body);    // echo the result back
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
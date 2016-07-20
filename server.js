// Includes
var express = require('express');
var expressHB = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var apiRouter = require('./routers/api');
var settings  = require('./settings');

// Database setup
mongoose.connect(settings.getUri());

// Application setup
var app = express();
app.set('title', 'GoPlay');
app.set('version', '0.0.1');
app.engine('handlebars', expressHB({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Restful API
var router = apiRouter.getApiRouter(express);

app.use('/static', express.static('static'));
app.use('/api', router);
app.get('/', function (req, res) {
  res.render('map', { title: app.get('title') + " v" + app.get('version') });
});

app.listen(3000, function () {
  console.log(app.get('title') + " v" + app.get('version') + " server started on port 3000");
});

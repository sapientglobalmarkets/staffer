var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var falcor = require('falcor');
var falcorExpress = require('falcor-express');

var $ref = falcor.Model.ref;
var $atom = falcor.Model.atom;
var $error = falcor.Model.error;

// -----------------------------------------------------------------------------
// Needs
// -----------------------------------------------------------------------------
var needs = [
    {
        id: 101,
        startDate: new Date('2016-06-01'),
        endDate: new Date('2016-06-30'),
        project: 'Cheerful Planet',
        company: 'Apple',
        skill: 'JavaScript',
        person: 'Peter Gill'
    },
    {
        id: 102,
        startDate: new Date('2016-08-01'),
        endDate: new Date('2016-08-31'),
        project: 'Cheerful Planet',
        company: 'Apple',
        skill: 'JavaScript',
        person: 'Peter Gill'
    }
];

// -----------------------------------------------------------------------------
// Falcor Model
// -----------------------------------------------------------------------------
var model = new falcor.Model({
    cache: {
        needMap: {
            101: {
                startDate: '2016-06-01',
                endDate: '2016-06-30',
                project: 'Cheerful Planet',
                company: 'Apple',
                skill: 'JavaScript',
                person: 'Peter Gill',
            },
            102: {
                startDate: '2016-08-01',
                endDate: '2016-08-31',
                project: 'Cheerful Planet',
                company: 'Apple',
                skill: 'JavaScript',
                person: 'Peter Gill'
            }
        }
    }
});

// -----------------------------------------------------------------------------
// Create Express App
// -----------------------------------------------------------------------------
var app = express();

// Add middleware to enable CORS
// The options below are needed to make CORS work with the staffer client.
var corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
};
app.use(cors(corsOptions));

// Add middleware to parse the POST data of the body
app.use(bodyParser.urlencoded({extended: true}));

// Add middleware to parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// Define endpoints
app.get('/needs', function (req, res) {
    res.json(needs);
});

app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
    return model.asDataSource();
}));

// -----------------------------------------------------------------------------
// Start the HTTP Server using the Express App
// -----------------------------------------------------------------------------
var port = process.env.PORT || 9090;

var server = require('http').createServer(app);

// Start listening to HTTP requests
server.listen(port, function() {
    console.log('REST endpoint: http://localhost:' + port + '/needs');
    console.log('Falcor demo: Point your browser to http://localhost:' + port + ' and open the console');
});

// -----------------------------------------------------------------------------
// Stop the HTTP server and the database when SIGINT is received
// (i.e. Ctrl-C is pressed)
// -----------------------------------------------------------------------------
process.on('SIGINT', function() {
    console.log('SIGINT received ...');
    server.close(function() {
        console.log('Server stopped ...');
        console.log('Exiting process ...');
        process.exit();
    });
});

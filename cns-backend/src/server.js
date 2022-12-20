var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var IndexRouter = require('./controllers/V0/index.router.js');

var app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.json());

//CORS Should be restricted
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use('/api/v0/', IndexRouter)

// Root URI call
app.get( "/", async ( req, res ) => {
    res.send("/api/v0/");
    res.end();
} );

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.listen( port, () => {
    console.log( `server running http://localhost:${ port }` );
    console.log( `press CTRL+C to stop server` );
} );
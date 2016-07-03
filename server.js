// Require the Express Module
var express = require("express");
// Create an Express App
var app = express();
var mongoose = require('mongoose');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');
// Require body-parser (to receive post data from clients)
var bodyParser = require("body-parser");
// Integrate body-parser with our App
app.use(bodyParser.urlencoded());
// Require path
var path = require("path");
// Setting our Static Folder Directory
app.use(express.static(__dirname + "./static"));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request

// var Schema = mongoose.Schema;

var QuoteSchema = new mongoose.Schema({
 name: String,
 quote: String
})
mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'User'
// mongo pluralizes the model name into a collection name

app.get('/', function(req, res) {
	Quote.find({}, function(err, quotes) {
	
		console.log(quotes);

	    res.render('index', {quotes: quotes});

	})
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
})

app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    // create a new User with the name and age corresponding to those from req.body
    var quoting_dojo = new Quote({name: req.body.name, quote: req.body.quote});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    quoting_dojo.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('something went wrong');
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added the quote!')};

    Quote.find({}, function(err, quotes) {
      console.log(quotes);
      res.render('quotes', {quotes: quotes});
    })
  })
});

app.get('/quote', function(req, res) {
    Quote.find({}, function(err, quotes) {
      res.render('quotes', {quotes: quotes});
    })
  });

app.get('/delete/:id', function(req, res){
  Quote.remove({_id: req.params.id}, function(err, whatever){
    Quote.find({}, function(err, quotes) {
      res.render('quotes', {quotes: quotes});
    })
  })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})






















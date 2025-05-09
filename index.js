// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Add a route for `/api` to handle requests without a parameter
app.get('/api', (req, res) => {
  const date = new Date();

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Keep the `/api/:date?` route for handling requests with a parameter
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;
  if (!isNaN(dateParam)) {
    // If dateParam is a Unix timestamp
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise, try to parse as a date string
    date = new Date(dateParam);
  }

  // Check if the date is valid
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return the Unix and UTC timestamps
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

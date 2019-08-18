const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

// Serve static files from client
app.use(express.static(path.join(__dirname, 'client/build')));

// Add backend server routes
app.use(require('./routes'));

// Render React app at root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3333, () => {
  console.log(`Listening on port ${server.address().port}`);
});

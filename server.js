const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log =(`${now}: ${req.method} ${req.url}`);

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unabelt o append to server.log');
    }
  });
  next();
});

hbs.registerHelper('getCurrnetYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// app.use((req, res, next) => {
//   res.render('maintenence.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: "Anthony's Website",
    welcomeMessage: "Welcome to Anthony's Website",
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

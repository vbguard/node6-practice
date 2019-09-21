const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const ejs = require('ejs');

const config = require('./config');
require('./lib/getExchenge.js');
const app = express();

const mongoose = require('mongoose');

mongoose.connect(config.mongodb_URI, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if (error) console.log(error)
    console.log('DB connected... 😄');
});

const PORT = config.PORT;

// const routes = require('./routes');
const apiRoutes = require('./routes/apiRoutes/apiRoutes.js');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors('*'));
app.use(logger('dev'));

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.render('index');
})
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
})
app.use('/api', apiRoutes);

app.listen(PORT, ()=> {
    console.log(`Server success started on ${PORT} port`);
});

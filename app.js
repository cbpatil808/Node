const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/person');
const mongoDbUri = 'you_mongobd_url'

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
const userRoutes = require('./routes/person'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(userRoutes);

mongoose.connect(mongoDbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
})
  .then(result => {
    const port = 3000;
    app.listen(port);
    console.log(`Server started on port ${port}`);
  })
  .catch(err => {
    console.log(err);
  });

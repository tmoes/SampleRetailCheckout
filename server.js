// Server ----------------------------------------------------------
const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/purchasePage', (req, res) => {
  newCustomer(req.body, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send();
    res.end(data);
  }
)});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// New customer entry into DB (Controller) -------------------------
const newCustomer = (data, callback) => {
  console.log("Data:", data);
  connection.query('INSERT INTO customers SET ?', data, (err, data) => {
    if (err) {
      console.log('Error querying database ------------------');
      console.log(err);
    } else {
      callback(data.insertId);
    }
  })
};

// DB --------------------------------------------------------------
const db = require('mysql');

const connection = db.createConnection(
  {
    user: 'root',
    password: 'password',
    database: 'multiformcheckout'
  }
);

connection.connect( err => {
  if (err) {
    console.log('Error connecting to database -------------------');
    console.log(err);
  }
  console.log('Connected to DB');
})
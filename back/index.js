const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');


const connection = mysql.createConnection({
  host     : '34.155.38.235',
  user     : 'root',
  password : 'Antoinejean31',
  database : 'quokkai'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events(connection));

app.get('', (req, res) => {
  res.send("Hello World !")
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});



connection.end();
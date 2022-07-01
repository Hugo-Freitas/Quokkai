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

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as thread id: ' + connection.threadId);
});;

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

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

/*connection.query('SELECT * FROM article AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});*/

app.route('/article/')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM `article`",
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

app.post('/inscription',(req,res) => {

  let Email = req.body.email
  let Password = req.body.password

  let qr = `INSERT INTO user(mail, password) VALUES ('${Email}','${Password}')` ;

  connection.query(qr,(err,result) => {
    if (err){console.log(err);}

    res.send({
      message:'data inserted'
    })
    

  })

})

app.post('/connexion',(req,res) => {

  let Email = req.body.email
  let Password = req.body.password

  let qr = `SELECT * FROM user where mail='${Email}' AND password='${Password}'` ;


  connection.query(qr,(err,result) => {
    if (err){console.log(err);}

    console.log(result)

    if (Object.keys(result).length === 0){
      res.send({
        message:'User not found',
        status: 404
      })
    } else {
      res.send({
        message:'User found',
        status: 200
      })
    }
    
  })
})



module.exports = connection;
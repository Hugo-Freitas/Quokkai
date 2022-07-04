const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');
const nodemailer = require('nodemailer');


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

app.post('/articles' , (req, res) => {
  const regionId = req.body.id;
  // loc a changé
  const qr = `SELECT * FROM article`;
  //const qr = `SELECT * FROM article WHERE departement='${regionId}' and mood >= 0.5`;
  
  connection.query(qr, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send({
      articles: result,
      status: 204,
    });
  });

});

app.post('/inscription',(req,res) => {

  let Email = req.body.email
  let Password = req.body.password
  let Region = req.body.region

  let qr = `INSERT INTO user(mail, password, region) VALUES ('${Email}', '${Password}', '${Region}')` ;

  connection.query(qr, (err, result) => {
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
    
    if (Object.keys(result).length === 0){
      res.send({
        message:'User not found',
        status: 404
      })
    } else {
      res.send({
        region: result[0].region,
        message: 'User found',
        status: 200,
      });
    }
    
  })
})

function sendEmail(receiver, subject, text) {
  // Create transporter
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
      user: 'quokkai.service@gmail.com',
      pass: 'zhqhcmtffcyphriq',
    },
  });
  // Create options
  let mailOptions = {
    from: 'quokkai.service@gmail.com',
    to: receiver,
    subject: subject,
    text: text,
  };
  // transporter sends email
  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log('Error occurs', err);
      return;
    }
  });
}

function generatePassword() {
  // random password generator
  let pass = '';
  const str =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
  const length = 10 + Math.floor(Math.random() * 5);
  for (i = 1; i <= length; i++) {
    const char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }
  return pass;
}


app.put('/mdpOublie', (req, res) => {
  const email = req.body.email;

  let qr = `SELECT * FROM user where mail='${email}'`;

  connection.query(qr, (err, result) => {
    if (err){console.log(err);}
    
    if (Object.keys(result).length === 0){
      res.send({
        message:'User not found',
        status: 404
      })
    } else {
      const newPassword = generatePassword();
      qr = `UPDATE user SET password='${newPassword}' WHERE mail='${email}'`;

      connection.query(qr, (err, result) => {
        if (err) {
          console.log(err);
        }
      });

      const text =
        `Bonjour Mme/M,\n\n` +
        `Suite à votre demande sur l'onglet mot de passe oublié, nous avons généré ce nouveau mot de passe pour votre compte QuokkaÏ : ${newPassword}\n\n` +
        "Sincèrement, toute l'équipe QuokkaÏ.";

      sendEmail(email, 'Quokkaï - Nouveau mot de passe', text);

      res.send({
        message:'User found',
        status: 200
      })
    }
  })
});

module.exports = connection;
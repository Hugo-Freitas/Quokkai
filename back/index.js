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

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

function getDepartement(region) {
  if (region === 3) {
    return "WHERE departement LIKE '22%' OR departement LIKE '29%' OR departement LIKE '35%' OR departement LIKE '56%'";
  } else if (region === 8) {
    return "WHERE departement LIKE '75%' OR departement LIKE '77%' OR departement LIKE '78%' OR departement LIKE '91%' OR departement LIKE '92%' OR departement LIKE '93%' OR departement LIKE '94%' OR departement LIKE '95%'";
  } else if (region === 9) {
    return "WHERE departement LIKE '14%' OR departement LIKE '27%' OR departement LIKE '50%' OR departement LIKE '61%' OR departement LIKE '76%'";
  } else if (region === 7) {
    return "WHERE departement LIKE '02%' OR departement LIKE '59%' OR departement LIKE '60%' OR departement LIKE '62%' OR departement LIKE '80%'";
  } else if (region === 6) {
    return "WHERE departement LIKE '08%' OR departement LIKE '10%' OR departement LIKE '51%' OR departement LIKE '52%' OR departement LIKE '54%' OR departement LIKE '55%' OR departement LIKE '57%' OR departement LIKE '67%' OR departement LIKE '68%' OR departement LIKE '88%'";
  } else if (region === 12) {
    return "WHERE departement LIKE '44%' OR departement LIKE '49%' OR departement LIKE '53%' OR departement LIKE '72%' OR departement LIKE '85%'";
  } else if (region === 4) {
    return "WHERE departement LIKE '18%' OR departement LIKE '28%' OR departement LIKE '36%' OR departement LIKE '37%' OR departement LIKE '41%' OR departement LIKE '45%'";
  } else if (region === 2) {
    return "WHERE departement LIKE '21%' OR departement LIKE '25%' OR departement LIKE '39%' OR departement LIKE '58%' OR departement LIKE '70%' OR departement LIKE '71%' OR departement LIKE '89%' OR departement LIKE '90%'";
  } else if (region === 10) {
    return "WHERE departement LIKE '16%' OR departement LIKE '17%' OR departement LIKE '19%' OR departement LIKE '23%' OR departement LIKE '24%' OR departement LIKE '33%' OR departement LIKE '40%' OR departement LIKE '47%' OR departement LIKE '64%' OR departement LIKE '79%' OR departement LIKE '86%' OR departement LIKE '87%'";
  } else if (region === 1) {
    return "WHERE departement LIKE '01%' OR departement LIKE '03%' OR departement LIKE '07%' OR departement LIKE '15%' OR departement LIKE '26%' OR departement LIKE '38%' OR departement LIKE '42%' OR departement LIKE '43%' OR departement LIKE '63%' OR departement LIKE '69%' OR departement LIKE '73%' OR departement LIKE '74%'";
  } else if (region === 11) {
    return "WHERE departement LIKE '09%' OR departement LIKE '11%' OR departement LIKE '12%' OR departement LIKE '30%' OR departement LIKE '31%' OR departement LIKE '32%' OR departement LIKE '34%' OR departement LIKE '46%' OR departement LIKE '48%' OR departement LIKE '65%' OR departement LIKE '66%' OR departement LIKE '81%' OR departement LIKE '82%'";
  } else if (region === 13) {
    return "WHERE departement LIKE '04%' OR departement LIKE '05%' OR departement LIKE '06%' OR departement LIKE '13%' OR departement LIKE '83%' OR departement LIKE '84%'";
  } else if (region === 5) {
    return "WHERE departement LIKE '20%'";
  }
}

app.post('/articles' , (req, res) => {
  
  const regionId = req.body.id;
  
  const qr = `SELECT * FROM article ` + getDepartement(regionId) + ` and mood >= 50`;
  
  connection.query(qr, (err, result) => {
    if (err) {console.log(err);}

    res.send({
      articles: result,
      status: 204,
    });
  });
});

app.post('/inscription',(req,res) => {

  const Email = req.body.email;
  const Password = req.body.password;
  const Region = req.body.region;

  let qr = `SELECT * FROM user where mail='${Email}'`; ;

  connection.query(qr,(err,result) => {
    if (err){console.log(err);}
    
    if (Object.keys(result).length === 0){
      qr = `INSERT INTO user(mail, password, region) VALUES ('${Email}', '${Password}', '${Region}')`; ;

      connection.query(qr, (err, result) => {
        if (err){console.log(err);}
        res.send({
          message:'data inserted',
          status: 200
        })
      })
    } else {
      res.send({
        message: 'User already exists',
        status: 409
      });
    }
  })
})

app.post('/connexion',(req,res) => {

  const Email = req.body.email;
  const Password = req.body.password;

  const qr = `SELECT * FROM user where mail='${Email}' AND password='${Password}'`; ;

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
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
      user: 'quokkai.service@gmail.com',
      pass: 'zhqhcmtffcyphriq',
    },
  });
  // Create options
  const mailOptions = {
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
        status: 401
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
        status: 204
      })
    }
  })
});

module.exports = connection;
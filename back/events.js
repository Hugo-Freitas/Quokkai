const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  router.get('/testing', function (req, res, next) {

    res.json({
      "statusCode": 200,
      "statusMessage": "Coucou Antoine"
    })
  })
  return router;
}

module.exports = createRouter;

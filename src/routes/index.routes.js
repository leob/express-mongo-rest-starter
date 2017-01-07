const express = require('express')
  , router = express.Router();

router.use('/users', require('routes/user.routes'));

module.exports = router;

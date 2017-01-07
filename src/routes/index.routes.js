const express = require('express')
  , router = express.Router();

router.use('/users', require('routes/user.routes'));
router.use('/tasks', require('routes/task.routes'));

module.exports = router;

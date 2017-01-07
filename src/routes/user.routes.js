const express = require('express')
  , router = express.Router()
  , userCtrl = require('controllers/user.controller');

router.route('/')
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route('/:id')
  .get(userCtrl.get)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

module.exports = router;

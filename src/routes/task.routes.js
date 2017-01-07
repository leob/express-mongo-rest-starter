const express = require('express')
  , router = express.Router()
  , taskCtrl = require('controllers/task.controller');

router.route('/')
  .get(taskCtrl.list)
  .post(taskCtrl.create);

router.route('/:id')
  .get(taskCtrl.get)
  .put(taskCtrl.update)
  .delete(taskCtrl.remove);

module.exports = router;

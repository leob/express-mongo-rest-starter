const User = require('models/user.model')
  , Task = require('models/task.model')
  , helpers = require('util/helpers');

const {handle, handleErr} = helpers.handlers('User', 'users')
  , id = helpers.id;

/**
 * Get user
 */
function get(req, res, next) {
  User.findById(id(req)).exec()
    .then(user => handle(req, res, user) )
    .catch(err => handleErr(next, err, 'get('+id(req)+')') );
}

/**
 * Create new user
 */
function create(req, res, next) {
  const user = new User(req.body);

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(err => handleErr(next, err, 'post()') );
}

/**
 * Update existing user
 */
function update(req, res, next) {
  User.findByIdAndUpdate(id(req), req.body, {new: true}).exec()
    .then(user => handle(req, res, user) )
    .catch(err => handleErr(next, err, 'put('+id(req)+')') );
}

/**
 * Get user list
 */
function list(req, res, next) {
  const { limit = "0", skip = "0" } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(err => handleErr(next, err, 'getAll()') );
}

/**
 * Delete user
 */
function remove(req, res, next) {
  User.findByIdAndRemove(id(req)).exec()
    .then(user => handle(req, res, user) )
    .catch(err => handleErr(next, err, 'put('+id(req)+')') );
}

/**
 * Get user tasks
 */
function getUserTasks(req, res, next) {
  Task.findByUserId(id(req))
    .then(tasks => res.json(tasks) )
    .catch(err => handleErr(next, err, 'getUserTasks('+id(req)+')') );
}

module.exports = { get, create, update, list, remove, getUserTasks };

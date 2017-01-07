const User = require('models/user.model')
  , helpers = require('util/helpers');

const handle = (req, res, user) => helpers.handleResult(req, res, user, 'User')
  , handleErr = (next, err, operation) => helpers.handleError(next, err, 'users:' + operation)
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
  User.findByIdAndUpdate(id(req), req.body).exec()
    .then(user => handle(req, res, user) )
    .catch(err => handleErr(next, err, 'put('+id(req)+')') );
}

/**
 * Get user list
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
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

module.exports = { get, create, update, list, remove };

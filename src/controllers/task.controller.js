const Task = require('models/task.model')
  , helpers = require('util/helpers');

const {handle, handleErr} = helpers.handlers('Task', 'tasks')
  , id = helpers.id;

/**
 * Get task
 */
function get(req, res, next) {
  Task.findAndPopulate(id(req))
    .then(task => handle(req, res, task) )
    .catch(err => handleErr(next, err, 'get('+id(req)+')') );
}

/**
 * Create new task
 */
function create(req, res, next) {
  const task = new Task(req.body);

  task.save()
    .then(savedTask => res.json(savedTask))
    .catch(err => handleErr(next, err, 'post()') );
}

/**
 * Update existing task
 */
function update(req, res, next) {
  Task.findByIdAndUpdate(id(req), req.body, {new: true}).exec()
    .then(task => handle(req, res, task) )
    .catch(err => handleErr(next, err, 'put('+id(req)+')') );
}

/**
 * Get task list
 */
function list(req, res, next) {
  const { limit = "0", skip = "0" } = req.query;
  Task.list({ limit, skip })
    .then(tasks => res.json(tasks))
    .catch(err => handleErr(next, err, 'getAll()') );
}

/**
 * Delete task
 */
function remove(req, res, next) {
  Task.findByIdAndRemove(id(req)).exec()
    .then(task => handle(req, res, task) )
    .catch(err => handleErr(next, err, 'put('+id(req)+')') );
}

module.exports = { get, create, update, list, remove };

const express = require('express')
  , router = express.Router()
  , {reject, handleErr} = require('util/errors')
  , Project = require('models/project')

function handle(next, err, operation) {
  handleErr(next, err, 'projects:' + operation);
}

router.route('/projects').get( (req, res, next) => {

  Project.find().exec().then( (projects) => {
    res.json(projects);

  }).catch( (err) => {
    handle(next, err, 'getAll');
  });
});

router.route('/projects/:id').get( (req, res, next) => {

  Project.findById(req.params.id).exec().then( (project) => {
    if (!project) {
      return reject("Project not found");
    }

    res.json(project);

  }).catch( (err) => {
    handle(next, err, 'get('+req.params.id+')');
  });
});

router.route('/projects').post( (req, res, next) => {
  const project = new Project(req.body);

  project.save().then( (project) => {
    res.send({message: 'Project created', project: project});

  }).catch( (err) => {
    handle(next, err, 'post');
  });

});

router.route('/projects/:id').put( (req, res, next) => {

  Project.findByIdAndUpdate(req.params.id, req.body).exec().then( (project) => {
    if (!project) {
      return reject("Project not found");
    }

    res.json({message: 'Project updated'});

  }).catch( (err) => {
    handle(next, err, 'put('+req.params.id+')');
  });

});

router.route('/projects/:id').delete( (req, res, next) => {

  Project.findByIdAndRemove(req.params.id).exec().then( (project) => {
    if (!project) {
      return reject("Project not found");
    }

    res.json({message: 'Project deleted'});

  }).catch( (err) => {
    handle(next, err, 'delete('+req.params.id+')');
  });

});

module.exports = router;

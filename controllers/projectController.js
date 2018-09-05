const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Task = require('../models/task');
const Project = require('../models/project');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);


router.get('/', async (req, res) => {
  
    try {
        const projects = await Project.find().populate(['user', 'tasks']);
        return res.send({ projects });

      } catch (error) {
        return res.status(400).send({ error: 'Error Loading projects'}); 
      }
});

router.get('/:projectId', async (req, res) => {
   
    try {
        const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);

        return res.send({ project });

      } catch (error) {
        return res.status(400).send({ error: 'Error Loading project'}); 
      }
 
});

router.post('/', async (req, res) =>{
    
    try {
       
        const { title, description, tasks } = req.body; 

        const project = await Project.create({ title, description, user: req.userId });

        await Promise.all(tasks.map( async task => {
           const projectTask = new Task({ ...task, project: project._id});

            await projectTask.save()
            project.tasks.push(projectTask);
        }));

        await project.save();

        return res.send( { project } );

    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error creating new project'});
    }
});

router.put('/:projectId', async (req, res) => {
    try {
       
        const { title, description, tasks } = req.body; 

        const project = await Project.findByIdAndUpdate(req.params.projectId,{
            title,
            description,
            user: req.userId }, { new : true });

        project.tasks = [];
        await Task.remove({ project: project._id });

        await Promise.all(tasks.map( async task => {
           const projectTask = new Task({ ...task, project: project._id});

            await projectTask.save()
            project.tasks.push(projectTask);
        }));

        await project.save();

        return res.send( { project } );

    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error updating project'});
    }
});

router.delete('/:projectId', async (req, res) => {
    try {
        await Project.findByIdAndRemove(req.params.projectId);
        return res.send();

      } catch (error) {
        return res.status(400).send({ error: 'Error Loading project'}); 
      }
 
});


module.exports = app => app.use('/projects', router);
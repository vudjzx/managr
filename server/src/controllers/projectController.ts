import Project from '../models/Project';
import {Request, Response} from 'express';
import Task from '../models/Task';
import mongoose from 'mongoose';

const getProjects = async (req: Request, res: Response) => {
  if (req.user) {
    try {
      const projects = await Project.find({
        owner: req.user,
      });
      res.status(200).json({msg: 'Projects retrieved', projects});
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(401).json({msg: 'Unauthorized'});
  }
};

const newProject = async (req: Request, res: Response) => {
  const project = new Project(req.body);
  if (req.user) {
    project.owner = req.user.id;
    try {
      const storedProject = await project.save();
      res.status(201).json({msg: 'Project created', storedProject});
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(401).json({msg: 'Unauthorized'});
  }
};

const getProject = async (req: Request, res: Response) => {
  if (req.user) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).json({msg: 'Project not found'});
      const project = await Project.findById(req.params.id);
      if (project && project.owner.toString() === req.user.id) {
        const tasks = await Task.find().where('project').equals(req.params.id);
        res.status(200).json({msg: 'Project retrieved', project, tasks});
      }
      res.status(404).json({msg: 'Cant see that project'});
    } catch (error) {
      res.status(400).json({msg: 'Project not found'});
    }
  }
  res.status(401).json({msg: 'Unauthorized'});
};

const editProject = async (req: Request, res: Response) => {
  if (req.user) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).json({msg: 'Project not found'});
      const project = await Project.findById(req.params.id);
      if (project && project.owner.toString() === req.user.id) {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.status(200).json({msg: 'Project updated', updatedProject});
      }
      res.status(404).json({msg: 'Cant see that project'});
    } catch (error) {
      res.status(400).json({msg: 'Project not found'});
    }
  }
  res.status(401).json({msg: 'Unauthorized'});
};

const deleteProject = async (req: Request, res: Response) => {
  if (req.user) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).json({msg: 'Project not found'});
      const project = await Project.findById(req.params.id);
      if (project && project.owner.toString() === req.user.id) {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: 'Project deleted'});
      }
      res.status(404).json({msg: 'Project not found'});
    } catch (error) {
      res.status(400).json({msg: 'Project not found'});
    }
  }
  res.status(401).json({msg: 'Unauthorized'});
};

const addCollaborator = async (req: Request, res: Response) => {};

const deleteCollaborator = async (req: Request, res: Response) => {};

export {
  getProjects,
  getProject,
  newProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
};

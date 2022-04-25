import express from 'express';
import {
  addCollaborator,
  deleteCollaborator,
  deleteProject,
  editProject,
  getProject,
  getProjects,
  newProject,
} from '../controllers/projectController';
import checkAuth from '../middlware/checkAuth';

const projectRouter = express.Router();

// Projects
projectRouter.route('/').get(checkAuth, getProjects).post(checkAuth, newProject);

// Project management

projectRouter
  .route('/:id')
  .get(checkAuth, getProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);

// Collaborators
projectRouter.post('addCollaborator', checkAuth, addCollaborator);
projectRouter.post('deleteCollaborator', checkAuth, deleteCollaborator);

export default projectRouter;

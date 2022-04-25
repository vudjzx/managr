import {IProject} from './projects/IProjects';

export interface ITask {
  name: string;
  description: string;
  completed: boolean;
  deadline: Date;
  priority: string;
  project: IProject['_id'];
}

import {Link} from 'react-router-dom';
import {IProject} from '../interfaces/Responses';

export const ProjectItem = (props: {project: IProject}) => {
  return (
    <div className="border-b p-5 flex flex-row justify-between">
      <div className="flex-1 flex flex-row items-center">
        <p className="px-2">{props.project.name}</p>
        <span className="text-sm text-gray-400 uppercase font-bold">{props.project.client}</span>
      </div>
      <Link
        className="text-sm text-gray-600 hover:text-gray-800 font-bold"
        to={`${props.project._id}`}>
        See details
      </Link>
    </div>
  );
};

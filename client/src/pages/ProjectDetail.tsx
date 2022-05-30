import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {LoadingComponent} from '../components/LoadingComponent';
import useProjects from '../hooks/useProjects';

export const ProjectDetail = () => {
  const params = useParams();
  const {getProjectDetails, loading, project} = useProjects();
  useEffect(() => {
    if (params.id) {
      void getProjectDetails(params.id);
    }
  }, []);
  return loading ? (
    <LoadingComponent />
  ) : (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black">{project.name}</h1>
        <div className="flex justify-between gap-2 text-gray-500 hover:text-black items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <Link to={`/projects/edit/${params.id}`}>Edit</Link>
        </div>
      </div>
    </>
  );
};

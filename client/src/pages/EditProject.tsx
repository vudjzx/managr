import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {LoadingComponent} from '../components/LoadingComponent';
import ProjectForm from '../components/ProjectForm';
import useProjects from '../hooks/useProjects';

export const EditProject = () => {
  const params = useParams();
  const {getProjectDetails, loading, project} = useProjects();
  useEffect(() => {
    if (params.id) {
      void getProjectDetails(params.id);
    }
  }, []);
  if (loading) return <LoadingComponent />;
  return (
    <>
      <h1 className="text-4xl font-bold">Edit: {project.name}</h1>

      <div className="mt-10 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

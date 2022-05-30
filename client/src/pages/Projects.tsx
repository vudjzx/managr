import {ProjectItem} from '../components/ProjectItem';
import useProjects from '../hooks/useProjects';

const Projects = () => {
  const {projects, loading} = useProjects();
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <h1 className="text-4xl font-black">Projects</h1>
      <div className="bg-white shadow rounded-lg mt-10">
        {projects.length > 0 ? (
          projects.map(project => {
            return <ProjectItem key={project._id} project={project} />;
          })
        ) : (
          <p className="text-center text-gray-600 p-5">No projects exist</p>
        )}
      </div>
    </>
  );
};

export default Projects;

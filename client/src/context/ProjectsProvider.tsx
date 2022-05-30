import {AxiosRequestConfig} from 'axios';
import {useState, createContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import {CustomAlertProps} from '../interfaces/CustomAlert';
import {
  IDetailedProject,
  IProject,
  IProjectDetailsResponse,
  IProjectsResponse,
} from '../interfaces/Responses';

export interface IProjectContext {
  projects: any[];
  showAlert(props: CustomAlertProps): void;
  alert: CustomAlertProps;
  createProject: (project: IProject) => Promise<any>;
  getProjectDetails: (id: string) => Promise<any>;
  loading: boolean;
  project: IDetailedProject;
}

export function createDefaultContext(): IProjectContext {
  return {
    projects: [],
    showAlert: (props: CustomAlertProps) => {
      console.log(props);
    },
    alert: {
      message: '',
      error: false,
    },
    createProject: async (project: IProject) => {
      console.log(project);
    },
    getProjectDetails: async (id: string) => {
      console.log(id);
    },
    loading: false,
    project: {
      _id: '',
      name: '',
      description: '',
      deadline: '',
      client: '',
      createdAt: '',
      updatedAt: '',
    },
  };
}

export const ProjectsContext = createContext<IProjectContext>(createDefaultContext());

export const ProjectsProvider: React.FC = ({children}) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [alert, setAlert] = useState<CustomAlertProps>({message: '', error: false});
  const [loading, setLoading] = useState<boolean>(false);
  const [project, setProject] = useState<IDetailedProject>({
    _id: '',
    name: '',
    description: '',
    deadline: '',
    client: '',
    createdAt: '',
    updatedAt: '',
  });

  const navigate = useNavigate();
  const showAlert = (alert: CustomAlertProps) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({message: '', error: false});
    }, 4000);
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const config: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        const {data}: IProjectsResponse = await axiosClient.get('/projects', config);
        setProjects(data.projects);
      } catch (error) {
        console.log(error);
      }
    };
    void getProjects();
  }, []);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const config: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        const {data}: IProjectsResponse = await axiosClient.get('/projects', config);
        setProjects(data.projects);
      } catch (error) {
        console.log(error);
      }
    };
    void getProjects();
  }, [localStorage.getItem('token')]);

  const createProject = async (project: IProject) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.post('/projects', project, config);
      setProjects([...projects, data.storedProject]);
      setAlert({
        message: 'Project created successfully',
        error: false,
      });
      setTimeout(() => {
        setAlert({message: '', error: false});
        navigate('/projects');
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectDetails = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data}: IProjectDetailsResponse = await axiosClient.get(`/projects/${id}`, config);
      setProject(data.project);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <ProjectsContext.Provider
      value={{projects, showAlert, alert, createProject, getProjectDetails, project, loading}}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContext;

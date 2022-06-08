import {AxiosRequestConfig} from 'axios';
import {useState, createContext, useEffect} from 'react';
import axiosClient from '../config/axiosClient';
import {CustomAlertProps} from '../interfaces/CustomAlert';
import {
  createDefaultCollaborator,
  createDefaultContext,
  createDefaultProject,
  createDefaultTask,
  ICollaborator,
  IDetailedProject,
  IProject,
  IProjectContext,
  IProjectDetailsResponse,
  IProjectsResponse,
  ITask,
} from '../interfaces/Responses';

export const ProjectsContext = createContext<IProjectContext>(createDefaultContext());

export const ProjectsProvider: React.FC = ({children}) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [task, setTask] = useState<ITask>(createDefaultTask());
  const [alert, setAlert] = useState<CustomAlertProps>({message: '', error: false});
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [collaborator, setCollaborator] = useState<ICollaborator>(createDefaultCollaborator());
  const [project, setProject] = useState<IDetailedProject>(createDefaultProject());
  const [taskModal, setTaskModal] = useState<boolean>(false);
  const [deleteCollabModal, setDeleteCollabModal] = useState<boolean>(false);
  const [taskLoading, setTaskLoading] = useState<boolean>(false);

  const handleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  const showAlert = (alert: CustomAlertProps) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({message: '', error: false});
    }, 3000);
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
      showAlert({
        message: 'Project created successfully',
        error: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProject = async (project: IProject) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.put(`/projects/${project._id}`, project, config);
      setProjects(projects.map(p => (p._id === project._id ? data.updatedProject : p)));
      showAlert({
        message: 'Project updated successfully',
        error: false,
      });
    } catch (error) {
      showAlert({
        message: 'Something went wrong',
        error: true,
      });
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.delete(`/projects/${id}`, config);
      setProjects(projects.filter(p => p._id !== id));
      showAlert({
        message: data.msg,
        error: false,
      });
    } catch (error) {
      showAlert({
        message: 'Something went wrong',
        error: true,
      });
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
      setAlert({
        message: '',
        error: false,
      });
    } catch (error: any) {
      setProject(createDefaultProject());
      setAlert({
        message: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: ITask) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.post('/tasks', task, config);
      setProject({...project, tasks: [...project.tasks, data.storedTask]});
      setTaskModal(false);
      showAlert({
        message: data.msg,
        error: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskEdit = (task: ITask) => {
    setTask(task);
    setTaskModal(true);
  };

  const editTask = async (task: ITask) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.put(`/tasks/${task._id}`, task, config);
      setProject({
        ...project,
        tasks: project.tasks.map(t => (t._id === task._id ? data : t)),
      });
      showAlert({
        message: 'Task updated successfully',
        error: false,
      });
      setTaskModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCollaborator = (collaborator?: ICollaborator) => {
    if (collaborator) {
      setCollaborator(collaborator);
    }
    setDeleteCollabModal(!deleteCollabModal);
  };
  const handleDeleteModal = (task?: ITask) => {
    if (task) {
      setTask(task);
    }
    setDeleteModal(!deleteModal);
  };

  const deleteTask = async (id: string, type: string, collaboratorId?: string) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      if (type === 'task') {
        const {data} = await axiosClient.delete(`/tasks/${id}`, config);
        setProject({
          ...project,
          tasks: project.tasks.filter(t => t._id !== task._id),
        });
        showAlert({
          message: data.msg,
          error: true,
        });
      } else if (type === 'collaborator' && collaboratorId) {
        const {data} = await axiosClient.post(
          `/projects/delete-collaborator/${id}`,
          {id: collaboratorId},
          config,
        );
        setProject({
          ...project,
          collaborators: project.collaborators.filter(c => c._id !== collaboratorId),
        });
        showAlert({
          message: data.msg,
          error: true,
        });
        setCollaborator(createDefaultCollaborator());
      }
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setDeleteModal(false);
      setDeleteCollabModal(false);
    }
  };

  const searchCollaborator = async (collaborator: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.post(
        `/projects/collaborator`,
        {email: collaborator},
        config,
      );
      setCollaborator(data.user);
    } catch (error: any) {
      showAlert({
        message: error.response.data.msg,
        error: true,
      });
      setCollaborator(createDefaultCollaborator());
    } finally {
      setLoading(false);
    }
  };

  const addCollaborator = async (projectId: string, email: string) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.post(
        `/projects/add-collaborator/${projectId}`,
        {id: email},
        config,
      );
      showAlert({
        message: data.msg,
        error: false,
      });
      setCollaborator(createDefaultCollaborator());
    } catch (error: any) {
      showAlert({
        message: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const changeTaskStatus = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.post(`/tasks/${id}/complete`, {}, config);
      setProject({
        ...project,
        tasks: project.tasks.map(t => (t._id === data._id ? data : t)),
      });
    } catch (error: any) {
      showAlert({
        message: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        updateProject,
        showAlert,
        alert,
        createProject,
        getProjectDetails,
        project,
        loading,
        deleteProject,
        handleTaskModal,
        taskModal,
        addTask,
        task,
        handleTaskEdit,
        editTask,
        setTask,
        handleDeleteModal,
        deleteModal,
        deleteTask,
        searchCollaborator,
        collaborator,
        addCollaborator,
        handleDeleteCollaborator,
        deleteCollabModal,
        changeTaskStatus,
      }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContext;

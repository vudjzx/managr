export interface UserCreatedResponse {
  msg: string;
}

export interface IProject {
  name: string;
  description: string;
  client: string;
  deadline: string;
}

export interface IDetailedProject extends IProject {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectsResponse {
  data: IProjectsData;
}

export interface IProjectDetailsResponse {
  data: ICreatedProjectResponse;
}

export interface IProjectsData {
  msg: string;
  projects: IProject[];
}

export interface ICreatedProjectResponse {
  msg: string;
  project: IDetailedProject;
}

import { TUser } from './../types/UserTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProject } from '../types/Projects';
import { ProjectStatuses } from '../helpers/ProjectStatuses';
import { TEvaluation } from '../types/Evaluations';

interface State {
  users: Array<TUser>;
  projects: Array<TProject>;
  evaluations: Array<TEvaluation>;
}

const initialState: State = {
  users: [
    {
      id: 1,
      name: 'Jan',
      surname: 'Kowalski',
      startDate: '2020-11-10',
      email: 'test@gmail.com',
      password: 'pass',
      role: 'employee',
    },
    {
      id: 2,
      name: 'Andrzej',
      surname: 'Kowalski',
      startDate: '2020-11-10',
      email: 'test2@gmail.com',
      password: 'pass',
      role: 'employee',
    },
    {
      id: 3,
      name: 'Mariusz',
      surname: 'Kowalski',
      startDate: '2020-11-10',
      email: 'test3@gmail.com',
      password: 'pass',
      role: 'admin',
    },
    {
      id: 4,
      name: 'Krzysztof',
      surname: 'Kowalski',
      startDate: '2020-11-10',
      email: 'test4@gmail.com',
      password: 'pass',
      role: 'employee',
    },
    {
      id: 5,
      name: 'Paweł',
      surname: 'Kowalski',
      startDate: '2020-11-10',
      email: 'test5@gmail.com',
      password: 'pass',
      role: 'admin',
    },
  ],
  projects: [
    {
      id: 1,
      img: './project.png',
      startDate: '2020-05-11',
      name: 'Projekt1',
      relevance: 1,
      status: ProjectStatuses.OPEN,
      workers: [1, 3],
    },
    {
      id: 2,
      img: './project.png',
      startDate: '2020-06-11',
      name: 'Projekt2',
      relevance: 3,
      status: ProjectStatuses.OPEN,
      workers: [2, 5, 3],
    },
    {
      id: 3,
      img: './project.png',
      startDate: '2020-07-11',
      name: 'Projekt3',
      relevance: 1,
      status: ProjectStatuses.CLOSED,
      workers: [1, 2, 4],
    },
    {
      id: 4,
      img: './project.png',
      startDate: '2020-08-11',
      name: 'Projekt4',
      relevance: 2,
      status: ProjectStatuses.OPEN,
      workers: [3, 4, 5, 1],
    },
    {
      id: 5,
      img: './project.png',
      startDate: '2020-09-11',
      name: 'Projekt5',
      relevance: 2,
      status: ProjectStatuses.CLOSED,
      workers: [1, 3, 5],
    },
  ],
  evaluations: [
    {
      id: 1,
      workerId: 1,
      projectId: 1,
      execution: 7,
      engagement: 8,
      comment: 'Great work',
    },
    {
      id: 2,
      workerId: 2,
      projectId: 2,
      execution: 4,
      engagement: 6,
      comment: 'Great work',
    },
    {
      id: 3,
      workerId: 1,
      projectId: 3,
      execution: 9,
      engagement: 7,
      comment: 'Great work',
    },
    {
      id: 4,
      workerId: 2,
      projectId: 3,
      execution: 9,
      engagement: 7,
      comment: 'Great work',
    },
    {
      id: 5,
      workerId: 4,
      projectId: 3,
      execution: 9,
      engagement: 7,
      comment: 'Great work',
    },
    {
      id: 6,
      workerId: 4,
      projectId: 4,
      execution: 6,
      engagement: 10,
      comment: 'Great work',
    },
    {
      id: 7,
      workerId: 5,
      projectId: 5,
      execution: 4,
      engagement: 5,
      comment: 'Great work',
    },
    {
      id: 8,
      workerId: 3,
      projectId: 3,
      execution: 7,
      engagement: 2,
      comment: 'Great work',
    },
    {
      id: 9,
      workerId: 3,
      projectId: 2,
      execution: 9,
      engagement: 6,
      comment: 'Great work',
    },
    {
      id: 10,
      workerId: 5,
      projectId: 3,
      execution: 7,
      engagement: 9,
      comment: 'Great work',
    },
    {
      id: 11,
      workerId: 1,
      projectId: 2,
      execution: 4,
      engagement: 7,
      comment: 'Great work',
    },
  ],
};

export const databaseSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    ////////////////////USERS///////////////////
    addUser: (state, action: PayloadAction<TUser>) => {
      state.users = [...state.users, action.payload];
    },
    editUser: (state, action: PayloadAction<TUser>) => {
      const stateUsers = [...state.users];
      const userToEdit = stateUsers.find(
        (user) => user.id === action.payload.id
      );
      if (!userToEdit) return;
      stateUsers[stateUsers.indexOf(userToEdit)] = action.payload;
      state.users = stateUsers;
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      const stateUsers: Array<TUser> = [...state.users];
      const userToDelete: TUser | undefined = stateUsers.find(
        (user) => user.id === action.payload
      );
      console.log(userToDelete);
      if (!userToDelete) return;
      stateUsers.splice(state.users.indexOf(userToDelete), 1);
      state.users = stateUsers;
    },
    ////////////////////PROJECTS///////////////////
    changeProjectStatus: (
      state,
      action: PayloadAction<{ projectId: number; status: string }>
    ) => {
      const stateProjects: Array<TProject> = [...state.projects];
      const projectToUpdate: TProject | undefined = stateProjects.find(
        (project) => project.id === action.payload.projectId
      );
      if (!projectToUpdate) return;
      stateProjects[stateProjects.indexOf(projectToUpdate)].status =
        action.payload.status;
      state.projects = stateProjects;
    },
    addWorkersToProject: (
      state,
      action: PayloadAction<{ projectId: number; workers: Array<number> }>
    ) => {
      console.log('redux: ', action.payload);
      const stateProjects: Array<TProject> = [...state.projects];
      const projectToUpdate: TProject | undefined = stateProjects.find(
        (project) => project.id === action.payload.projectId
      );
      if (!projectToUpdate) return;
      projectToUpdate.workers = [
        ...projectToUpdate.workers,
        ...action.payload.workers,
      ];
    },
    ////////////////////EVALUATIONS///////////////////
    addEvaluation: (state, action: PayloadAction<TEvaluation>) => {
      state.evaluations = [...state.evaluations, action.payload];
    },
  },
});

export const {
  addUser,
  editUser,
  deleteUser,
  changeProjectStatus,
  addWorkersToProject,
  addEvaluation,
} = databaseSlice.actions;
export default databaseSlice.reducer;

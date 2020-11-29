import axios from 'axios';
import { showErrorDialog } from 'boot/logger';
import {
  ADD_TASK_ENDPOINT,
  DELETE_TASK_ENDPOINT,
  EDIT_TASK_ENDPOINT,
  FETCH_TASKS_ENDPOINT,
} from '../../constants/api';

export function fetchTasks({ commit, state }) {
  return axios.get(FETCH_TASKS_ENDPOINT).then(response => {
    if (response?.status === 200) {
      commit("setTasks", response.data);
    } else showErrorDialog("Ошибка получения данных код:" + response?.status);
  });
}
export function addTask({ commit, state }, task) {
  // const payload = {
  //   id: task.id,
  //   blob: task.blob,
  //   name: task.name,
  //   duration: task.duration
  // };

  return axios.post(ADD_TASK_ENDPOINT, task).then(response => {
    if (response?.status === 200) {
      commit("addTask", task);
    } else showErrorDialog("Ошибка сохранения код:" + response?.status);
  });
}

export function deleteTask({ commit, state }, task) {
  const payload = {
    id: task.id
  };

  return axios.post(DELETE_TASK_ENDPOINT, payload).then(response => {
    if (response?.status === 200) {
      commit("deleteTask", task.id);
    } else showErrorDialog("Ошибка удаления код:" + response?.status);
  });
}

export function editTask({ commit, state }, task) {

  return axios.post(EDIT_TASK_ENDPOINT, task).then(response => {
    if (response?.status === 200) {
      commit("editTask", task);
    } else showErrorDialog("Ошибка редактирования, код:" + response?.status);
  });
}
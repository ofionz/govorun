import axios from 'axios';
import { showErrorDialog } from 'boot/logger';
import { FETCH_CALLS_ENDPOINT } from '../../constants/api';

export function fetchCalls({ commit, state }) {
  return axios.get(FETCH_CALLS_ENDPOINT).then(response => {
    if (response?.status === 200) {
      commit("setCalls", response.data);
    } else showErrorDialog("Ошибка получения данных код:" + response?.status);
  });
}
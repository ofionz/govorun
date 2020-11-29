import axios from "axios";
import { showErrorDialog } from "../../boot/logger";
import {
  ADD_AUDIO_ENDPOINT,
  DELETE_AUDIO_ENDPOINT,
  FETCH_AUDIO_ENDPOINT,
  EDIT_AUDIO_ENDPOINT
} from "../../constants/api";

export function addAudio({ commit, state }, audio) {
  const payload = {
    id: audio.id,
    blob: audio.blob,
    name: audio.name,
    duration: audio.duration
  };

  return axios.post(ADD_AUDIO_ENDPOINT, payload).then(response => {
    if (response?.status === 200) {
      commit("addAudio", audio);
    } else showErrorDialog("Ошибка сохранения код:" + response?.status);
  });
}

export function deleteAudio({ commit, state }, audio) {
  const payload = {
    id: audio.id
  };

  return axios.post(DELETE_AUDIO_ENDPOINT, payload).then(response => {
    if (response?.status === 200) {
      commit("deleteAudio", audio.id);
    } else showErrorDialog("Ошибка удаления код:" + response?.status);
  });
}

export function editAudio({ commit, state }, audio) {
  const payload = {
    id: audio.id,
    name: audio.name
  };

  return axios.post(EDIT_AUDIO_ENDPOINT, payload).then(response => {
    if (response?.status === 200) {
      commit("editAudio", audio);
    } else showErrorDialog("Ошибка удаления код:" + response?.status);
  });
}

export function fetchAudio({ commit, state }) {
  return axios.get(FETCH_AUDIO_ENDPOINT).then(response => {
    if (response?.status === 200) {
      commit("setAudios", response.data);
    } else showErrorDialog("Ошибка получения данных код:" + response?.status);
  });
}

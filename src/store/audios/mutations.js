export function addAudio ( state ,n  ) {
  state.audios.push(n)
}
export function deleteAudio ( state ,id  ) {

  const indx =  state.audios.findIndex(
    e => e.id === id
  );
  state.audios.splice(indx, 1);
}
export function setAudios ( state ,n  ) {
  state.audios = n;
}

export function editAudio ( state ,audio  ) {

  const indx =  state.audios.findIndex(
    e => e.id === audio.id
  );


  state.audios.splice(indx, 1, audio);
}
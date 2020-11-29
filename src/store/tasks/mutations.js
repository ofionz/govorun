export function addTask ( state ,n  ) {
state.tasks.push(n)
}
export function setTasks ( state ,n  ) {
  state.tasks = n;
}
export function deleteTask ( state ,id  ) {
  const indx =  state.tasks.findIndex(
    e => e.id === id
  );
  state.tasks.splice(indx, 1);
}

export function editTask( state ,task  ) {
  const indx =  state.tasks.findIndex(
    e => e.id === task.id
  );
  state.tasks.splice(indx, 1, task);
}
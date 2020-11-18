const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "/", redirect: "tasks"},
  { path: "tasks", name: 'tasks' , component: () => import("pages/Tasks.vue") },
      { path: "profile", name: 'profile',  redirect: "tasks" },
  { path: "audios", name: 'audios' , component: () => import("pages/Audios.vue") },
  { path: "start", name: 'start', component: () => import("pages/GettingStarted.vue") },
  ]},
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;

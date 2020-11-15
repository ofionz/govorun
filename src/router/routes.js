const routes = [
  { path: "/", name: 'main' , component: () => import("pages/Main.vue") },
  { path: "/start", name: 'start', component: () => import("pages/GettingStarted.vue") },

  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;

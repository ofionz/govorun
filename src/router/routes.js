const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", redirect: "profile" },
      {
        path: "calls",
        name: "calls",
        component: () => import("pages/Calls.vue")
      },
      {
        path: "tasks",
        name: "tasks",
        component: () => import("pages/Tasks.vue")
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("pages/Profile.vue")
      },
      {
        path: "audios",
        name: "audios",
        component: () => import("pages/Audios.vue")
      },
    ]
  },
  { path: "*", redirect: "profile" },
];

export default routes;

import { createRouter, createWebHistory } from "vue-router";

import SatelliteTracker from "./SatelliteTracker.vue";

export default createRouter({
  history: createWebHistory(document.location.pathname.match(".*/")[0]),
  routes: [
    { path: "/", component: SatelliteTracker },
    { path: "/move.html", component: SatelliteTracker },
    { path: "/ot.html", component: SatelliteTracker },
  ],
});

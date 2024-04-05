import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "x-homepage-el" },
  { path: "/chat", component: "x-chatpage-el" },
  { path: "(.*)", component: "x-homepage-el" },
]);

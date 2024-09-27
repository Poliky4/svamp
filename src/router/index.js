import { createRouter, createWebHistory } from "vue-router"

import Home from "../home/home.vue"
import Quiz from "../quiz/quiz.vue"
import Library from "../library/library.vue"

const base = "/svamp"

export const routes = [
  { path: `${base}/`, label: "Home", component: Home },
  { path: `${base}/quiz`, label: "Quiz", component: Quiz },
  { path: `${base}/library`, label: "Library", component: Library },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

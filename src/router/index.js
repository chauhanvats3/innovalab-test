import { createRouter, createWebHistory } from 'vue-router'
import QuestionA from '../views/QuestionA.vue'
import QuestionB from '../views/QuestionB.vue'
import QuestionC from '../views/QuestionC.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Question-A',
      component: QuestionA
    },
    {
      path: '/question-b',
      name: 'Question-B',
      component: QuestionB
    },
    {
      path: '/question-c',
      name: 'Question-C',
      component: QuestionC
    }
  ]
})

export default router

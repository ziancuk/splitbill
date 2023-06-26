import { createRouter, createWebHistory } from 'vue-router'
import Bill from './components/Bill.vue'
import FormSplit from './components/FormSplit.vue'

const routes = [
    {
        name: 'Bill',
        path: '/bill',
        component: Bill,
        params: {
            otherProp: {
                "a": "b"
            }
        },
        props: (route) => ({
            ...route.params
        })
    },
    {
        path: '/',
        component: FormSplit,
    }
  ]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router
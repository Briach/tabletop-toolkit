import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
// import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import Impressum from '../views/Impressum.vue'

import SimpleTimer from '../views/timers/SimpleTimer.vue'

import CountPoints from '../views/sheets/CountPoints.vue'
import CountWins from '../views/sheets/CountWins.vue'

import LootGenerator from '../views/trpg/LootGenerator.vue'
import AddLoot from '../views/trpg/AddLoot.vue'
import LootList from '../views/trpg/LootList.vue'

import AdminCategory from '../views/trpg/admin/Category.vue'
import AdminSubCategory from '../views/trpg/admin/SubCategory.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: Impressum
  },
  {
    path: "/:catchAll(.*)",
    name: "Error 404",
    component: NotFound,
  },

  {
    path: "/timers/timer",
    name: "Timer",
    component: SimpleTimer,
  },

  {
    path: "/sheets/countpoints",
    name: "Count Points",
    component: CountPoints,
  },
  {
    path: "/sheets/countwins",
    name: "Count Wins",
    component: CountWins,
  },
  {
    path: "/trpg/lootgenerator",
    name: "Loot Generator",
    component: LootGenerator,
  },
  {
    path: "/trpg/addloot",
    name: "AddLoot",
    component: AddLoot,
  },
  {
    path: "/trpg/lootlist",
    name: "LootList",
    component: LootList,
  },

  {
    path: "/trpg/admin/category",
    name: "Admin Category",
    component: AdminCategory,
  },
  {
    path: "/trpg/admin/subcategory",
    name: "Admin SubCategory",
    component: AdminSubCategory,
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

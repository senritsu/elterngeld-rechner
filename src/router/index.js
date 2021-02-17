import Vue from 'vue'
import Router from 'vue-router'
import IncomeOverview from '@/components/IncomeOverview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Income Overview',
      component: IncomeOverview
    }
  ]
})

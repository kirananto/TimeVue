import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'
import DetailsView from './components/Details.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import SettingView from './components/views/Setting.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/details',
    component: DetailsView,
    meta: {requiresAuth: true}
  },
  {
    path: '/',
    component: DashView,
    meta: {requiresAuth: true},
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes

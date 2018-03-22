import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'
import AccessDenied from './components/AccessDenied.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import DetailsView from './components/views/Details.vue'
import ProfileView from './components/views/Profile.vue'
import TimetableView from './components/views/Timetable.vue'
import ViewTimetable from './components/views/ViewTimetable.vue'
import TeachersView from './components/views/Teachers.vue'
import SubjectsView from './components/views/Subjects.vue'
import SubjectListView from './components/views/Subjectlist.vue'
import TeacherTimetable from './components/views/TeacherTimetable.vue'
// import SettingView from './components/views/Setting.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/accessdenied',
    component: AccessDenied
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
      },
      {
        path: 'details',
        component: DetailsView,
        name: 'Details',
        meta: {description: 'Enter Details', details: true}
      },
      {
        path: 'profile',
        component: ProfileView,
        name: 'Profile',
        meta: {description: 'Profile'}
      },
      {
        path: 'subjectlist',
        component: SubjectListView,
        name: 'SubjectList',
        meta: {description: 'Subjects List View'}
      },
      {
        path: 'timetable/:subject',
        component: TimetableView,
        name: 'Timetable',
        meta: {description: 'Timetable'}
      },
      {
        path: 'viewtimetable/:subject',
        component: ViewTimetable,
        name: 'ViewTimetable',
        meta: {description: 'View Timetable'}
      },
      {
        path: 'teachertimetable',
        component: TeacherTimetable,
        name: 'teachertimetable',
        meta: {description: 'View Teachers Timetable'}
      },
      {
        path: 'teachers',
        component: TeachersView,
        name: 'Teachers',
        meta: {description: 'Enter Teacher Details', requireAdmin: true}
      },
      {
        path: 'subjects',
        component: SubjectsView,
        name: 'subjects',
        meta: {description: 'Enter Subjects Details', requireAdmin: true}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes

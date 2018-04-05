const DashView = () => import(/* webpackChunkName: "DashView" */ './components/Dash.vue')
const LoginView = () => import(/* webpackChunkName: "LoginView" */ './components/Login.vue')
const NotFoundView = () => import(/* webpackChunkName: "NotFoundView" */ './components/404.vue')
const AccessDenied = () => import(/* webpackChunkName: "AccessDenied" */ './components/AccessDenied.vue')

const DashboardView = () => import(/* webpackChunkName: "DashboardView" */ './components/views/Dashboard.vue')
const DetailsView = () => import(/* webpackChunkName: "DetailsView" */ './components/views/Details.vue')
const ProfileView = () => import(/* webpackChunkName: "ProfileView" */ './components/views/Profile.vue')
const TimetableView = () => import(/* webpackChunkName: "TimetableView" */ './components/views/Timetable.vue')
const ViewTimetable = () => import(/* webpackChunkName: "ViewTimetable" */ './components/views/ViewTimetable.vue')
const TeachersView = () => import(/* webpackChunkName: "TeachersView" */ './components/views/Teachers.vue')
const SubjectsView = () => import(/* webpackChunkName: "SubjectsView" */ './components/views/Subjects.vue')
const SubjectListView = () => import(/* webpackChunkName: "SubjectListView" */ './components/views/Subjectlist.vue')
const TeacherTimetable = () => import(/* webpackChunkName: "TeacherTimetable" */ './components/views/TeacherTimetable.vue')
const NoNetwork = () => import(/* webpackChunkName: "NoNetwork" */ './components/NoNetwork.vue')
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
    path: '/nonetwork',
    component: NoNetwork
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

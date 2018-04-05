export default {
  user: null,
  currentClass: {
    branch: null,
    semester: null,
    division: null
  },
  branchList: [],
  classList: [],
  divisionList: [],
  notifications: [
    {
      title: 'Welcome to timeVue',
      type: 'alert-success',
      icon: 'fa-check',
      body: 'check it out on github. <a href="https://github.com/kirananto/timeVue" target="_blank"><i class="fa fa-github fa-2x"></i></a>'
    }
  ],
  config: {
    apiKey: 'AIzaSyBAgETRWU9aEjq5giu2Sv9F2l9IlZ__Z9Q',
    authDomain: 'timevuetesting.firebaseapp.com',
    databaseURL: 'https://timevuetesting.firebaseio.com',
    projectId: 'timevuetesting',
    storageBucket: 'timevuetesting.appspot.com',
    messagingSenderId: '520393216136'
  }
}

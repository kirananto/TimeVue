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
    apiKey: 'AIzaSyB1zJLXNuzP8KmKfahOzzKwzCYk57oOaXU',
    authDomain: 'timevue-a3bfb.firebaseapp.com',
    databaseURL: 'https://timevue-a3bfb.firebaseio.com',
    projectId: 'timevue-a3bfb',
    storageBucket: 'timevue-a3bfb.appspot.com',
    messagingSenderId: '1090341141834'
  }
}

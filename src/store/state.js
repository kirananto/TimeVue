export default {
  callingAPI: false,
  searching: '',
  serverURI: 'http://127.0.0.1:8080',
  user: null,
  token: null,
  currentClass: {
    branch: null,
    semester: null,
    division: null
  },
  classes: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
  branches: ['CSE', 'ME', 'CE', 'EEE', 'ECE', 'AEI', 'IT'],
  userInfo: {
    messages: [{1: 'test', 2: 'test'}],
    notifications: [],
    tasks: []
  },
  userData: '',
  config: {
    apiKey: 'AIzaSyDm0aVHDnePLo4yvjIhmLuGrDJC4WOPnqQ',
    authDomain: 'lofo-59afa.firebaseapp.com',
    databaseURL: 'https://lofo-59afa.firebaseio.com',
    projectId: 'lofo-59afa',
    storageBucket: 'lofo-59afa.appspot.com',
    messagingSenderId: '1014292022054'
  }
}

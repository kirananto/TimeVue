export default {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_CLASS_SEM (state, sem) {
    state.currentClass.semester = sem
  },
  TOGGLE_CLASS_DIV (state, div) {
    state.currentClass.division = div
  },
  TOGGLE_CLASS_BRANCH (state, branch) {
    state.currentClass.branch = branch
  },
  SET_USER (state, user) {
    state.user = user
  },
  PUSH_NOTIFICATION (state, notif) {
    state.notifications.push(notif)
  },
  POP_NOTIFICATIONS (state) {
    state.notifications.pop()
  },
  SET_CLASSLIST (state, classList) {
    state.classList = classList
  },
  SET_BRANCHLIST (state, branchList) {
    state.branchList = branchList
  },
  SET_DIVLIST (state, divisionList) {
    state.divisionList = divisionList
  }
}

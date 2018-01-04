export default {
  branchList: state => state.branchList,
  classList: state => state.classList,
  divisionList: state => state.divisionList,
  isCurrentClassSet: state => {
    if (state.currentClass.branch && state.currentClass.semester && state.currentClass.division) {
      return true
    } else {
      return false
    }
  },
  getCurrentClass: state => state.currentClass,
  getNotifications: state => state.notifications,
  getUser: state => state.user
}

export default {
  classList: (state) => {
    return state.classes.classes
  },
  branchList: state => {
    return state.classes.branches
  },
  isCurrentClassSet: state => {
    if (state.currentClass.branch && state.currentClass.semester && state.currentClass.division) {
      return true
    } else {
      return false
    }
  },
  getCurrentClass: state => {
    return state.currentClass
  }
}

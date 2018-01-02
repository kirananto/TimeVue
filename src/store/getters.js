export default {
  classList: state => Object.keys(state.batch_details).sort(),
  branchList: state => {
    // user selected year
    var branches = []
    for (let arr of state.batch_details[state.currentClass.semester]) {
      branches.push(arr.branch)
    }
    return branches
  },
  divisionList: state => {
    var batches = state.batch_details[state.currentClass.semester].filter((obj) => obj.branch === state.currentClass.branch)[0].batches
    var batchLis = []
    for (let arr of batches) {
      batchLis.push(arr.batchName)
    }
    return batchLis
  },
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

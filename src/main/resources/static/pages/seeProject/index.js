onload = () => {
  $('#headerDivB').text('项目详情')

  let projectId = $util.getPageParam('seeProject')
  console.log(projectId, 'projectId')
  fetchProjectInfo(projectId)

  var params = {
    projectId: projectId
  }
}

const fetchProjectInfo = (id) => {
  let params = {
    id: id
  }
  $.ajax({
    url: API_BASE_URL + '/selectProjectInfoById',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      let info = res.data
      console.log(info, 'res')
      $('#projectName').text(info.projectName)
      $('#createTime').text(info.creationDate)
      $('#personInCharge').text(info.createdBy)
      $('#projectDescription').text(info.projectContent)
    }
  })
}
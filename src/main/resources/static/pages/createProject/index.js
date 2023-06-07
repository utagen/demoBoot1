onload = () => {
  $('#headerUsername').text($util.getItem('userInfo')[0].username)
  $('#headerDivB').text('创建项目')
}

const handleCreateProject = () => {
  let params = {
    userId: $util.getItem('userInfo')[0].id,
    createdBy: $util.getItem('userInfo')[0].username,
    lastUpdatedBy: $util.getItem('userInfo')[0].username,
    projectName: $('#projectName').val(),
    projectContent: $('#projectDescribe').val()
  }
  if (!params.projectName) return alert('项目名称不能为空！')
  if (!params.projectContent) return alert('项目描述不能为空！')
  $.ajax({
    url: API_BASE_URL + '/addProjectInfo',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success() {
      alert('创建成功！')
    }
  })
}

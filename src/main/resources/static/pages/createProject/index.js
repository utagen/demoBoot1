onload = () => {
  $('#headerUsername').text($util.getItem('userInfo')[0].username)
  $('#headerDivB').text('创建项目')
//  console.log($util.getItem('userInfo')[0].username, 'userInfo')
}

const handleCreateProject = () => {
  let params = {
    userid: $util.getItem('userInfo')[0].id,
    createdBy: $util.getItem('userInfo')[0].username,
    lastUpdateBy: $util.getItem('userInfo')[0].username,
    projectName: $('#projectName').val(),
    projectContent: $('#projectDescribe').val()
  }
  console.log(params, 'params')
  if (!params.projectName) return alert('项目名称不能为空！')
  if (!params.projectContent) return alert('项目描述不能为空！')
  $.ajax({
    url: API_BASE_URL + '/admin/addProjectInfo',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success() {
      alert('创建成功！')
        location.href = "/pages/questionnaire/index.html"
    }
  })
}

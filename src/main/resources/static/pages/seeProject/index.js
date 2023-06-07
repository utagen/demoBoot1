onload = () => {
  $('#headerDivB').text('项目详情')

  let projectId = $util.getPageParam('seeProject')
  console.log(projectId, 'projectId')
  fetchProjectInfo(projectId)

  var params = {
    projectId: projectId
  }

  $.ajax({
    url: API_BASE_URL + '/selectQuestionnaireByProjectId',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      // console.log(res, 'res')
      // console.log(res.data.length)
      for (let i = 0; i < res.data.length; i++) {
        // console.log("i=" + i)
        // console.log(res.data[i].naireName)
        $('#questionnaire').append(`
                    <tr>
                        <td> ${i+1} </td>
                        <td> ${res.data[i].naireName} </td>
                        <td> ${res.data[i].publishDate} </td>
                        <td>
                            <button type="button" class="btn btn-link" onclick="openQuestionnaire('${res.data[i].id}')">发布</button>
                            <button type="button" class="btn btn-link btn-red" onclick="closeQuestionnaire('${res.data[i].id}')">关闭</button>
                            <button type="button" class="btn btn-link" onclick="answerSheet('${res.data[i].id}')">链接</button>
                            <button type="button" class="btn btn-link btn-red" onclick="statistics('${res.data[i].id}')">统计</button>
                            <button type="button" class="btn btn-link" onclick="update('${res.data[i].id}')">编辑</button>
                        </td>
                    </tr>
                `)
      }
    }
  })
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

const update = (questionnaireId) => {
  $util.setItem('questionnaireId', questionnaireId)
  window.location.href = '../designQuestionnaire/index.html'
}

const openQuestionnaire = (questionnaireId) => {
  var params = {
    id: questionnaireId,
    state: "open",
  }
  $.ajax({
    url: API_BASE_URL + '/updateQuestionnaireState',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      alert('发布成功')
    }
  })
}

const closeQuestionnaire = (questionnaireId) => {
  var params = {
    id: questionnaireId,
    state: "close",
  }
  $.ajax({
    url: API_BASE_URL + '/updateQuestionnaireState',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      alert('关闭成功')
    }
  })
}

const answerSheet = (questionnaireId) => {
  params = {
    id: questionnaireId
  }
  $.ajax({
    url: API_BASE_URL + '/queryQuestionnaireById',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    async: false,
    success(res) {
      if (res.data.state == 'close') {
        alert('问卷未发布')
        return
      }
      window.location.href = '../answerSheet/index.html?questionnaireId=' + questionnaireId
    }
  })
}

const statistics = (questionnaireId) => {
  window.location.href = '../statistics/index.html?questionnaireId=' + questionnaireId
}
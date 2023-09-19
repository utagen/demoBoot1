onload = () => {
    $('#headerDivB').text('项目详情')

    let projectId = $util.getPageParam('seeProject')
    console.log(projectId, 'projectId')
    fetchProjectInfo(projectId)

    var params = {
        projectId: projectId
    }
    $.ajax({
        url: API_BASE_URL + '/admin/queryQuestionnaireByProjectId',
        type: "POST",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json",
        success(res) {
            console.log(res, 'res')
            for (let i = 0; i < res.data.length; i++) {
                $('#questionaire').append(`
                    <tr>
                        <td> ${i+1} </td>
                        <td> ${res.data[i].questionnaireName} </td>
                        <td> ${res.data[i].beginDate} </td>
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
    id : id
  }
  console.log(params, 'params')
  $.ajax({
    url: API_BASE_URL + '/admin/queryProjectList',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      let info = res.data[0]
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
        id: questionnaireId
    }
    $.ajax({
        url: API_BASE_URL + '/admin/queryQuestionnaireById',
        type: "POST",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json",
        async: false,
        success(res) {
            console.log(res, 'res')
            var timestamp=new Date().getTime()
            var date = new Date(res.data.beginDate); //时间对象
            var btime = date.getTime();
            var date = new Date(res.data.endDate); //时间对象
            var etime = date.getTime();
            if (btime > timestamp) {
                alert('未到发布时间')
                return
            }
            else if (etime < timestamp) {
                alert('已过发布时间')
                return
            }
            else if (res.data.state == 'open') {
                alert('问卷已发布')
                return
            }
            else{
            var params = {
                    id: questionnaireId,
                    state: "open",
                }
                $.ajax({
                    url: API_BASE_URL + '/admin/updateQuestionnaireState',
                    type: "POST",
                    data: JSON.stringify(params),
                    dataType: "json",
                    contentType: "application/json",
                    success(res) {
                        alert('发布成功')
                    }
                })
            }
        }
    })
}

const closeQuestionnaire = (questionnaireId) => {
    var params = {
        id: questionnaireId
    }
    $.ajax({
        url: API_BASE_URL + '/admin/queryQuestionnaireById',
        type: "POST",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json",
        async: false,
        success(res) {
            var timestamp=new Date().getTime()
            var date = new Date(res.data.beginDate); //时间对象
            var btime = date.getTime();
            var date = new Date(res.data.endDate); //时间对象
            var etime = date.getTime();
            if (btime > timestamp) {
                alert('未到发布时间')
                return
            }
            else if (etime < timestamp) {
                alert('已过发布时间')
                return
            }
            else if (res.data.state == 'close') {
                alert('问卷未发布')
                return
            }
            else{
            var params = {
                    id: questionnaireId,
                    state: "close",
                }
                $.ajax({
                    url: API_BASE_URL + '/admin/updateQuestionnaireState',
                    type: "POST",
                    data: JSON.stringify(params),
                    dataType: "json",
                    contentType: "application/json",
                    success(res) {
                        alert('关闭成功')
                    }
                })
            }
        }
    })

}

const answerSheet = (questionnaireId) => {
    var params = {
        id: questionnaireId
    }
    $.ajax({
        url: API_BASE_URL + '/admin/queryQuestionnaireById',
        type: "POST",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json",
        async: false,
        success(res) {
            var timestamp=new Date().getTime()
            var date = new Date(res.data.beginDate); //时间对象
            var btime = date.getTime();
            var date = new Date(res.data.endDate); //时间对象
            var etime = date.getTime();
            if (btime > timestamp) {
                alert('未到发布时间')
                return
            }
            else if (etime < timestamp) {
                alert('已过发布时间')
                return
            }
            else{
                params = {
                    id: questionnaireId
                }
                $.ajax({
                    url: API_BASE_URL + '/admin/queryQuestionnaireById',
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
        }
    })
}

const statistics = (questionnaireId) => {
    window.location.href = '../statistic/index.html?questionnaireId=' + questionnaireId
}
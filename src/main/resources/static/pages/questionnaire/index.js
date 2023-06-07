onload = () => {
  $('#headerUsername').text($util.getItem('userInfo')[0].username)
  handleHeaderLoad()
  fetchProjectList()
}

let projectList = []

const fetchProjectList = () => {
  let params = {
    // createdBy: $util.getItem('userInfo')[0].username,
    projectName: $('#projectName').val()
  }
  $.ajax({
    url: API_BASE_URL + '/queryProjectList',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      projectList = res.data
      $('#content').html('')

      res.data.map(thisItem => {
        $('#content').append(`
          <div class="list">
            <div class="list-header">
              <div>${thisItem.projectName}</div>
              <div>
                <button type="button" class="btn btn-link" onclick="onCreateQuestionnaire('${thisItem.id}', '${thisItem.projectName}')">创建问卷</button>
                <button type="button" class="btn btn-link" onclick="onSeeProject('${thisItem.id}')">查看</button>
                <button type="button" class="btn btn-link" onclick="onEditProject('${thisItem.id}')">编辑</button>
                <button type="button" class="btn btn-link" onclick="onDelProject('${thisItem.id}')">删除</button>
              </div>
            </div>
            <div class="list-footer">
              <div>暂无调查问卷或问卷已过期</div>
            </div>
          </div>
        `)
      })
    }
  })
}


const selectProjectListByNameLike = () => {
  let params = {
    // createdBy: $util.getItem('userInfo')[0].username,
    projectName: $('#projectName').val()
  }
  $.ajax({
    url: API_BASE_URL + '/selectProjectListByNameLike',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      projectList = res.data
      $('#content').html('')

      res.data.map(thisItem => {
        $('#content').append(`
          <div class="list">
            <div class="list-header">
              <div>${thisItem.projectName}</div>
              <div>
                <button type="button" class="btn btn-link" onclick="onCreateQuestionnaire('${thisItem.id}', '${thisItem.projectName}')">创建问卷</button>
                <button type="button" class="btn btn-link" onclick="onSeeProject('${thisItem.id}')">查看</button>
                <button type="button" class="btn btn-link" onclick="onEditProject('${thisItem.id}')">编辑</button>
                <button type="button" class="btn btn-link" onclick="onDelProject('${thisItem.id}')">删除</button>
              </div>
            </div>
            <div class="list-footer">
              <div>暂无调查问卷或问卷已过期</div>
            </div>
          </div>
        `)
      })
    }
  })
}

const onCreatePrject = () => {
  location.href = "/pages/createProject/index.html"
}

const onCreateQuestionnaire = (id, name) => {
  $util.setItem('project_id', id)
  $util.setItem('project_name', name)
  location.href = "/pages/createQuestionnaire/index.html"
}

const onSeeProject = (id) => {
  $util.setPageParam('seeProject', id)
  $util.setItem('seeProjectInfo', id)
  location.href = "/pages/seeProject/index.html"
}

const onEditProject = (id) => {
  let project = projectList.filter(thisItem => thisItem.id === id)[0]
  $util.setPageParam('editProject', project)
  location.href = "/pages/editProject/index.html"
}

const onDelProject = (pid) => {
  let state = confirm("确认删除该项目吗？")

  if (state) {
    let params = {
      id:pid
    }
    //alert(JSON.stringify(params))
    $.ajax({
      url: API_BASE_URL + '/deleteProjectById',
      type: "POST",
      data: JSON.stringify(params),
      dataType: "json",
      contentType: "application/json",
      success(res) {

        fetchProjectList()
      }
    })
  }

}

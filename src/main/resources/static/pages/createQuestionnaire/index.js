onload = () => {
  $('#headerUsername').text($util.getItem('userInfo')[0].username)
  $('#headerDivB').text('创建问卷')

  let params = {
      userid: $util.getItem('userInfo')[0].id,
      createdBy: $util.getItem('userInfo')[0].username,
    }

  $.ajax({
      url: API_BASE_URL + '/admin/queryProjectList',
      type: "POST",
      data: JSON.stringify(params),
      dataType: "json",
      contentType: "application/json",
      success(res) {
        projectList = res.data
        $('#content').html('')

        let projectId = $util.getItem('projectId')
        res.data.map(item => {
          if (item.id == projectId) {
              $('#selectProject').append(`
                <option value="0">${item.projectName}</option>
              `)
          }
        })
//        var cnt = 0
//        res.data.map(item => {
//            cnt++
//          $('#selectProject').append(`
//            <option value="${cnt}">${item.projectName}</option>
//          `)
//        })
      }
    })
}

const onCreateTemplate = () => {
    if ($('#selectProject option:selected').text() == '请选择项目') {
        alert('请选择项目')
        return
    }
    $util.setItem('selectProject', $('#selectProject option:selected').text())
    $util.setItem('selectType', $('#selectType option:selected').text())
//    console.log($util.getItem('selectProject'))
//    console.log($('#selectProject option:selected').text())
//    console.log($('#selectType option:selected').text())
    location.href = "/pages/createNewQuestionnaire/index.html"
}

const importHistoryQuestionnaire = () => {
  $('#divider').css('display', 'flex')
  $('#templateB').html('')
  $('#templateB').append(`
    <div class="template-item">
      <div class="item-t">
        <img class="img" src="../../static/images/blank_template.png">
        <div>
          <div class="title">测试</div>
          <div>页面测试数据</div>
        </div>
      </div>
      <div class="item-b">
        <button type="button" class="btn btn-default">导 入</button>
      </div>
    </div>
  `)
}

const surveyTypeTemplate = () => {
  $('#divider').css('display', 'flex')
  $('#templateB').html('')
  $('#templateB').append(`
    <div class="template-item">
      <div class="item-t">
        <img class="img" src="../../static/images/blank_template.png">
        <div>
          <div class="title">创建模板</div>
          <div>题库抽题，限时作答，成绩查询，自动阅卷</div>
        </div>
      </div>
      <div class="item-b">
        <button type="button" class="btn btn-default" onclick="createTemplate()">创 建</button>
      </div>
    </div>
    <div class="template-item">
      <div class="item-t">
        <img class="img" src="../../static/images/blank_template.png">
        <div>
          <div class="title">测试</div>
          <div></div>
        </div>
      </div>
      <div class="item-b">
        <button type="button" class="btn btn-default" onclick="handleEdit()" style="margin-right: 10px;">编 辑</button>
        <button type="button" class="btn btn-default">导 入</button>
      </div>
    </div>
  `)
}

const createTemplate = () => {
  $('#createTemplateModal').modal('show')
}

const handleEdit = () => {
  open('/pages/designQuestionnaire/index.html')
}

onload = () => {
  $('#headerUsername').text($util.getItem('userInfo')[0].username)
  $('#headerDivB').text('创建调查问卷')

  $('#startTime').datetimepicker({
    language: 'zh-CN', // 显示中文
    format: 'yyyy-mm-dd', // 显示格式
    minView: "month", // 设置只显示到月份
    initialDate: new Date(), // 初始化当前日期
    autoclose: true, // 选中自动关闭
    todayBtn: true // 显示今日按钮
  })
  $('#endTime').datetimepicker({
    language: 'zh-CN', // 显示中文
    format: 'yyyy-mm-dd', // 显示格式
    minView: "month", // 设置只显示到月份
    initialDate: new Date(), // 初始化当前日期
    autoclose: true, // 选中自动关闭
    todayBtn: true // 显示今日按钮
  })
}

const handleCreateQusetionnaire = () => {
  let params = {
    userId: $util.getItem('userInfo')[0].id,
    projectId: $util.getItem('projectId'),
    type: $util.getItem('selectType'),
    questionnaireName: $('#surveyName').val(),
    questionnaireContent: $('#surveyDescription').val(),
    // beginDate: $('#startTime').val() && new Date($('#startTime').val()).getTime(),
    // endDate: $('#endTime').val() && new Date($('#endTime').val()).getTime(),
  }
  console.log(params)

  if (!params.questionnaireName) return alert('问卷名称不能为空！')
  if (!params.questionnaireContent) return alert('问卷描述不能为空！')
  // if (!params.beginDate) return alert('开始时间不能为空！')
  // if (!params.endDate) return alert('结束时间不能为空！')

  // if (params.beginDate > params.endDate) return alert('开始时间不能大于结束时间！')

  $.ajax({
    url: API_BASE_URL + '/addQuestionnaire',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      alert('创建成功')
      $util.setItem('questionnaireId', res.data)
      location.href = "/pages/designQuestionnaire/index.html"
    }
  })
}


// onload = () => {
//   $('#headerUsername').text($util.getItem('userInfo').username)
//   $('#headerDivB').text('创建调查问卷')
//
//   $('#startTime').datetimepicker({
//     language: 'zh-CN', // 显示中文
//     format: 'yyyy-mm-dd', // 显示格式
//     minView: "month", // 设置只显示到月份
//     initialDate: new Date(), // 初始化当前日期
//     autoclose: true, // 选中自动关闭
//     todayBtn: true // 显示今日按钮
//   })
//   $('#endTime').datetimepicker({
//     language: 'zh-CN', // 显示中文
//     format: 'yyyy-mm-dd', // 显示格式
//     minView: "month", // 设置只显示到月份
//     initialDate: new Date(), // 初始化当前日期
//     autoclose: true, // 选中自动关闭
//     todayBtn: true // 显示今日按钮
//   })
// }
//
// const handleCreateQusetionnaire = () => {
//   let params = {
//     createdBy: $util.getItem('userInfo').username,
//     lastUpdatedBy: $util.getItem('userInfo').username,
//     projectName: $('#projectName').val(),
//     projectContent: $('#projectDescribe').val()
//   }
//   if (!params.projectName) return alert('项目名称不能为空！')
//   if (!params.projectContent) return alert('项目描述不能为空！')
//   $.ajax({
//     url: API_BASE_URL + '/addProjectInfo',
//     type: "POST",
//     data: JSON.stringify(params),
//     dataType: "json",
//     contentType: "application/json",
//     success() {
//       alert('创建成功！')
//     }
//   })
// }

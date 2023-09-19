onload = () => {
  $('#headerUsername').text($util.getItem('userInfo').username)
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

const create = () => {
  let params = {
      userId: $util.getItem('userInfo')[0].id,
      projectId: $util.getItem('projectId'),
      type: $util.getItem('selectType'),
      questionnaireName: $('#surveyName').val(),
      questionnaireContent: $('#surveyDescription').val(),
      beginDate: $('#startDate').val() && new Date($('#startDate').val()).getTime(),
      endDate: $('#endDate').val() && new Date($('#endDate').val()).getTime(),
  }
  console.log(params)

  if (!params.questionnaireName) return alert('问卷名称不能为空！')
  if (!params.questionnaireContent) return alert('问卷描述不能为空！')
  if (!params.beginDate) return alert('开始时间不能为空！')
  if (!params.endDate) return alert('结束时间不能为空！')

  if (params.beginDate > params.endDate) return alert('开始时间不能大于结束时间！')

  $.ajax({
        url: API_BASE_URL + '/admin/insertQuestionnaire',
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

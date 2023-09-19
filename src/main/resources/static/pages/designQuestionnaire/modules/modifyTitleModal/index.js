const handleConfirmModify = () => {
  $('#modifyTitleModal').modal('hide')
  $('.questionnaire-title > span').text(questionnaireTitle)
  $('.questionnaire-description > span').text(questionnaireDescription)

  let params = {
      id: $util.getItem('questionnaireId'),
      questionnaireName: questionnaireTitle,
      questionnaireContent: questionnaireDescription,
  }

    $.ajax({
        url: API_BASE_URL + '/admin/updateQuestionnaireById',
        type: "POST",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json",
        success(res) {
            alert('修改成功')
        }
    })
}

const onQuestionnaireTitleInput = (e) => {
  questionnaireTitle = e.value
}

const onQuestionnaireDescriptionInput = (e) => {
  questionnaireDescription = e.value
}

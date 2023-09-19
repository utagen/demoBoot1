var questionnaireTitle = '问卷标题'
var questionnaireDescription = '问卷说明'
const problem = []

onload = () => {
    var params = {
        id: $util.getItem('questionnaireId')
    }
    console.log(params)

    $.ajax({
        url: API_BASE_URL + '/admin/queryQuestionnaireById',
        type: "POST",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json",
        success(res) {
            console.log(res)
            questionnaireTitle = res.data.questionnaireName
            questionnaireDescription = res.data.questionnaireContent
            $('.questionnaire-title > span').text(questionnaireTitle)
            $('.questionnaire-description > span').text(questionnaireDescription)
        }
    })

    params = {
        questionnaireId: $util.getItem('questionnaireId')
    }
    $.ajax({
        url: API_BASE_URL + '/admin/queryQuestionByQuestionnaireId',
        type: "POST",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json",
        async: false,
        success(res) {
            console.log(res)
            for (var i = 0; i < res.data.length; i++) {
            option = []
            params = {
                questionId: res.data[i].id
            }
            $.ajax({
                url: API_BASE_URL + '/admin/queryItemByQuestionId',
                type: "POST",
                data: JSON.stringify(params),
                dataType: "json",
                contentType: "application/json",
                async: false,
                success(ans) {
                    console.log(ans)
                    if (res.data[i].type == '5') {
                        var titles = res.data[i].title.split(',')
                        for (var j = 0; j < ans.data.length; j++) {
                            if (j == 0){
                                option.push({chooseTerm: titles[0], fraction: ans.data[j].itemContent})
                            }
                            else{
                                option.push({chooseTerm: titles[1], fraction: ans.data[j].itemContent})
                            }
                        }
                    }
                    else if (res.data[i].type == '4') {
                        var len = res.data[i].title.split(',').length
                        for (var j = 0; j < ans.data.length/len; j++) {
                            option.push({chooseTerm: ans.data[j].itemContent, titlePos: ans.data[j].titlePos})
                        }
                    }
                    else {
                        for (var j = 0; j < ans.data.length; j++) {
                            option.push({chooseTerm: ans.data[j].itemContent, titlePos: ans.data[j].titlePos})
                        }
                    }
                }
            })
            let ele
            switch (res.data[i].type) {
              case '1':
                ele = myHandleAddSingleChoice(res.data[i], option)
                break;
              case '2':
                ele = myHandleAddMultipleChoice(res.data[i], option)
                break;
              case '3':
                ele = myHandleAddFillBlanks(res.data[i], option)
                break;
              case '4':
                ele = myHandleAddMatrix(res.data[i], option)
                break;
              case '5':
                ele = myHandleAddGauge(res.data[i], option)
                break;
              default:
                break;
            }
            $('#problem').append(ele)
            if (res.data[i].type == '4') {
                problem.push({problemName: res.data[i].questionContent, mustAnswer: res.data[i].mustAnswer,
                                option: option, type: res.data[i].type, leftTitle: res.data[i].title})
            }
            else {
                problem.push({problemName: res.data[i].questionContent, mustAnswer: res.data[i].mustAnswer,
                                option: option, type: res.data[i].type})
            }
            }
        }
    })
    console.log(problem)
}

/**
 * 添加问题
 * 
 * @param {*} type 1：单选，2：多选，3：填空，4：矩阵，5：量表
 */
const onAddQuestion = (type) => {
  let ele
  switch (type) {
    case 1:
      ele = handleAddSingleChoice()
      break;
    case 2:
      ele = handleAddMultipleChoice()
      break;
    case 3:
      ele = handleAddFillBlanks()
      break;
    case 4:
      ele = handleAddMatrix()
      break;
    case 5:
      ele = handleAddGauge()
      break;
    default:
      break;
  }
  $('#problem').append(ele)
  problem.push({ problemName: '', mustAnswer: true, option: [{}], type : type })

  $(".question").hover(() => {
    let problemIndex = $('.question:hover').attr('data-problemIndex')
    let ele = `
      <div class="operation">
      <div class="button" onclick="handleMoveUp(${problemIndex})">上移</div>
      <div class="button" onclick="handleMoveDown(${problemIndex})">下移</div>
        <div class="button" onclick="handleEdit(${problemIndex})">编辑</div>
        <div class="button" onclick="handleDelete(${problemIndex})">删除</div>
      </div>
    `
    $('.question:hover').append(ele)
    $(".question:hover").css('border', '1px solid #fdb553')
  }, () => {
    $('.question > .operation').remove()
    $(".question").css('border', '1px solid #ffffff')
  })
}

const onInput = (problemIndex, optionIndex, key) => {
  if (optionIndex || optionIndex === 0)
    problem[problemIndex].option[optionIndex][key] = $(`#question${problemIndex} #optionItem${optionIndex} #${key}`)[0].value
  else
    problem[problemIndex][key] = $(`#question${problemIndex} #${key}`)[0].value
}

const onMustAnswerClick = (problemIndex) => {
  problem[problemIndex].mustAnswer = !problem[problemIndex].mustAnswer
  if (problem[problemIndex].mustAnswer) $(`#question${problemIndex} #mustAnswer`).text('必答题')
  else $(`#question${problemIndex} #mustAnswer`).text('非必答题')
}

const cancelEdit = (problemIndex) => {
  $(`#question${problemIndex} .bottom`).css('display', 'none')
  $(`#question${problemIndex} .bottom2`).css('display', 'block')
}

const handleMoveUp = (problemIndex) => {
  if (problemIndex === 0) return
  $(`#question${problemIndex - 1}`).before($(`#question${problemIndex}`))
  let i = problem[problemIndex]
  problem[problemIndex] = problem[problemIndex - 1]
  problem[problemIndex - 1] = i
  moveCommon()
}

const handleMoveDown = (problemIndex) => {
  if (problemIndex === problem.length - 1) return
  $(`#question${problemIndex + 1}`).after($(`#question${problemIndex}`))
  let i = problem[problemIndex]
  problem[problemIndex] = problem[problemIndex + 1]
  problem[problemIndex + 1] = i
  moveCommon()
}

const moveCommon = () => {
  $('.question').map((index, item) => {
    item.setAttribute('id', `question${index}`)
    item.setAttribute('data-problemIndex', index)
    let type = +$(`#question${index}`).attr('data-type')
    let value;
    value = $(`#question${index} #problemName`).attr('oninput').replace(/\(\d+,/g, `(${index},`)
    $(`#question${index} #problemName`).attr('oninput', value)
    $(`#question${index} #mustAnswer`).attr('onclick', `onMustAnswerClick(${index})`)
    $(`#question${index} #cancelEdit`).attr('onclick', `cancelEdit(${index})`)
    switch (type) {
      case 1:
        $(`#question${index} #chooseTerm`).map(((chooseTermIndex, chooseTermItem) => {
          chooseTermItem.oninput = onInput.bind(this, index, chooseTermIndex, 'chooseTerm')
        }))
        $(`#question${index} .option-del`).map(((delIndex, delItem) => {
          delItem.oninput = onInput.bind(this, index, delIndex, 'chooseTerm')
        }))
        $(`#question${index} .btn-add-option`).attr('onclick', `singleChoiceAddOption(${index})`)
        $(`#question${index} #editFinish`).attr('onclick', `singleChoiceEditFinish(${index})`)
        break;
      case 2:
        $(`#question${index} #chooseTerm`).map(((chooseTermIndex, chooseTermItem) => {
          chooseTermItem.oninput = onInput.bind(this, index, chooseTermIndex, 'chooseTerm')
        }))
        $(`#question${index} .option-del`).map(((delIndex, delItem) => {
          delItem.oninput = onInput.bind(this, index, delIndex, 'chooseTerm')
        }))
        $(`#question${index} .btn-add-option`).attr('onclick', `multipleChoiceAddOption(${index})`)
        $(`#question${index} #editFinish`).attr('onclick', `multipleChoiceEditFinish(${index})`)
        break;
      case 3:
        $(`#question${index} #editFinish`).attr('onclick', `fillBlanksEditFinish(${index})`)
        break;
      case 4:
        $(`#question${index} #chooseTerm`).map(((chooseTermIndex, chooseTermItem) => {
          chooseTermItem.oninput = onInput.bind(this, index, chooseTermIndex, 'chooseTerm')
        }))
        $(`#question${index} .option-del`).map(((delIndex, delItem) => {
          delItem.oninput = onInput.bind(this, index, delIndex, 'chooseTerm')
        }))
        value = $(`#question${index} #leftTitle`).attr('oninput').replace(/\(\d+,/g, `(${index},`)
        $(`#question${index} #leftTitle`).attr('oninput', value)
        $(`#question${index} .btn-add-option`).attr('onclick', `matrixAddOption(${index})`)
        $(`#question${index} #editFinish`).attr('onclick', `matrixEditFinish(${index})`)
        break;
      case 5:
        $(`#question${index} #chooseTerm`).map(((chooseTermIndex, chooseTermItem) => {
          chooseTermItem.oninput = onInput.bind(this, index, chooseTermIndex, 'chooseTerm')
        }))
        $(`#question${index} #fraction`).map(((fractionIndex, fractionItem) => {
          fractionItem.oninput = onInput.bind(this, index, fractionIndex, 'chooseTerm')
        }))
        $(`#question${index} .option-del`).map(((delIndex, delItem) => {
          delItem.oninput = onInput.bind(this, index, delIndex, 'chooseTerm')
        }))
        $(`#question${index} .btn-add-option`).attr('onclick', `gaugeAddOption(${index})`)
        $(`#question${index} #editFinish`).attr('onclick', `gaugeEditFinish(${index})`)
        break;
      default:
        break;
    }
  })
}

const handleEdit = (problemIndex) => {
  $(`#question${problemIndex} .bottom`).css('display', 'block')
  $(`#question${problemIndex} .bottom2`).css('display', 'none')
}

const handleDelete = (problemIndex) => {
  $(`#question${problemIndex}`).remove()
  problem.splice(problemIndex, 1)
}

const myHandleAddSingleChoice = (res, option) => {
    console.log(res)
  let ele = `
    <div class="question" id="question${res.pos}" data-type="1" data-problemIndex="${res.pos}">
      <div class="top">
        <span class="question-title" id="questionTitle">${res.questionContent}</span>
        <span class="must-answer" id="mustAnswer" onclick="onMustAnswerClick(${res.pos})">必答题</span>
      </div>
      <div class="bottom">
        <textarea class="form-control textarea" id="problemName" placeholder="单选题目" rows="4" oninput="onInput(${res.pos}, ${undefined}, 'problemName') ">${res.questionContent}</textarea>
        <div class="option" id="option">
          `
  for (let i = 0; i < option.length; i++) {
    ele += `
             <div class="option-item" id="optionItem${i}">
                  <input type="text" class="form-control" id="chooseTerm" placeholder="选项【单选】" oninput="onInput(${res.pos}, ${i}, 'chooseTerm')" value="${option[i].chooseTerm}"/>
                  <span class="option-del" onclick="singleChoiceDelOption(${res.pos}, ${i})">删除</span>
                </div>
          `
  }
  ele += `
        </div>
        <div>
          <button type="button" class="btn btn-link btn-add-option" onclick="singleChoiceAddOption(${res.pos})">添加选项</button>
        </div>
        <div class="btn-group">
          <button type="button" id="cancelEdit" class="btn btn-default" onclick="cancelEdit(${res.pos})">取消编辑</button>
          <button type="button" id="editFinish" class="btn btn-default" onclick="singleChoiceEditFinish(${res.pos})">完成编辑</button>
        </div>
      </div>
      <div class="bottom2" style="display: none;">

      </div>
    </div>
  `
  return ele
}

const handleAddSingleChoice = () => {
  let ele = `
    <div class="question" id="question${problem.length}" data-type="1" data-problemIndex="${problem.length}">
      <div class="top">
        <span class="question-title" id="questionTitle">1.请编辑问题？</span>
        <span class="must-answer" id="mustAnswer" onclick="onMustAnswerClick(${problem.length})">必答题</span>
      </div>
      <div class="bottom">
        <textarea class="form-control textarea" id="problemName" placeholder="单选题目" rows="4" oninput="onInput(${problem.length}, ${undefined}, 'problemName')"></textarea>
        <div class="option" id="option">
          <div class="option-item" id="optionItem0">
            <input type="text" class="form-control" id="chooseTerm" placeholder="选项【单选】" oninput="onInput(${problem.length}, 0, 'chooseTerm')" />
            <span class="option-del" onclick="singleChoiceDelOption(${problem.length}, 0)">删除</span>
          </div>
        </div>
        <div>
          <button type="button" class="btn btn-link btn-add-option" onclick="singleChoiceAddOption(${problem.length})">添加选项</button>
        </div>
        <div class="btn-group">
          <button type="button" id="cancelEdit" class="btn btn-default" onclick="cancelEdit(${problem.length})">取消编辑</button>
          <button type="button" id="editFinish" class="btn btn-default" onclick="singleChoiceEditFinish(${problem.length})">完成编辑</button>
        </div>
      </div>
      <div class="bottom2" style="display: none;">
        
      </div>
    </div>
  `
  return ele
}

const singleChoiceAddOption = (problemIndex) => {
  $(`#question${problemIndex} #option`).append(`
    <div class="option-item" id="optionItem${problem[problemIndex].option.length}">
      <input type="text" class="form-control" id="chooseTerm" placeholder="选项【单选】" oninput="onInput(${problemIndex}, ${problem[problemIndex].option.length}, 'chooseTerm')" />
      <span class="option-del" onclick="singleChoiceDelOption(${problemIndex}, ${problem[problemIndex].option.length})">删除</span>
    </div>
  `)
  problem[problemIndex].option.push({})
}

const singleChoiceDelOption = (problemIndex, optionIndex) => {
  $(`#question${problemIndex} .option-item`)[optionIndex].remove()
  problem[problemIndex].option.splice(optionIndex, 1)
  $(`#question${problemIndex} .option-del`).map((item, index) => {
    index.onclick = singleChoiceDelOption.bind(this, problemIndex, item)
  })
}

const singleChoiceEditFinish = (problemIndex) => {
  $(`#question${problemIndex} .bottom`).css('display', 'none')
  $(`#question${problemIndex} .bottom2`).css('display', 'inline')
  $(`#question${problemIndex} #questionTitle`).text(`${problemIndex + 1}.${problem[problemIndex].problemName}`)
  $(`#question${problemIndex} .bottom2`).html('')
  problem[problemIndex].option.map(item => {
    $(`#question${problemIndex} .bottom2`).append(`
      <div style="display: flex; align-items: center;">
        <label class="radio-inline">
          <input type="radio">${item.chooseTerm ? item.chooseTerm : ''}
        </label>
      </div>
    `)
  })
}

const myHandleAddMultipleChoice = (res, option) => {
console.log(res)
  let ele = `
    <div class="question" id="question${res.pos}" data-type="1" data-problemIndex="${res.pos}">
      <div class="top">
        <span class="question-title" id="questionTitle">${res.questionContent}</span>
        <span class="must-answer" id="mustAnswer" onclick="onMustAnswerClick(${res.pos})">必答题</span>
      </div>
      <div class="bottom">
        <textarea class="form-control textarea" id="problemName" placeholder="多选题目" rows="4" oninput="onInput(${res.pos}, ${undefined}, 'problemName') ">${res.questionContent}</textarea>
        <div class="option" id="option">
          `
  for (let i = 0; i < option.length; i++) {
    ele += `
             <div class="option-item" id="optionItem${i}">
                  <input type="text" class="form-control" id="chooseTerm" placeholder="选项【多选】" oninput="onInput(${res.pos}, ${i}, 'chooseTerm')" value="${option[i].chooseTerm}"/>
                  <span class="option-del" onclick="singleChoiceDelOption(${res.pos}, ${i})">删除</span>
                </div>
          `
  }
  ele += `
        </div>
        <div>
          <button type="button" class="btn btn-link btn-add-option" onClick="multipleChoiceAddOption(${res.pos})">添加选项</button>
        </div>
        <div class="btn-group">
          <button type="button" id="cancelEdit" class="btn btn-default" onclick="cancelEdit(${res.pos})">取消编辑</button>
          <button type="button" id="editFinish" class="btn btn-default" onClick="multipleChoiceEditFinish(${res.pos})">完成编辑</button>
        </div>
      </div>
      <div class="bottom2" style="display: none;">

      </div>
    </div>
  `
  return ele
}

const handleAddMultipleChoice = () => {
  let ele = `
    <div class="question" id="question${problem.length}" data-type="2" data-problemIndex="${problem.length}">
      <div class="top">
        <span class="question-title" id="questionTitle">1.请编辑问题？</span>
        <span class="must-answer" id="mustAnswer" onclick="onMustAnswerClick(${problem.length})">必答题</span>
      </div>
      <div class="bottom">
        <textarea class="form-control textarea" id="problemName" placeholder="多选题目" rows="4" oninput="onInput(${problem.length}, ${undefined}, 'problemName')"></textarea>
        <div class="option" id="option">
          <div class="option-item" id="optionItem0">
            <input type="text" class="form-control" id="chooseTerm" placeholder="选项【多选】" oninput="onInput(${problem.length}, 0, 'chooseTerm')" />
            <span class="option-del" onclick="multipleChoiceDelOption(${problem.length}, 0)">删除</span>
          </div>
        </div>
        <div>
          <button type="button" class="btn btn-link btn-add-option" onClick="multipleChoiceAddOption(${problem.length})">添加选项</button>
        </div>
        <div class="btn-group">
          <button type="button" id="cancelEdit" class="btn btn-default" onclick="cancelEdit(${problem.length})">取消编辑</button>
          <button type="button" id="editFinish" class="btn btn-default" onClick="multipleChoiceEditFinish(${problem.length})">完成编辑</button>
        </div>
      </div>
      <div class="bottom2" style="display: none;">
        
      </div>
    </div>
  `
  return ele
}

const multipleChoiceAddOption = (problemIndex) => {
  $(`#question${problemIndex} #option`).append(`
    <div class="option-item" id="optionItem${problem[problemIndex].option.length}">
      <input type="text" class="form-control" id="chooseTerm" placeholder="选项【多选】" oninput="onInput(${problemIndex}, ${problem[problemIndex].option.length}, 'chooseTerm')" />
      <span class="option-del" onclick="multipleChoiceDelOption(${problemIndex}, ${problem[problemIndex].option.length})">删除</span>
    </div>
  `)
  problem[problemIndex].option.push({})
}

const multipleChoiceDelOption = (problemIndex, optionIndex) => {
  $(`#question${problemIndex} .option-item`)[optionIndex].remove()
  problem[problemIndex].option.splice(optionIndex, 1)
  $(`#question${problemIndex} .option-del`).map((item, index) => {
    index.onclick = multipleChoiceDelOption.bind(this, problemIndex, item)
  })
}

const multipleChoiceEditFinish = (problemIndex) => {
  $(`#question${problemIndex} .bottom`).css('display', 'none')
  $(`#question${problemIndex} .bottom2`).css('display', 'inline')
  $(`#question${problemIndex} #questionTitle`).text(`${problemIndex + 1}.${problem[problemIndex].problemName}`)
  $(`#question${problemIndex} .bottom2`).html('')
  problem[problemIndex].option.map(item => {
    $(`#question${problemIndex} .bottom2`).append(`
      <div style="display: flex; align-items: center;">
        <label class="checkbox-inline">
          <input type="checkbox">${item.chooseTerm ? item.chooseTerm : ''}
        </label>
      </div>
    `)
  })
}

const myHandleAddFillBlanks = (res, option) => {
    let ele = `
      <div class="question" id="question${res.pos}" data-type="3" data-problemIndex="${res.pos}">
        <div class="top">
          <span class="question-title" id="questionTitle">${res.questionContent}</span>
          <span class="must-answer" id="mustAnswer" onclick="onMustAnswerClick(${res.pos})">必答题</span>
        </div>
        <div class="bottom">
          <textarea class="form-control textarea" id="problemName" placeholder="请输入题目" rows="4" oninput="onInput(${res.pos}, ${undefined}, 'problemName')">${res.questionContent}</textarea>
          <div class="btn-group">
            <button type="button" id="cancelEdit" class="btn btn-default" onclick="cancelEdit(${res.pos})">取消编辑</button>
            <button type="button" id="editFinish" class="btn btn-default" onClick="fillBlanksEditFinish(${res.pos})">完成编辑</button>
          </div>
        </div>
        <div class="bottom2" style="display: none;">

        </div>
      </div>
    `
    return ele
}

const handleAddFillBlanks = () => {
  let ele = `
    <div class="question" id="question${problem.length}" data-type="3" data-problemIndex="${problem.length}">
      <div class="top">
        <span class="question-title" id="questionTitle">1.请编辑问题？</span>
        <span class="must-answer" id="mustAnswer" onclick="onMustAnswerClick(${problem.length})">必答题</span>
      </div>
      <div class="bottom">
        <textarea class="form-control textarea" id="problemName" placeholder="请输入题目" rows="4" oninput="onInput(${problem.length}, ${undefined}, 'problemName')"></textarea>
        <div class="btn-group">
          <button type="button" id="cancelEdit" class="btn btn-default" onclick="cancelEdit(${problem.length})">取消编辑</button>
          <button type="button" id="editFinish" class="btn btn-default" onClick="fillBlanksEditFinish(${problem.length})">完成编辑</button>
        </div>
      </div>
      <div class="bottom2" style="display: none;">
        
      </div>
    </div>
  `
  return ele
}

const fillBlanksEditFinish = (problemIndex) => {
  $(`#question${problemIndex} .bottom`).css('display', 'none')
  $(`#question${problemIndex} .bottom2`).css('display', 'inline')
  $(`#question${problemIndex} #questionTitle`).text(`${problemIndex + 1}.${problem[problemIndex].problemName}`)
  $(`#question${problemIndex} .bottom2`).html(`
    <div style="border: 1px solid #CCCCCC; width: 50%; height: 70px;"></div>
  `)
}

const myHandleAddMatrix = (res, option) => {
  let ele = `
    <div class="question" id="question${res.pos}" data-type="4" data-problemIndex="${res.pos}">
      <div class="top">
        <span class="question-title" id="questionTitle">${res.questionContent}</span>
        <span class="must-answer" id="mustAnswer" onclick="onMustAnswerClick(${res.pos})">必答题</span>
      </div>
      <div class="bottom">
        <textarea class="form-control textarea" id="problemName" placeholder="请编辑问题！" rows="4" oninput="onInput(${res.pos}, ${undefined}, 'problemName')">${res.questionContent}</textarea>
        <div style="margin-bottom: 10px;">左标题</div>
        <textarea class="form-control textarea" id="leftTitle" placeholder="例子：CCTV1,CCTV2,CCTV3" rows="4" oninput="onInput(${res.pos}, ${undefined}, 'leftTitle')">${res.title}</textarea>
        <div class="option" id="option">
        `
//    let len = res.title.split(',').length
    for (let i = 0; i < option.length; i++) {
        ele += `
          <div class="option-item" id="optionItem${i}">
            <input type="text" class="form-control" id="chooseTerm" placeholder="选项" oninput="onInput(${res.pos}, ${i}, 'chooseTerm')" value="${option[i].chooseTerm}"/>
            <span class="option-del" onclick="matrixDelOption(${res.pos}, ${i})">删除</span>
          </div>
        `
    }
      ele += `
        </div>
        <div>
          <button type="button" class="btn btn-link btn-add-option" onClick="matrixAddOption(${res.pos})">添加选项</button>
        </div>
        <div class="btn-group">
          <button type="button" id="cancelEdit" class="btn btn-default" onclick="cancelEdit(${res.pos})">取消编辑</button>
          <button type="button" id="editFinish" class="btn btn-default" onClick="matrixEditFinish(${res.pos})">完成编辑</button>
        </div>
      </div>
      <div class="bottom2" style="display: none; padding-left: 80px;"></div>
    </div>
  `
  return ele
}

const handleAddMatrix = () => {
  let ele = `
    <div class="question" id="question${problem.length}" data-type="4" data-problemIndex="${problem.length}">
      <div class="top">
        <span class="question-title" id="questionTitle">1.请编辑问题？</span>
        <span class="must-answer" id="mustAnswer" onclick="onMustAnswerClick(${problem.length})">必答题</span>
      </div>
      <div class="bottom">
        <textarea class="form-control textarea" id="problemName" placeholder="请编辑问题！" rows="4" oninput="onInput(${problem.length}, ${undefined}, 'problemName')"></textarea>
        <div style="margin-bottom: 10px;">左标题</div>
        <textarea class="form-control textarea" id="leftTitle" placeholder="例子：CCTV1,CCTV2,CCTV3" rows="4" oninput="onInput(${problem.length}, ${undefined}, 'leftTitle')"></textarea>
        <div class="option" id="option">
          <div class="option-item" id="optionItem0">
            <input type="text" class="form-control" id="chooseTerm" placeholder="选项" oninput="onInput(${problem.length}, 0, 'chooseTerm')" />
            <span class="option-del" onclick="matrixDelOption(${problem.length}, 0)">删除</span>
          </div>
        </div>
        <div>
          <button type="button" class="btn btn-link btn-add-option" onClick="matrixAddOption(${problem.length})">添加选项</button>
        </div>
        <div class="btn-group">
          <button type="button" id="cancelEdit" class="btn btn-default" onclick="cancelEdit(${problem.length})">取消编辑</button>
          <button type="button" id="editFinish" class="btn btn-default" onClick="matrixEditFinish(${problem.length})">完成编辑</button>
        </div>
      </div>
      <div class="bottom2" style="display: none; padding-left: 80px;"></div>
    </div>
  `
  return ele
}

const matrixAddOption = (problemIndex) => {
  $(`#question${problemIndex} #option`).append(`
    <div class="option-item" id="optionItem${problem[problemIndex].option.length}">
      <input type="text" class="form-control" id="chooseTerm" placeholder="选项" oninput="onInput(${problemIndex}, ${problem[problemIndex].option.length}, 'chooseTerm')" />
      <span class="option-del" onclick="matrixDelOption(${problemIndex}, ${problem[problemIndex].option.length})">删除</span>
    </div>
  `)
  problem[problemIndex].option.push({})
}

const matrixDelOption = (problemIndex, optionIndex) => {
  $(`#question${problemIndex} .option-item`)[optionIndex].remove()
  problem[problemIndex].option.splice(optionIndex, 1)
  $(`#question${problemIndex} .option-del`).map((item, index) => {
    index.onclick = matrixDelOption.bind(this, problemIndex, item)
  })
}

const matrixEditFinish = (problemIndex) => {
  $(`#question${problemIndex} .bottom`).css('display', 'none')
  $(`#question${problemIndex} .bottom2`).css('display', 'inline')
  $(`#question${problemIndex} #questionTitle`).text(`${problemIndex + 1}.${problem[problemIndex].problemName}`)
  $(`#question${problemIndex} .bottom2`).html('')
  let trs = problem[problemIndex].leftTitle ? problem[problemIndex].leftTitle.split(',') : []
  $(`#question${problemIndex} .bottom2`).append(`
    <table class="table">
      <thead>
        <tr>
          <th></th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  `)
  trs.map((item, index) => {
    $(`#question${problemIndex} .bottom2 tbody`).append(`
      <tr class="tr${index}">
        <td>${item}</td>
      </tr>
    `)
    problem[problemIndex].option.map(() => {
      $(`#question${problemIndex} .bottom2 tbody .tr${index}`).append(`
        <td>
          <input type="radio" name="radio${index}">
        </td>
      `)
    })
  })
  problem[problemIndex].option.map(item => {
    $(`#question${problemIndex} .bottom2 thead tr`).append(`
      <th>${item.chooseTerm}</th>
    `)
  })
  
}

const myHandleAddGauge = (res, option) => {
    let ele = `
        <div class="question" id="question${res.pos}" data-type="5" data-problemIndex="${res.pos}">
          <div class="top">
            <span class="question-title" id="questionTitle">${res.questionContent}</span>
            <span class="must-answer" id="mustAnswer" onclick="onMustAnswerClick(${res.pos})">必答题</span>
          </div>
          <div class="bottom">
            <textarea class="form-control textarea" id="problemName" placeholder="请编辑问题！" rows="4" oninput="onInput(${res.pos}, ${undefined}, 'problemName')">${res.questionContent}</textarea>
            <div class="option" id="option">
              <div style="display: flex; margin-bottom: 10px;">
                <div style="width: calc(50% + 90px)">选项文字</div>
                <div style="width: 140px;">分数</div>
                <div>操作</div>
              </div>
              `
        var titles = res.title.split(',')
        console.log(titles, "titles")
        ele += `
                      <div class="option-item" id="optionItem0">
                        <input type="text" class="form-control" id="chooseTerm" oninput="onInput(${res.pos}, 0, 'chooseTerm')" value="${titles[0]}"/>
                        <input type="text" class="form-control" id="fraction" oninput="onInput(${res.pos}, 0, 'fraction')" style="width: 50px;" value="${option[0].fraction}"/>
                        <span class="option-del" onclick="gaugeDelOption(${res.pos}, 0)">删除</span>
                      </div>
                    `
        for (let i = 1; i < option.length-1; i++) {
            ele += `
              <div class="option-item" id="optionItem${i}">
                <input type="text" class="form-control" id="chooseTerm" oninput="onInput(${res.pos}, ${i}, 'chooseTerm')" value="${titles[i]}"/>
                <input type="text" class="form-control" id="fraction" oninput="onInput(${res.pos}, ${i}, 'fraction')" style="width: 50px;" value="${option[i].fraction}"/>
                <span class="option-del" onclick="gaugeDelOption(${res.pos}, ${i})">删除</span>
              </div>
            `
        }
        ele += `
          <div class="option-item" id="optionItem${option.length-1}">
            <input type="text" class="form-control" id="chooseTerm" oninput="onInput(${res.pos}, ${option.length-1}, 'chooseTerm')" value="${titles[1]}"/>
            <input type="text" class="form-control" id="fraction" oninput="onInput(${res.pos}, ${option.length-1}, 'fraction')" style="width: 50px;" value="${option[option.length-1].fraction}"/>
            <span class="option-del" onclick="gaugeDelOption(${res.pos}, ${option.length-1})">删除</span>
          </div>
        `
        ele += `
            </div>
            <div>
              <button type="button" class="btn btn-link btn-add-option" onClick="gaugeAddOption(${res.pos})">添加选项</button>
            </div>
            <div class="btn-group">
              <button type="button" id="cancelEdit" class="btn btn-default" onclick="cancelEdit(${res.pos})">取消编辑</button>
              <button type="button" id="editFinish" class="btn btn-default" onClick="gaugeEditFinish(${res.pos})">完成编辑</button>
            </div>
          </div>
          <div class="bottom2" style="display: none; align-items: center; justify-content: space-between;"></div>
        </div>
      `
      return ele
}

const handleAddGauge = () => {
  let ele = `
    <div class="question" id="question${problem.length}" data-type="5" data-problemIndex="${problem.length}">
      <div class="top">
        <span class="question-title" id="questionTitle">1.请编辑问题？</span>
        <span class="must-answer" id="mustAnswer" onclick="onMustAnswerClick(${problem.length})">必答题</span>
      </div>
      <div class="bottom">
        <textarea class="form-control textarea" id="problemName" placeholder="请编辑问题！" rows="4" oninput="onInput(${problem.length}, ${undefined}, 'problemName')"></textarea>
        <div class="option" id="option">
          <div style="display: flex; margin-bottom: 10px;">
            <div style="width: calc(50% + 90px)">选项文字</div>
            <div style="width: 140px;">分数</div>
            <div>操作</div>
          </div>
          <div class="option-item" id="optionItem0">
            <input type="text" class="form-control" id="chooseTerm" oninput="onInput(${problem.length}, 0, 'chooseTerm')" />
            <input type="text" class="form-control" id="fraction" oninput="onInput(${problem.length}, 0, 'fraction')" style="width: 50px;" />
            <span class="option-del" onclick="gaugeDelOption(${problem.length}, 0)">删除</span>
          </div>
        </div>
        <div>
          <button type="button" class="btn btn-link btn-add-option" onClick="gaugeAddOption(${problem.length})">添加选项</button>
        </div>
        <div class="btn-group">
          <button type="button" id="cancelEdit" class="btn btn-default" onclick="cancelEdit(${problem.length})">取消编辑</button>
          <button type="button" id="editFinish" class="btn btn-default" onClick="gaugeEditFinish(${problem.length})">完成编辑</button>
        </div>
      </div>
      <div class="bottom2" style="display: none; align-items: center; justify-content: space-between;"></div>
    </div>
  `
  return ele
}

const gaugeAddOption = (problemIndex) => {
  $(`#question${problemIndex} #option`).append(`
    <div class="option-item" id="optionItem${problem[problemIndex].option.length}">
      <input type="text" class="form-control" id="chooseTerm" oninput="onInput(${problemIndex}, ${problem[problemIndex].option.length}, 'chooseTerm')" />
      <input type="text" class="form-control" id="fraction" oninput="onInput(${problemIndex}, ${problem[problemIndex].option.length}, 'fraction')" style="width: 50px;" />
      <span class="option-del" onclick="gaugeDelOption(${problemIndex}, ${problem[problemIndex].option.length})">删除</span>
    </div>
  `)
  problem[problemIndex].option.push({})
}

const gaugeDelOption = (problemIndex, optionIndex) => {
  $(`#question${problemIndex} .option-item`)[optionIndex].remove()
  problem[problemIndex].option.splice(optionIndex, 1)
  $(`#question${problemIndex} .option-del`).map((item, index) => {
    index.onclick = gaugeDelOption.bind(this, problemIndex, item)
  })
}

const gaugeEditFinish = (problemIndex) => {
  $(`#question${problemIndex} .bottom`).css('display', 'none')
  $(`#question${problemIndex} .bottom2`).css('display', 'flex')
  $(`#question${problemIndex} #questionTitle`).text(`${problemIndex + 1}.${problem[problemIndex].problemName}`)
  $(`#question${problemIndex} .bottom2`).html('')
  $(`#question${problemIndex} .bottom2`).append(`
    <div>${problem[problemIndex].option[0].chooseTerm}</div>
  `)
  problem[problemIndex].option.map(item => {
    $(`#question${problemIndex} .bottom2`).append(`
      <div>
        <label class="radio-inline">
          <input type="radio" name="fraction" />${item.fraction}
        </label>
      </div>
    `)
  })
  $(`#question${problemIndex} .bottom2`).append(`
    <div>${problem[problemIndex].option[problem[problemIndex].option.length - 1].chooseTerm}</div>
  `)
}

const handleModifyTitle = () => {
  $('#modifyTitleModal').modal('show')
  $('#questionnaireTitle').val(questionnaireTitle)
  $('#questionnaireDescription').val(questionnaireDescription)
}


const handleEditFinish = () => {
  console.log(problem)
  var params = {
    questionnaireId: $util.getItem('questionnaireId'),
  }
  $.ajax({
    url: API_BASE_URL + '/admin/deleteQuestionByQuestionnaireId',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    async: false,
    success: function (res) {
    }
  })
  $.ajax({
        url: API_BASE_URL + '/admin/deleteItemByQuestionnaireId',
        type: "POST",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (res) {
        }
  })
  for (let i = 0; i < problem.length; i++) {
    var params = {
        questionContent: problem[i].problemName,
        type: problem[i].type,
        questionnaireId: $util.getItem('questionnaireId'),
        projectId: $util.getItem('projectId'),
        pos : i,
        userId: $util.getItem('userInfo')[0].id,
        mustAnswer: problem[i].mustAnswer,
        title: problem[i].leftTitle,
    }
    if (problem[i].type == 5) {
        params.title = problem[i].option[0].chooseTerm+","+problem[i].option[problem[i].option.length-1].chooseTerm
    }
    console.log(params)
    $.ajax({
        url: API_BASE_URL + '/admin/insertQuestionById',
        type: "POST",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (res) {
            console.log(res)
            $util.setItem('questionId', res.data)
            status = true
        }
    })
    if (problem[i].type == 4) {
        var len = problem[i].leftTitle.split(",").length
        for (let k = 0; k< len; k++){
            for (let j = 0; j < problem[i].option.length; j++) {
              var params = {
                questionnaireId: $util.getItem('questionnaireId'),
                projectId: $util.getItem('projectId'),
                userId: $util.getItem('userInfo')[0].id,
                questionId: $util.getItem('questionId'),
                pos : j,
                itemContent: problem[i].option[j].chooseTerm,
                itemCount: 0,
                titlePos: k,
              }
              console.log(params)
              $.ajax({
                    url: API_BASE_URL + '/admin/insertItemById',
                    type: "POST",
                    data: JSON.stringify(params),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (res) {
                        console.log(res)
                    }
              })
            }
        }
    }
    else{
        for (let j = 0; j < problem[i].option.length; j++) {
          var params = {
            questionnaireId: $util.getItem('questionnaireId'),
            projectId: $util.getItem('projectId'),
            userId: $util.getItem('userInfo')[0].id,
            questionId: $util.getItem('questionId'),
            pos : j,
            itemContent: problem[i].option[j].chooseTerm,
            itemCount: 0,
            titlePos: j,
          }
          if (problem[i].type == 5) {
            params.itemContent = problem[i].option[j].fraction
          }
          console.log(params)
          $.ajax({
                url: API_BASE_URL + '/admin/insertItemById',
                type: "POST",
                data: JSON.stringify(params),
                dataType: "json",
                contentType: "application/json",
                success: function (res) {
                    console.log(res)
                }
          })
        }
    }
  }
  location.href = '/pages/questionnaire/index.html'
}

const overview = () => {
    location.href = '/pages/answerSheet/index.html?questionnaireId=' + $util.getItem('questionnaireId')
}

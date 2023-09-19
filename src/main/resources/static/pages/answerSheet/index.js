function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

onload = () => {
    var questionnaireId = getQueryVariable("questionnaireId")
    console.log(questionnaireId)

    var params = {
        id: questionnaireId
    }
//    $.ajax({
//        url: API_BASE_URL + '/admin/queryQuestionnaireById',
//        type: "POST",
//        data: JSON.stringify(params),
//        dataType: "json",
//        contentType: "application/json",
//        success(res) {
//            console.log(res)
//            if (res.data.state == 'close') {
//                alert('问卷未发布')
////                window.location.href = ''
//            }
//            $('.questionnaire-title').text(res.data.questionnaireName)
//            $('.questionnaire-description').text(res.data.questionnaireContent)
//        }
//    })
    params = {
        questionnaireId: questionnaireId
    }
    mustAnswer = []
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
                $('#problem').append(`
                    <div class="question" data-type=${res.data[i].type} data-problemIndex=${i+1}>
                    <div class="top">
                        <span class="question-title" id="questionTitle">${res.data[i].questionContent}</span>
                `)
                if (res.data[i].mustAnswer == "true"){
                    $('#problem').append(`
                        <span class="must-answer">必答题</span>
                    `)
                    if (res.data[i].type != 3){
                        mustAnswer.push(i)
                    }
                }
                $('#problem').append(`
                    </div>
                `)
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
                        $('#problem').append(`
                            <div class="bottom">
                        `)
                        if (res.data[i].type == 1) {
                            for (var j = 0; j < ans.data.length; j++) {
                                $('#problem').append(`
                                    <div style="display: flex; align-items: center; margin-bottom: 3px;">
                                    <label class="radio-inline">
                                    <input type="radio" name="chooseTerm${i}" itemId="${ans.data[j].id}"> ${ans.data[j].itemContent}
                                    </label>
                                    </div>
                                `)
                            }
                            $('#problem').append(`
                                </div>
                            `)
                        }
                        else if (res.data[i].type == 2) {
                            for (var j = 0; j < ans.data.length; j++) {
                                $('#problem').append(`
                                    <div style="display: flex; align-items: center; margin-bottom: 3px;">
                                    <label class="checkbox-inline">
                                    <input type="checkbox" name="chooseTerm${i}" itemId="${ans.data[j].id}"> ${ans.data[j].itemContent}
                                    </label>
                                    </div>
                                `)
                            }
                            $('#problem').append(`
                                </div>
                            `)
                        }
                        else if (res.data[i].type == 3) {
                            $('#problem').append(`
                                <textarea class="form-control" placeholder="请输入" rows="4" style="width: 70%;"></textarea>
                                </div>
                            `)
                        }
                        else if (res.data[i].type == 4) {  //矩阵
                            let str="";
                            var titles = res.data[i].title.split(',')
                            str += `
                                    <table class="table">
                                      <thead>
                                       <tr>
                                        <th></th>
                                         `
                            var l = res.data[i].title.split(',').length
                            console.log(l, 'l')
                            for (var j = 0; j < ans.data.length/l; j++) {
                            str += `
                                            <th>${ans.data[j].itemContent}</th>
                                        `
                            }
                            str += `
                                        </tr>
                                        </thead>
                                        <tbody>
                                        `
                            for (var j = 0; j < titles.length; j++) {
                                str += `
                                    <tr>
                                        <td>${titles[j]}</td>
                                `
                                for (var k = 0; k < ans.data.length/l; k++) {
                                    str += `
                                        <td><input type="radio" name="chooseTerm${i},${j}" itemId="${ans.data[j*ans.data.length/l+k].id}" /></td>
                                    `
                                }
                                str += `
                                    </tr>
                                `
                            }
                            str += `
                                </tbody>
                                </table>
                                </div>
                            `
                            $('#problem').append(str)
                        }
                        else if (res.data[i].type == 5) {  //量表
                            var str = ''
                            titles = res.data[i].title.split(',')
                            str += `
                            <div class="bottom" style="display: flex; align-items: center; justify-content: space-between;">
                            `
                            str += `
                                <div> ${titles[0]}</div>
                                `

                            for (var j = 0; j < ans.data.length; j++) {
                                str += `
                                    <div>
                                      <label class="radio-inline">
                                        <input type="radio" name="chooseTerm${i}" itemId="${ans.data[j].id}"/>${ans.data[j].itemContent}
                                      </label>
                                    </div>
                                `
                            }
                            str += `
                                <div> ${titles[1]}</div>
                                </div>
                                `
                            $('#problem').append(str)
                        }
                    }
                })
                $('#problem').append(`
                    </div>
                `)
            }
        }
    })
}

const submit = () => {
    var params = {
        id: getQueryVariable("questionnaireId")
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
        }
    })


    var item_ids = []
    $.each($('input[name*="chooseTerm"]:checked'),function (k,v) {
        console.log(k, v)
        console.log($(v).attr('itemId'), v)
        item_ids.push($(v).attr('itemId'))
        var str = $(v).attr('name')
        var num = 0;
        for (var i = 10; i<str.length; i++){
            if (str[i] == ',')  break;
            num = num*10 + parseInt(str[i])
        }
        mustAnswer.map((item, i) => {
            if (item == num) {
                mustAnswer.splice(i, 1)
            }
        });
    })
    if (mustAnswer.length > 0) {
        alert('请填写必填项')
        return
    }

    for (var i = 0; i < item_ids.length; i++) {
        var params = {
            id: item_ids[i]
        }
        $.ajax({
            url: API_BASE_URL + '/admin/updateItemCount',
            type: "POST",
            data: JSON.stringify(params),
            dataType: "json",
            contentType: "application/json",
            async: false,
            success(res) {
                console.log(res)
            }
        })
    }

    location.href = "/pages/questionnaire/index.html"
}

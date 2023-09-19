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
    $.ajax({
        url: API_BASE_URL + '/admin/queryQuestionnaireById',
        type: "POST",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json",
        success(res) {
            console.log(res)
            $('.questionnaire-title').text(res.data.questionnaireName)
            $('.questionnaire-description').text(res.data.questionnaireContent)
        }
    })
    params = {
        questionnaireId: questionnaireId
    }
    allBackgroundColor = [      // 设置每个柱形图的背景颜色
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    allBorderColor = [     //设置每个柱形图边框线条颜色
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    chart = [],
    $.ajax({
        url: API_BASE_URL + '/admin/queryQuestionByQuestionnaireId',
        type: "POST",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json",
        async: false,
        success(res) {
            console.log(res)
            var chartCnt = 0
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
                            var all = 0;
                            for (var j = 0; j < ans.data.length; j++){
                                all += ans.data[j].itemCount;
                            }
                            var labels = []
                            var data = {
                              labels: labels,
                              datasets: [{
                                label: '',
                                data: [],
                                backgroundColor: [      // 设置每个柱形图的背景颜色
                                ],
                                borderColor: [     //设置每个柱形图边框线条颜色
                                ],
                                borderWidth: 1     // 设置线条宽度
                              }]
                            };
                            for (var j = 0; j < ans.data.length; j++) {
                                labels.push(ans.data[j].itemContent)
                                data.datasets[0].data.push(ans.data[j].itemCount)
                                data.datasets[0].backgroundColor.push(allBackgroundColor[j%7])
                                data.datasets[0].borderColor.push(allBorderColor[j%7])
                                $('#problem').append(`
                                    <div style="display: flex; align-items: center; margin-bottom: 3px;">
                                    <label class="radio-inline">
                                    ${ans.data[j].itemContent} 计数 ${ans.data[j].itemCount} 占比 ${ans.data[j].itemCount/all*100}%
                                    </label>
                                    </div>
                                `)
                            }
                            $('#problem').append(`
                                </div>
                            `)
                            $('#problem').append(`
                                <canvas id="myChart${i}" width="400" height="200"></canvas>
                            `)
                            $('#problem').append(`
                                <button class="btn btn-primary" style="margin-top: 10px;" onclick="bar(${chartCnt})">柱状图</button>
                                <button class="btn btn-primary" style="margin-top: 10px;" onclick="line(${chartCnt})">折线图</button>
                                <button class="btn btn-primary" style="margin-top: 10px;" onclick="pie(${chartCnt})">饼状图</button>
                            `)
                            chartCnt++;
                            var ctx = document.getElementById('myChart'+i)
                            var config = {
                              type: 'bar', // 设置图表类型
                              data: data,  // 设置数据集
                              options: {
                                scales: {
                                  y: {
                                    beginAtZero: true // 设置 y 轴从 0 开始
                                  }
                                }
                              },
                            };
                            var myChart = new Chart(ctx, config);
                            chart.push(myChart)
                        }
                        else if (res.data[i].type == 2) {
                            var all = 0;
                            for (var j = 0; j < ans.data.length; j++){
                                all += ans.data[j].itemCount;
                            }
                            var labels = []
                            var data = {
                              labels: labels,
                              datasets: [{
                                label: '',
                                data: [],
                                backgroundColor: [      // 设置每个柱形图的背景颜色
                                ],
                                borderColor: [     //设置每个柱形图边框线条颜色
                                ],
                                borderWidth: 1     // 设置线条宽度
                              }]
                            };
                            for (var j = 0; j < ans.data.length; j++) {
                                labels.push(ans.data[j].itemContent)
                                data.datasets[0].data.push(ans.data[j].itemCount)
                                data.datasets[0].backgroundColor.push(allBackgroundColor[j%7])
                                data.datasets[0].borderColor.push(allBorderColor[j%7])
                                $('#problem').append(`
                                    <div style="display: flex; align-items: center; margin-bottom: 3px;">
                                    <label class="checkbox-inline">
                                    ${ans.data[j].itemContent} 计数 ${ans.data[j].itemCount} 占比 ${ans.data[j].itemCount/all*100}%
                                    </label>
                                    </div>
                                `)
                            }
                            $('#problem').append(`
                                </div>
                            `)
                            $('#problem').append(`
                                <canvas id="myChart${i}" width="400" height="200"></canvas>
                            `)
                            $('#problem').append(`
                                <button class="btn btn-primary" style="margin-top: 10px;" onclick="bar(${chartCnt})">柱状图</button>
                                <button class="btn btn-primary" style="margin-top: 10px;" onclick="line(${chartCnt})">折线图</button>
                                <button class="btn btn-primary" style="margin-top: 10px;" onclick="pie(${chartCnt})">饼状图</button>
                            `)
                            chartCnt++;
                            var ctx = document.getElementById('myChart'+i)
                            var config = {
                              type: 'bar', // 设置图表类型
                              data: data,  // 设置数据集
                              options: {
                                scales: {
                                  y: {
                                    beginAtZero: true // 设置 y 轴从 0 开始
                                  }
                                }
                              },
                            };
                            var myChart = new Chart(ctx, config);
                            chart.push(myChart)
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
                            labels_list = []
                            data_list = []
                            for (var j = 0; j < titles.length; j++) {
                                var all = 0
                                for (var k = 0; k < ans.data.length/l; k++) {
                                    all += ans.data[j*ans.data.length/l+k].itemCount
                                }
                                str += `
                                    <tr>
                                        <td>${titles[j]}</td>
                                `
                                var labels = []
                                var data = {
                                  labels: labels,
                                  datasets: [{
                                    label: '',
                                    data: [],
                                    backgroundColor: [      // 设置每个柱形图的背景颜色
                                    ],
                                    borderColor: [     //设置每个柱形图边框线条颜色
                                    ],
                                    borderWidth: 1     // 设置线条宽度
                                  }]
                                };
                                for (var k = 0; k < ans.data.length/l; k++) {
                                    labels.push(ans.data[j*ans.data.length/l+k].itemContent)
                                    data.datasets[0].data.push(ans.data[j*ans.data.length/l+k].itemCount)
                                    data.datasets[0].backgroundColor.push(allBackgroundColor[(j*ans.data.length/l+k)%7])
                                    data.datasets[0].borderColor.push(allBorderColor[(j*ans.data.length/l+k)%7])
                                    str += `
                                        <td>计数 ${ans.data[j*ans.data.length/l+k].itemCount} 占比 ${ans.data[j*ans.data.length/l+k].itemCount/all*100}%</td>
                                    `
                                }
                                str += `
                                    </tr>
                                `
                                str += `
                                    <canvas id="myChart${i},${j}" width="400" height="200"></canvas>
                                `
                                str += `
                                    <button class="btn btn-primary" style="margin-top: 10px;" onclick="bar(${chartCnt})">柱状图</button>
                                    <button class="btn btn-primary" style="margin-top: 10px;" onclick="line(${chartCnt})">折线图</button>
                                    <button class="btn btn-primary" style="margin-top: 10px;" onclick="pie(${chartCnt})">饼状图</button>
                                `
                                chartCnt++;
                                labels_list.push(labels)
                                data_list.push(data)
                            }
                            str += `
                                </tbody>
                                </table>
                                </div>
                            `
                            $('#problem').append(str)
                            for (var j = 0; j < titles.length; j++) {
                                var ctx = document.getElementById('myChart'+i+','+j)
                                var config = {
                                  type: 'bar', // 设置图表类型
                                  data: data_list[j],  // 设置数据集
                                  options: {
                                    scales: {
                                      y: {
                                        beginAtZero: true // 设置 y 轴从 0 开始
                                      }
                                    }
                                  },
                                };
                                var myChart = new Chart(ctx, config);
                                chart.push(myChart)
                            }
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
                            var all = 0
                            for (var j = 0; j < ans.data.length; j++) {
                                all += ans.data[j].itemCount
                            }
                            var labels = []
                            var data = {
                              labels: labels,
                              datasets: [{
                                label: '',
                                data: [],
                                backgroundColor: [      // 设置每个柱形图的背景颜色
                                ],
                                borderColor: [     //设置每个柱形图边框线条颜色
                                ],
                                borderWidth: 1     // 设置线条宽度
                              }]
                            };
                            for (var j = 0; j < ans.data.length; j++) {
                                labels.push(ans.data[j].itemContent)
                                data.datasets[0].data.push(ans.data[j].itemCount)
                                data.datasets[0].backgroundColor.push(allBackgroundColor[j%7])
                                data.datasets[0].borderColor.push(allBorderColor[j%7])
                                str += `
                                    <div>
                                      <label class="radio-inline">
                                        ${ans.data[j].itemContent}  计数 ${ans.data[j].itemCount} 占比 ${ans.data[j].itemCount/all*100}%
                                      </label>
                                    </div>
                                `
                            }
                            str += `
                                <div> ${titles[1]}</div>
                                </div>
                                `
                            str += `
                                <canvas id="myChart${i}" width="400" height="200"></canvas>
                            `
                            str += `
                                <button class="btn btn-primary" style="margin-top: 10px;" onclick="bar(${chartCnt})">柱状图</button>
                                <button class="btn btn-primary" style="margin-top: 10px;" onclick="line(${chartCnt})">折线图</button>
                                <button class="btn btn-primary" style="margin-top: 10px;" onclick="pie(${chartCnt})">饼状图</button>
                            `
                            chartCnt++;
                            $('#problem').append(str)
                            var ctx = document.getElementById('myChart'+i)
                            var config = {
                              type: 'bar', // 设置图表类型
                              data: data,  // 设置数据集
                              options: {
                                scales: {
                                  y: {
                                    beginAtZero: true // 设置 y 轴从 0 开始
                                  }
                                }
                              },
                            };
                            var myChart = new Chart(ctx, config);
                            chart.push(myChart)
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
    window.location.href = '../seeProject/index.html'
}

const bar = (i) => {
    chart[i].config.type = 'bar'
    chart[i].update()
}

const line = (i) => {
    chart[i].config.type = 'line'
    chart[i].update()
}

const pie = (i) => {
    chart[i].config.type = 'pie'
    chart[i].update()
}

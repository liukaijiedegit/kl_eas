/**
 * Created by Administrator on 2017/7/11.
 */
var dcs=["#colorPicker-nine","#chartscolor"];

$('#colorPicker-nine3').ColorPicker({
    color: '#0000ff',
    onShow: function (colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function (colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function (hsb, hex, rgb) {
        $('#colorPicker-nine3 div').css('backgroundColor', '#' + hex);
        $('#chartscolor3').css('color', '#' + hex);
        ast[0]=('#' + hex);
        barChart(ast);
        annularChart(ast);
        pieeChart(ast);
        lineeChart(ast);

    }
});
$('#colorPicker-nine4').ColorPicker({
    color: '#0000ff',
    onShow: function (colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function (colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function (hsb, hex, rgb) {
        $('#colorPicker-nine4 div').css('backgroundColor', '#' + hex);
        $('#chartscolor4').css('color', '#' + hex);
        ast[0]=('#' + hex);
        barChart(ast);
        annularChart(ast);
        pieeChart(ast);
        lineeChart(ast);

    }
});
$('#colorPicker-nine5').ColorPicker({
    color: '#0000ff',
    onShow: function (colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function (colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function (hsb, hex, rgb) {
        $('#colorPicker-nine5 div').css('backgroundColor', '#' + hex);
        $('#chartscolor5').css('color', '#' + hex);
        ast[0]=('#' + hex);
        barChart(ast);
        annularChart(ast);
        pieeChart(ast);
        lineeChart(ast);

    }
});
$('#colorPicker-nine6').ColorPicker({
    color: '#0000ff',
    onShow: function (colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function (colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function (hsb, hex, rgb) {
        $('#colorPicker-nine6 div').css('backgroundColor', '#' + hex);
        $('#chartscolor6').css('color', '#' + hex);
        ast[0]=('#' + hex);
        barChart(ast);
        annularChart(ast);
        pieeChart(ast);
        lineeChart(ast);

    }
});
$('#colorPicker-nine7').ColorPicker({
    color: '#0000ff',
    onShow: function (colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function (colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function (hsb, hex, rgb) {
        $('#colorPicker-nine7 div').css('backgroundColor', '#' + hex);
        $('#chartscolor7').css('color', '#' + hex);
        ast[0]=('#' + hex);
        barChart(ast);
        annularChart(ast);
        pieeChart(ast);
        lineeChart(ast);

    }
});
$('#colorPicker-nine8').ColorPicker({
    color: '#0000ff',
    onShow: function (colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function (colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function (hsb, hex, rgb) {
        $('#colorPicker-nine8 div').css('backgroundColor', '#' + hex);
        $('#chartscolor8').css('color', '#' + hex);
        ast[0]=('#' + hex);
        barChart(ast);
        annularChart(ast);
        pieeChart(ast);
        lineeChart(ast);

    }
});
$('#colorPicker-nine9').ColorPicker({
    color: '#0000ff',
    onShow: function (colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function (colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function (hsb, hex, rgb) {
        $('#colorPicker-nine9 div').css('backgroundColor', '#' + hex);
        $('#chartscolor9').css('color', '#' + hex);
        ast[0]=('#' + hex);


    }


});

function changColor(colorPicker){
    xColor=colorPicker[0];
    yColor=colorPicker[1];

    $(xColor).ColorPicker({
        color: '#0000ff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $(xColor).css('backgroundColor', '#' + hex);
            $(yColor).css('color', '#' + hex);
            ast[0]=('#' + hex);
            barChart(ast);
            annularChart(ast);
            pieeChart(ast);
            lineeChart(ast);

        }
    });
}
changColor(dcs);
changColor(["#colorPicker-nine2","#chartscolor2"]);







var ast=["#ffffff","20","Arial","10"]


function barChart( fontFamily,color,fontSize) {

    color=arguments[0][0];
    fontSize=arguments[0][1]
    fontFamily=arguments[0][2]

    var myCharte = echarts.init(document.getElementById('maine'));
    optione = {
        title: {
            text: '销量/年份',
            textStyle: {
                fontFamily:fontFamily,
                fontSize:fontSize,
                color:color,
            }
        },
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontFamily:fontFamily,
                        fontSize:fontSize,
                        color:color,
                    }
                },
                axisTick: {
                    alignWithLabel: true

                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value}',
                    textStyle: {
                        fontFamily:fontFamily,
                        fontSize:fontSize,
                        color:color,
                    }
                }
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '50%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };


    myCharte.setOption(optione);



}




barChart(ast);


//环形图

function annularChart(ast) {
    color=ast[0];
    fontSize=ast[1];
    fontFamily=ast[2];
    cupdataaa=ast[3];

    var myChartb = echarts.init(document.getElementById('mainb'));
    optionb = {

        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['使用量','空闲量'],
            textStyle: {
                fontFamily:fontFamily,
                fontSize:fontSize,
                color:color,
                fontWeight: 'normal'
            }

        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['20%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:cupdataaa, name:'使用量'},

                    {value:100-cupdataaa, name:'空闲量'}

                ]
            }
        ]




    };

    myChartb.setOption(optionb);
}




annularChart(ast);




function pieeChart( fontFamily,color,fontSize) {

    color=arguments[0][0];
    fontSize=arguments[0][1]
    fontFamily=arguments[0][2]
    var myChart = echarts.init(document.getElementById('maina'));
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销',],
            textStyle: {
                fontFamily: fontFamily,
                color: color,
                fontSize: fontSize,
                fontWeight: 'normal',


            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},


                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myChart.setOption(option);
}




pieeChart(ast);


function  lineeChart(color,fontSize) {


    color=arguments[0][0];
    fontSize=arguments[0][1]
    fontFamily=arguments[0][2]


    var myChartd = echarts.init(document.getElementById('maind'));
    optiond = {

        title: {
            text: '销量/年份',
            textStyle: {
                color: color,
            }
        },
//        tooltip: {
//            trigger: 'axis'
//        },
//        legend: {
//            data:['����',],
//            textStyle: {
//                color: '#fff'
//            }
//
//        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
//        toolbox: {
//            feature: {
//                saveAsImage: {}
//            }
//        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2003','2004','2005','2006','2007','2008','2009'],
            axisLabel: {
                show: true,
                textStyle: {
                    fontFamily:fontFamily,
                    color: color,
                    fontSize:fontSize
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel : {
                formatter: '{value}',
                textStyle: {
                    fontFamily: fontFamily,
                    color:color,
                    fontSize:fontSize
                }
            }
        },
        series: [
            {
                name:'销量',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            }

        ]
    };


    myChartd.setOption(optiond);
}




lineeChart(ast);

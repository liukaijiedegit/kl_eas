var timer=null;
var ast=["#ffffff","20","Arial","10"]

//$("select option:nth-child(4)").attr("selected", true);
//默认下拉列表是第四个
//选取颜色
$('#colorPicker2').ColorPicker({
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
        $('#colorPicker2 div').css('backgroundColor', '#' + hex);
        $('#chartscolor2').css('color', '#' + hex);
        ast[0]=('#' + hex);

    }
});
$('#colorPicker').ColorPicker({
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
        $('#colorPicker div').css('backgroundColor', '#' + hex);
        $('#chartscolor').css('color', '#' + hex);
        ast[0]=('#' + hex);
        barChart(ast);
        annularChart(ast);
        pieeChart(ast);
        lineeChart(ast);

    }
});
$('#colorPicker3').ColorPicker({
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
        $('#colorPicker3 div').css('backgroundColor', '#' + hex);
        $('#chartscolor3').css('color', '#' + hex);
        ast[0]=('#' + hex);


    }
});
$('#colorPicker4').ColorPicker({
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
        $('#colorPicker4 div').css('backgroundColor', '#' + hex);
        $('#chartscolor4').css('color', '#' + hex);
        ast[0]=('#' + hex);


    }
});

//切换字体
var fontx="";
$("#changeFonta").change(function (){
    if($("select option").is(":selected")){
        var sj= $(this).val();
        //console.log(fontx)
        console.log(sj)
        if(sj==="Arial"){
            $(".font-g").css({
                    fontFamily: "Arial"
                }

            );

            $("#mainb").css({
                    fontFamily: "Arial"
                }

            )
            ast[2]="Arial";

        }
        if (sj==="YaHei"){
            $(".font-g").css({
                    fontFamily: " Microsoft YaHei"
                }

            );
            $("#mainb").css({
                    fontFamily: " Microsoft YaHei"
                }

            )
            ast[2]="Microsoft YaHei";

        }
        if (sj==="SimHei"){
            $(".font-g").css({
                    fontFamily: "SimHei"
                }

            );
            $("#mainb").css({
                    fontFamily: "SimHei"
                }

            )
            ast[2]="SimHei";

        }

    }
    barChart(ast);
    annularChart(ast);
    pieeChart(ast);
    lineeChart(ast);


});



//切换字大小
//var  sj;
$("#fontsa").change(function (){
    if($("select option").is(":selected")){
       var  sj= $(this).val();
        console.log(sj)
        if(sj==="f20"){
            $(".font-p").css({
                    fontSize: "20px"
                }

            );
            ast[1]="20";


        };
        if(sj==="25"){
            $(".font-p").css({
                    fontSize: "25px"
                }

            );
            ast[1]="25";


        };
        if(sj==="f30"){
            $(".font-p").css({
                    fontSize: "30px"
                }

            );
            ast[1]="30";


        };
        if(sj==="f35"){
            $(".font-p").css({
                    fontSize: "35px"
                }

            );
            ast[1]="35";



        }





    }


    //return sj


    barChart(ast);
    annularChart(ast);
    pieeChart(ast);
    lineeChart(ast);

    console.log(sj)
});

// 切换数据
$("#ms1").change(function (){
    if($("select option").is(":selected")){
        var  sj= $(this).val();


        console.log(sj)


    }


    //return sj

    //
    // barChart(ast);
    // annularChart(ast);
    // pieeChart(ast);
    // lineeChart(ast);


});







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



function getUtf8Length(str){
    if (str==""||str==null)
        return 0;
    var n = 0;
    len = 0;
    for (i = 0; i < str.length; i++) {
        n = str.charCodeAt(i);
        if (n <= 255)
            len += 1;
        else
            len += 3;
    }
    return len;
}

//下拉
// var  myselect=document.getElementById("changeFonta");
// var index=myselect.selectedIndex;
// var val=myselect.options[index].value;
// //var val= $("#changeFonta").val()
// var mytext=myselect.options[index].text;

//$("#changeFonta").change(function(){
//  var vals = this.options[this.options.selectedIndex].value
//    var val1=$("select option:selected").val() + ","+ $("select option:selected").text()
//    var val2= $("select option").click(function() {
//        alert($(this).val() + "," + $(this).text());
//    });
//
//
//
//
//});
//
// $("select option:nth-child(0)").attr("selected", true);


//切换图标

$("#changepicturea").change(function (){
    if($("select option").is(":selected")){

       var sj= $(this).val();
        if (sj!=="hxt"){
            clearInterval(timer);

        }

        // console.log(sj)
        if (sj==="hxt"){
            $("#mainb").css({
                    display: "block"
                }

            );
            $("#maine").css({
                    display: "none"
                }

            );
            $("#maina").css({
                    display: "none"
                }

            );
            $("#maind").css({
                    display: "none"
                }

            )

        }
        if (sj==="zft"){
            $("#mainb").css({
                    display: "none"
                }

            );
            $("#maine").css({
                    display: "block"
                }

            );
            $("#maina").css({
                    display: "none"
                }

            );
            $("#maind").css({
                    display: "none"
                }

            )

        }
        if (sj==="bxt"){
            $("#mainb").css({
                    display: "none"
                }

            );
            $("#maine").css({
                    display: "none"
                }

            );
            $("#maina").css({
                    display: "block"
                }

            );
            $("#maind").css({
                    display: "none"
                }

            )

        }
        if (sj==="zxt"){
            $("#mainb").css({
                    display: "none"
                }

            );
            $("#maine").css({
                    display: "none"
                }

            );
            $("#maina").css({
                    display: "none"
                }

            );
            $("#maind").css({
                    display: "block"
                }

            )

        }
    }

///�л�����
});
//切换行高
function changegop(x){
    $(x).change(function (){
        if($("select option").is(":selected")){
            var sj= $(this).val();
            console.log(sj)
            if(sj==="h20"){
                $(".font-p").css({
                        lineHeight: "20px"
                    }

                );


            }
            if(sj==="h24"){
                $(".font-p").css({
                        lineHeight: "24px"
                    }

                );


            }
            if(sj==="h28"){
                $(".font-p").css({
                        lineHeight: "28px"
                    }

                );


            }
            if(sj==="h32"){
                $(".font-p").css({
                        lineHeight: "32px"
                    }

                );


            }


        }


    });

}
changegop("#linega")



 $(document).ready(function ss() {
    $("#changeFonta").change(function () {
        var selected = $(this).children('option:selected').val();
        return selected
    });
});


//
//// 主机绑定数据
//!function  () {
//    $.ajax({
//        url:'/kl_eas/v1/monitor/servers',
//        method:'get',
//        dataType:'json',
//        error: function (data) {
//            console.log(data);
//
//        },
//        success:function (data){
//
//
//            bindData(data)
//        }
//    });
//
//}();
//function bindData(data) {
//    // console.log(data);
//
//    //getdata
//    var data1 = data.data;
//    data1=JSON.parse(data1);
//    data1=data1.servers;
//    var addrs=[];
//    for(var j=0;j<data1.length;j++){
//        // console.log(data1[j]);
//        var server = data1[j]
//        var addresses =server.addresses;
//        for (net in addresses){
//            addresses = addresses[net]
//            for (var k=0;k<addresses.length;k++){
//                var addresse = addresses[k]
//                if(addresse['OS-EXT-IPS:type']=="floating"){
//                    // console.log(addresse['addr'])
//                    addrs.push(addresse['addr']);
//                    var master1 = document.getElementById('master1');
//
//
//                }
//            }
//
//        }
//
//    }
//    var master1 = document.getElementById('master1');
//    for (var i=0; i<addrs.length ;i++){
//        var str = "";
//        var ite = addrs[i];
//        str +=`<option value="AF">${ite}</option>`;
//
//        master1.innerHTML += str;
//
//    }
//
//
//
//
//}
//// 源数据
//
//
//
//!function  () {
//    $.ajax({
//        url:'v1/datasource',
//        method:'get',
//        dataType:'json',
//        error: function (data) {
//            console.log(data);
//
//        },
//        success:function (data){
//
//            console.log(data)
//            console.log(2)
//            options(data)
//        }
//    });
//
//}();
//function options(data){
//    var d = data.data;
//    var html = '';
//    var options = [];
//    var optionta=[];
//
//    var item = d[0];
//    var config = JSON.parse(item['config']);
//    var keys = config['keys'];
//    for(var key in keys){
//        options.push(keys);
//
//
//    }
//    optionta=options[0]
//
//    // console.log(optionta);
//    chuang(optionta)
//    // return optionta;
//
//
//}
//
//function chuang (ele) {
//    var ms1 = document.getElementById('ms1');
//    for (var  key in ele){
//        var str = "";
//        var ite = ele[key];
//        // console.log(key)
//        str +=`<option value="${ite}">${key}</option>`;
//
//        ms1.innerHTML += str;
//
//    }
//
//
//}
//
// var master1 = document.getElementById('master1');
// for (var i=0; i<addrs.length ;i++){
//     var str = "";
//     var ite = addrs[i];
//     str +=`<option value="AF">${ite}</option>`;
//
//     master1.innerHTML += str;
//
// }
//
//
//
//
// //cpu数据
//
// var timer = setInterval(function() {
//
//
//
//     !function  () {
//         $.ajax({
//             url:'/kl_eas/json/jsn.json',
//             async: false,
//             method:'get',
//             dataType:'json',
//             error: function (data) {
//                 console.log(data);
//
//             },
//             success:function (data){
//
//                 console.log(data)
//
//                 bdData(data)
//                 annularChart(ast);
//
//             }
//         });
//
//     }();
//     annularChart(ast);
//
//
//
// }, 1000);
//
//
//function bdData(ele) {
//    console.log(ele)
//    var cpu =ele["cpu"];
//    var mem=ele["mem"];
//    var read=ele["diskread"].split("*").reduce((x,y)=>{return Number(x)+Number(y)});
//    var netin=ele["netin"].split("*").reduce((x,y)=>{return Number(x)+Number(y)});
//    var netout=ele["netout"].split("*").reduce((x,y)=>{return Number(x)+Number(y)});
//    ast[3]=cpu;
//
//
//
//
//
//    console.log(cpu);
//    //console.log(read)
//    //console.log(netin)
//    //console.log(netout)
//
//}
//
// //表单数据
//
// //!function  () {
// //    $.ajax({
// //        url:'/kl_eas/v1/monitor/192.168.2.10/0/%22vda_log_type%22%3A%222',
// //        method:'get',
// //
// //        dataType:'json',
// //        error: function (data) {
// //            console.log(data);
// //
// //        },
// //        success:function (data){
// //
// //            console.log(data)
// //            console.log(3)
// //            bilData(data)
// //        }
// //    });
// //
// //}();
// //function bilData(data) {
// //
// //}
// //
// //
// //

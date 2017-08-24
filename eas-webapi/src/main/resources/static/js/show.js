//存储chart
var map_chart={};
//存储定时器
var map_interval={};

var map_linedate={};
var map_linedata={};
var map_linedataA={};
var map_linedataB={};
var map_data_id={};

var data_id=0;

//定义参数对象
var MyParameter=function () {
    this.ElementId;
    this.ip;
    this.dataType;
    this.showType;
    this.fontFamily;
    this.fontSize;
    this.color;
}



//初始化加载图形
function loadChart(myparameter) {

    //-----------------------开始--------------------------------------
    var show_Chart = echarts.init(document.getElementById(myparameter.ElementId));

    //存储chart
    map_chart[myparameter.ElementId]=show_Chart;

    //加载图像
    onclickLoad(myparameter);

}

function onLoad(myparameter,show_Chart) {



    map_linedate[myparameter.ElementId]=null;
    map_linedata[myparameter.ElementId]=null;
    map_linedataA[myparameter.ElementId]=null;
    map_linedataB[myparameter.ElementId]=null;
    data_id=0;

    //定时器获取数据
    var interval= setInterval(function () {


        //myparameter.ip  myparameter.dataType
        var data;
        switch (myparameter.dataType){
            case "cpu":
            case "memory":
            case "net":
            case "disk":
                //调用接口GET /v1/monitor/{uuid}
                //获取数据，ajax请求(必须为同步加载)
                data =getMonitorServerData(myparameter.ip);

                //没有数据就用假数据
                // if(!data){
                //     data = {
                //         "cpu":  Math.random() * 100,
                //         "mem": Math.random() * 100,
                //         "diskread": Math.random() * 100,
                //         "diskwrite":Math.random() * 100,
                //         "netin": Math.random() * 100,
                //         "netout":Math.random() * 100
                //     };
                // }

                break;
            default:
                //调用接口 GET /v1/monitor/{ip}/{data_id}/{type}
                //获取数据，ajax请求(必须为同步加载)
                data = getMonitorData(myparameter.ip,data_id,myparameter.dataType);

                //数据样例
                /*data = {
                 "state": true,
                 "msg": "success",
                 "data": [
                 {
                 "id": 19,
                 "localip": "192.168.2.10",
                 "time": 1497586769000,
                 "data": "{\"vda_login_acc\":\"Administrator\",\"vda_content\":\"iexplore.exe\",\"vda_op_time\":\"1489112616\",\"vda_sid\":\"x0gn5g0o\",\"vda_op\":\"1\",\"vda_app_type\":\"0\",\"vda_spath\":\"/17/03/10/x0gn5g0o\",\"vda_res_acc\":\"root\",\"vda_remote_ip\":\"192.168.20.166\",\"vda_frame_index\":\"123\",\"vda_res_ip\":\"192.168.20.52\",\"vda_ssid\":\"x0gn5g0o_0_0\",\"vda_log_type\":\"2\",\"vda_gpath\":\"000\",\"vda_local_ip\":\"192.168.2.10\",\"vda_res_protocol\":\"ssh2\",\"vda_app_name\":\"SecureCRT.exe\"}"
                 },
                 {
                 "id": 18,
                 "localip": "192.168.2.10",
                 "time": 1489112000,
                 "data": "{\"vda_login_acc\":\"Administrator\",\"vda_content\":\"iexplore.exe\",\"vda_op_time\":\"1489112616\",\"vda_sid\":\"x0gn5g0o\",\"vda_op\":\"1\",\"vda_app_type\":\"0\",\"vda_spath\":\"/17/03/10/x0gn5g0o\",\"vda_res_acc\":\"root\",\"vda_remote_ip\":\"192.168.20.166\",\"vda_frame_index\":\"123\",\"vda_res_ip\":\"192.168.20.52\",\"vda_ssid\":\"x0gn5g0o_0_0\",\"vda_log_type\":\"2\",\"vda_gpath\":\"000\",\"vda_local_ip\":\"192.168.2.10\",\"vda_res_protocol\":\"ssh2\",\"vda_app_name\":\"SecureCRT.exe\"}"
                 },
                 {
                 "id": 17,
                 "localip": "192.168.2.10",
                 "time": 1489112000,
                 "data": "{\"vda_login_acc\":\"Administrator\",\"vda_content\":\"iexplore.exe\",\"vda_op_time\":\"1489112616\",\"vda_sid\":\"x0gn5g0o\",\"vda_op\":\"1\",\"vda_app_type\":\"0\",\"vda_spath\":\"/17/03/10/x0gn5g0o\",\"vda_res_acc\":\"root\",\"vda_remote_ip\":\"192.168.20.166\",\"vda_frame_index\":\"123\",\"vda_res_ip\":\"192.168.20.52\",\"vda_ssid\":\"x0gn5g0o_0_0\",\"vda_log_type\":\"2\",\"vda_gpath\":\"000\",\"vda_local_ip\":\"192.168.2.10\",\"vda_res_protocol\":\"ssh2\",\"vda_app_name\":\"SecureCRT.exe\"}"
                 },
                 {
                 "id": 16,
                 "localip": "192.168.2.10",
                 "time": 1489112000,
                 "data": "{\"vda_login_acc\":\"Administrator\",\"vda_content\":\"iexplore.exe\",\"vda_op_time\":\"1489112616\",\"vda_sid\":\"x0gn5g0o\",\"vda_op\":\"1\",\"vda_app_type\":\"0\",\"vda_spath\":\"/17/03/10/x0gn5g0o\",\"vda_res_acc\":\"root\",\"vda_remote_ip\":\"192.168.20.166\",\"vda_frame_index\":\"123\",\"vda_res_ip\":\"192.168.20.52\",\"vda_ssid\":\"x0gn5g0o_0_0\",\"vda_log_type\":\"2\",\"vda_gpath\":\"000\",\"vda_local_ip\":\"192.168.2.10\",\"vda_res_protocol\":\"ssh2\",\"vda_app_name\":\"SecureCRT.exe\"}"
                 },
                 {
                 "id": 15,
                 "localip": "192.168.2.10",
                 "time": 1489112000,
                 "data": "{\"vda_login_acc\":\"Administrator\",\"vda_content\":\"iexplore.exe\",\"vda_op_time\":\"1489112616\",\"vda_sid\":\"x0gn5g0o\",\"vda_op\":\"1\",\"vda_app_type\":\"0\",\"vda_spath\":\"/17/03/10/x0gn5g0o\",\"vda_res_acc\":\"root\",\"vda_remote_ip\":\"192.168.20.166\",\"vda_frame_index\":\"123\",\"vda_res_ip\":\"192.168.20.52\",\"vda_ssid\":\"x0gn5g0o_0_0\",\"vda_log_type\":\"2\",\"vda_gpath\":\"000\",\"vda_local_ip\":\"192.168.2.10\",\"vda_res_protocol\":\"ssh2\",\"vda_app_name\":\"SecureCRT.exe\"}"
                 }
                 ]
                 }*/

                try {
                    //设置data_id;
                    data_id=data.data[0].id;
                    data_id=data_id+1;
                    var datalist=[];
                        data = data.data;
                    for(var k=0;k<data.length;k++){
                        var mydata = data[k].data
                        datalist.push(JSON.parse(mydata));
                    }
                    data=datalist;

                }catch (e){
                    console.log(e);
                    data_id=0;
                    data=null;
                }


            //没有数据就用假数据
            // if(!data){
            //     data=getMyData(myparameter.dataType);
            // }

        }


        if (typeof data == "string") {
            data = JSON.parse(data);
        }

        var show_option="";
        //判断图形类型
        switch (myparameter.showType){
            case 'line':
                //设置线属性

                show_option=setLine(myparameter,data);

                break;
            case 'pie':
                //设置饼图
                show_option=setPie(myparameter,data);
                break;
            case 'bar':
                //柱形
                show_option=setBar(myparameter,data);
                break;

        }

        show_Chart.setOption(show_option);
        //console.log(show_Chart)
        //console.log(show_option)

    }, 1000*5);

    map_interval[myparameter.ElementId]=interval;

}

function frame_monitor_ie(id,w,h,border) {
    var _border = border==null?"1":border;
    pop = "<object border=" + _border +" id='monitor" + id +"' width='" + w +"' height='"+ h +"' classid='CLSID:7538E425-EE0C-435D-82F2-FE16F83D080D'></object>";
    $("#" + id).append(pop);
}


//属性点击变更加载
function onclickLoad(myparameter,height) {
    //清理之前的定时器
    clearInterval(map_interval[myparameter.ElementId]);
    // $('#'+myparameter.ElementId).empty();
    //
    /////////// $('#'+myparameter.ElementId).siblings().remove();

    if(myparameter.showType=="monitor"){
        /*if(myparameter.vdaip){
         location.href="vdaurl:rt=1:ip="+myparameter.vdaip+":port=20000:title="+myparameter.ip;
         }else{
         alert("没有监控录像");

         }*/

//
//         $(".box input[data-value]").each(function () {
// //    alert($(this).attr("data-value"));
//             var numder_ip=[]
//             var input_ip=($(this).attr("data-value"));
//             numder_ip.push(input_ip)
//    console.log(numder_ip)
//
//         });
//         for (var y=0; y<numder_ip.length;y++){
//             var change_ip = numder_ip[y];
//
//            if (change_ip===myparameter.ip){
//                console.log(OK)
//            }else {
//                console.log(NO)
//            }
//
//         }





        // $('#'+myparameter.ElementId).siblings().remove();
        console.log(myparameter.ip)
        objectid="monitor"+myparameter.ElementId;
        if(!!window.ActiveXObject || "ActiveXObject" in window){
            //$('#'+myparameter.ElementId).after("<OBJECT ID='"+objectid+"'  CLASSID='CLASSID:7538E425-EE0C-435D-82F2-FE16F83D080D'></OBJECT>");
            //objectid.start(myparameter.vdaip, 20000)

            myparameter.vdaip=myparameter.ip

            frame_monitor_ie(myparameter.ElementId, $('#'+myparameter.ElementId).width(),$('#'+myparameter.ElementId).height(),1);
///隐藏OBJECT上面的DIV

            if("show"==myparameter.ElementId){


                $("#show div:first").css({
                    display: "none",
                });
                $("#show").css({
                    display: "block",
                 })
                $("#operation .bootstrap-table").css({
                    display: "none",
                })
                // $("#show .bootstrap-table").remove()
                monitorshow.start(myparameter.vdaip, 20000)
            }else if
            ("show1"==myparameter.ElementId){

                $("#show1 div:first").css({
                    display: "none"
                });
                $("#show1").css({
                    display: "block"
                })

                $("#operation1 .bootstrap-table").css({
                    display: "none",
                })
                // $("#show1 .bootstrap-table").remove()
                monitorshow1.start(myparameter.vdaip, 20000)
            }else if("show2"==myparameter.ElementId){
                $("#show2 object").remove()
                $("#show2 div:first").css({
                    display: "none"
                });
                $("#show2").css({
                    display: "block"
                })


                $("#operation2 .bootstrap-table").css({
                    display: "none",
                })
                // $("#show2 .bootstrap-table").remove()
                monitorshow2.start(myparameter.vdaip, 20000)
            }else if("show3"==myparameter.ElementId){
                $("#show3 div:first").css({
                    display: "none"
                });
                $("#show3").css({
                    display: "block"
                })
                $("#operation3 .bootstrap-table").css({
                    display: "none",
                })
                monitorshow3.start(myparameter.vdaip, 20000)
            }else if("show4"==myparameter.ElementId){
                $("#show4 div:first").css({
                    display: "none"
                });
                $("#show4").css({
                    display: "block"
                })
                $("#operation4 .bootstrap-table").css({
                    display: "none",
                })
                monitorshow4.start(myparameter.vdaip, 20000)
            }else if("show5"==myparameter.ElementId){
                $("#show5 div:first").css({
                    display: "none"
                });
                $("#show5").css({
                    display: "block"
                })
                $("#operation4 .bootstrap-table").css({
                    display: "none",
                })
                monitorshow5.start(myparameter.vdaip, 20000)
            }else if("show6"==myparameter.ElementId){
                $("#show6 div:first").css({
                    display: "none"
                });
                $("#show6").css({
                    display: "block"
                })

                $("#operation6 .bootstrap-table").css({
                    display: "none",
                })
                monitorshow6.start(myparameter.vdaip, 20000)
            }else if(myparameter.ElementId=="show7"){
                $("#show7 div:first").css({
                    display: "none"
                });
                $("#show7").css({
                    display: "block"
                })

                $("#operation7 .bootstrap-table").css({
                    display: "none",
                })
                monitorshow7.start(myparameter.vdaip, 20000)
            }else if(myparameter.ElementId=="show8"){
                $("#show8 div:first").css({
                    display: "none"
                });
                $("#show8").css({
                    display: "block"
                })

                $("#operation8 .bootstrap-table").css({
                    display: "none",
                })
                monitorshow8.start(myparameter.vdaip, 20000)
            }else if(myparameter.ElementId=="show9"){
                $("#show9 div:first").css({
                    display: "none"
                });
                $("#show9").css({
                    display: "block"
                })
                $("#operation9 .bootstrap-table").css({
                    display: "none",
                })
                monitorshow9.start(myparameter.vdaip, 20000)
            }


        } else{
            console.log("调用监控失败，没有ActiveX");
            if(myparameter.vdaip){
                location.href="vdaurl:rt=1:ip="+myparameter.vdaip+":port=20000:title="+myparameter.ip;
            }else{
                console.log("没有监控录像");
            }
        }

    }else if(myparameter.showType=="form"){
        if (myparameter.ElementId=="show"){
            // $("#show div:first").css({
            //     display: "block"
            // })
            $("#operation .bootstrap-table").css({
                display: "block",
            })


            $("#monitorshow").remove();
        }else if(myparameter.ElementId=="show1"){
            // $("#show1 div:first").css({
            //     display: "block"
            // })
            $("#operation1 .bootstrap-table").css({
                display: "block",
            })


            $("#monitorshow1").remove();
        }else if(myparameter.ElementId=="show2"){
            $("#operation2 .bootstrap-table").css({
                display: "block",
            })

            // $("#show2 div:first").css({
            //     display: "block"
            // })
            $("#monitorshow2").remove();
        }else if(myparameter.ElementId=="show3"){
            $("#operation3 .bootstrap-table").css({
                display: "block",
            })
            // $("#show3 div:first").css({
            //     display: "block"
            // })
            $("#monitorshow3").remove();
        }else if(myparameter.ElementId=="show4"){
            $("#operation4 .bootstrap-table").css({
                display: "block",
            })
            // $("#show4 div:first").css({
            //     display: "block"
            // })
            $("#monitorshow4").remove();
        }else if(myparameter.ElementId=="show5"){
            $("#operation5 .bootstrap-table").css({
                display: "block",
            })
            // $("#show5 div:first").css({
            //     display: "block"
            // })
            $("#monitorshow5").remove();
        }else if(myparameter.ElementId=="show6"){
            $("#operation6 .bootstrap-table").css({
                display: "block",
            })
            // $("#show6 div:first").css({
            //     display: "block"
            // })
            $("#monitorshow6").remove();
        }else if(myparameter.ElementId=="show7"){
            $("#operation7 .bootstrap-table").css({
                display: "block",
            })
            // $("#show7 div:first").css({
            //     display: "block"
            // })
            $("#monitorshow7").remove();
        }else if(myparameter.ElementId=="show8"){
            $("#operation8 .bootstrap-table").css({
                display: "block",
            })
            // $("#show8 div:first").css({
            //     display: "block"
            // })
            $("#monitorshow8").remove();
        }else {
            $("#operation9 .bootstrap-table").css({
                display: "block",
            })
            // $("#show9 div:first").css({
            //     display: "block"
            // })
            $("#monitorshow9").remove();
        }
        if(myparameter.dataType>0&&myparameter.dataType<10){


            $('#'+myparameter.ElementId).siblings().remove();


            var comm =  map_config[myparameter.dataType]

            var show_Chart =map_chart[myparameter.ElementId];
            show_Chart.clear();
            //在ID为 myparameter.ElementId  中展现表格     comm data
            //隐藏myparameter.ElementId 的div,创建table。
            $('#'+myparameter.ElementId).hide();
            $('#'+myparameter.ElementId).after("<table id=table_"+myparameter.ElementId+"></table>");

            //设置标题
            setTable("table_"+myparameter.ElementId,comm,[],height);

            var data = getMonitorData(myparameter.ip,data_id,myparameter.dataType);
            if(data.data.length==0){
                map_data_id[myparameter.ip+myparameter.dataType]=0;
            }else {
                map_data_id[myparameter.ip+myparameter.dataType]=data.data[0].id;
            }
            console.log(myparameter.ip+" - -data_id:"+map_data_id[myparameter.ip+myparameter.dataType]);

            //定时器获取数据
            var interval= setInterval(function () {

                var comm =  map_config[myparameter.dataType];
                data_id=map_data_id[myparameter.ip+myparameter.dataType];

                var data = getMonitorData(myparameter.ip,data_id,myparameter.dataType);
                if(data.data.length==0){
                    data=[];
                }else {
                    // map_data_id[myparameter.ip+myparameter.dataType]=data.data[0].id;
                    var datalist=[];
                    data = data.data;
                    for(var k=0;k<data.length;k++){
                        var mydata = data[k].data
                        datalist.push(JSON.parse(mydata));
                    }
                    data=datalist;
                }

                var show_Chart =map_chart[myparameter.ElementId];
                show_Chart.clear();
                //在ID为 myparameter.ElementId  中展现表格     comm data
                //隐藏myparameter.ElementId 的div,创建table。
                $('#'+myparameter.ElementId).hide();
                $('#'+myparameter.ElementId).siblings().remove();
                $('#'+myparameter.ElementId).after("<table id=table_"+myparameter.ElementId+"></table>");


                setTable("table_"+myparameter.ElementId,comm,data,height);

            }, 1000*30);

            map_interval[myparameter.ElementId]=interval;

        }



    }else{

        ///显示图像删除监控


        if (myparameter.ElementId=="show"){
            $("#show").next(".bootstrap-table").css({
                display: "none"
            })

            $("#show div:first").css({
                display: "block"
            })
            $("#monitorshow").remove();
        }else if(myparameter.ElementId=="show1"){
            $("#show1").next(".bootstrap-table").css({
                display: "none"
            })

            $("#show1 div:first").css({
                display: "block"
            })

            $("#monitorshow1").remove();
        }else if(myparameter.ElementId=="show2"){
            $("#show2").next(".bootstrap-table").css({
                display: "none"
            })

            $("#show2 div:first").css({
                display: "block"
            })


            $("#monitorshow2").remove();
        }else if(myparameter.ElementId=="show3"){

            $("#show3").next(".bootstrap-table").css({
                display: "none"
            })

            $("#show3 div:first").css({
                display: "block"
            })

            $("#monitorshow3").remove();
        }else if(myparameter.ElementId=="show4"){

            $("#show4").next(".bootstrap-table").css({
                display: "none"
            })

            $("#show4 div:first").css({
                display: "block"
            })

            $("#monitorshow4").remove();
        }else if(myparameter.ElementId=="show5"){
            $("#show5").next(".bootstrap-table").css({
                display: "none"
            })

            $("#show5 div:first").css({
                display: "block"
            })



            $("#monitorshow6").remove();
        }else if(myparameter.ElementId=="show6"){
            $("#show6").next(".bootstrap-table").css({
                display: "none"
            })

            $("#show6 div:first").css({
                display: "block"
            })

            $("#monitorshow7").remove();
        }else if(myparameter.ElementId=="show7"){
            $("#show7").next(".bootstrap-table").css({
                display: "none"
            })

            $("#show7 div:first").css({
                display: "block"
            })


            $("#monitorshow8").remove();
        }else if(myparameter.ElementId=="show8"){
            $("#show8").next(".bootstrap-table").css({
                display: "none"
            })

            $("#show8 div:first").css({
                display: "block"
            })


            $("#monitorshow8").remove();
        }else {
            $("#show9").next(".bootstrap-table").css({
                display: "none"
            })


            $("#show9 div:first").css({
                display: "block"
            })


            $("#monitorshow9").remove();
        }

        $('#'+myparameter.ElementId).show();

        // $('#'+myparameter.ElementId).siblings().remove();

        var show_Chart =map_chart[myparameter.ElementId];

        if(!show_Chart){
            show_Chart = echarts.init(document.getElementById(myparameter.ElementId));
            //存储chart
            map_chart[myparameter.ElementId]=show_Chart;
        }else{
            //清空
            show_Chart.clear();
        }

        onLoad(myparameter,show_Chart);


        // if (myparameter.ElementId="show"){
        //     $("#show div:first").css({
        //         display: "block"
        //     })
        //     $("#monitorshow").remove();
        //     $("#show").next(".bootstrap-table").css({
        //         display: "none"
        //     })
        //
        // }else if(myparameter.ElementId="show1"){
        //     $("#show1 div:first").css({
        //         display: "block"
        //     })
        //     $("#monitorshow1").remove();
        //     $("#show1").next(".bootstrap-table").css({
        //         display: "none"
        //     })
        // }else if(myparameter.ElementId="show2"){
        //     $("#show2 div:first").css({
        //         display: "block"
        //     })
        //     $("#monitorshow2").remove();
        //     $("#show2").next(".bootstrap-table").css({
        //         display: "none"
        //     })
        // }else if(myparameter.ElementId="show3"){
        //     $("#show3 div:first").css({
        //         display: "block"
        //     })
        //     $("#monitorshow3").remove();
        //     $("#show3").next(".bootstrap-table").css({
        //         display: "none"
        //     })
        // }else if(myparameter.ElementId="show4"){
        //     $("#show4 div:first").css({
        //         display: "block"
        //     })
        //     $("#monitorshow4").remove();
        //     $("#show4").next(".bootstrap-table").css({
        //         display: "none"
        //     })
        // }else if(myparameter.ElementId="show5"){
        //     $("#show5 div:first").css({
        //         display: "block"
        //     })
        //     $("#monitorshow5").remove();
        //     $("#show5").next(".bootstrap-table").css({
        //         display: "none"
        //     })
        // }else if(myparameter.ElementId="show5"){
        //     $("#show5 div:first").css({
        //         display: "block"
        //     })
        //     $("#show6").next(".bootstrap-table").css({
        //         display: "none"
        //     })
        //     $("#monitorshow5").remove();
        // }else if(myparameter.ElementId="show6"){
        //     $("#show6 div:first").css({
        //         display: "block"
        //     })
        //     $("#monitorshow6").remove();
        //     $("#show6").next(".bootstrap-table").css({
        //         display: "none"
        //     })
        // }else if(myparameter.ElementId="show7"){
        //     $("#show7 div:first").css({
        //         display: "block"
        //     })
        //     $("#monitorshow7").remove();
        //     $("#show7").next(".bootstrap-table").css({
        //         display: "none"
        //     })
        // }else if(myparameter.ElementId="show8"){
        //     $("#show8 div:first").css({
        //         display: "block"
        //     })
        //     $("#monitorshow8").remove();
        //     $("#show8").next(".bootstrap-table").css({
        //         display: "none"
        //     })
        // }else if (myparameter.ElementId="show9"){
        //     $("#show9 div:first").css({
        //         display: "block"
        //     })
        //     $("#monitorshow9").remove();
        //     $("#show9").next(".bootstrap-table").css({
        //         display: "none"
        //     })
        // }else {
        //     console.log(1)
        // }




    }


}


function setTable(id,columns,data,table){

    $('#'+id).bootstrapTable({
        cache: false,//是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        height: table.height,
        striped: true,//是否显示行间隔色
        pagination: table.pagination,  //是否显示分页（*）
        pageSize: 20,//每页的记录行数（*）
        pageNumber:1,//初始化加载第一页，默认第一页
        pageList: [10, 20, 50, 100, 200, 500],//可供选择的每页的行数（*）
        search: table.search,//是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        showColumns: table.showColumns,
        showRefresh: table.showRefresh,
        showExport: table.showExport,
        exportTypes: ['csv','txt','xml'],
        clickToSelect: true,
        columns: columns,
        data : data,
        onPageChange: function (size, number) {
            //$("#pageSizeInput").val(size);
            //$("#pageNumberInput").val(number);

            //var form = $('#tableForm');
            //form.action= '${base}/showReport';
            //form.submit();
        },
        //onSort: function (name, order) {
        // },
        //formatShowingRows: function (pageFrom, pageTo, totalRows) {
        //	return '';
        // },
        //formatRecordsPerPage: function () {
        //	return '';
        //  },
        formatNoMatches: function(){
            return '无符合条件的记录';
        }
    });



    $(window).resize(function () {
        $('#'+id).bootstrapTable('resetView');
    });
}


//线图
function setLine(myparameter,data) {
    //数据处理
    var config = setLineConfig(myparameter,data);

    var show_option =  {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        dataZoom: [

            {
                show: true,
                realtime: true,
                // startValue:0,
                // endValue:4

                start: 65,
                end: 85
            },
            {
                type: 'inside',
                realtime: true,
                start: 65,
                end: 85
//                    startValue:1,
//                    endValue:xAxis.data[index]
            }
        ],
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: config.date,
            axisLabel: {
                show: true,
                textStyle: {
                    fontFamily:myparameter.fontFamily,
                    color: myparameter.color,
                    fontSize:myparameter.fontSize
                }
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            axisLabel: {
                show: true,
                textStyle: {
                    fontFamily:myparameter.fontFamily,
                    color: myparameter.color,
                    fontSize:myparameter.fontSize
                }
            }
        },

        series:config.series
    };
    return show_option;
}

//饼图
function setPie(myparameter,data) {
    //数据处理
    var config = setPieConfig(myparameter,data);

    var show_option =   {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:config.name,
                type:'pie',
                radius: ['25%', '40%'],
                label: {
                    normal: {
                        textStyle:{
                            color:myparameter.color,
                            fontSize:myparameter.fontSize,
                            fontFamily:myparameter.fontFamily
                        }
                    }
                },
                data:config.data
            }
        ]
    };

    return show_option;
}

//柱形图
function setBar(myparameter,data) {

    //数据处理
    var config = setBarConfig(myparameter,data);
    var show_option =  {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        dataZoom: [

            {
                show: true,
                realtime: true,
                // startValue:0,
                // endValue:4

                start: 65,
                end: 85
            },
            {
                type: 'inside',
                realtime: true,
                start: 65,
                end: 85
//                    startValue:1,
//                    endValue:xAxis.data[index]
            }
        ],
        xAxis : [
            {
                type : 'category',
                data : config.date,
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontFamily:myparameter.fontFamily,
                        color: myparameter.color,
                        fontSize:myparameter.fontSize
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontFamily:myparameter.fontFamily,
                        color: myparameter.color,
                        fontSize:myparameter.fontSize
                    }
                }
            }
        ],
        series :  config.series
    };

    return show_option;
}

function  setPieConfig(myparameter,data) {
    var config={};
    config["name"]=myparameter.dataType;
    switch (myparameter.dataType){
        case 'cpu':
            config["data"]=[
                {value:data.cpu, name:'已使用'},
                {value:100-data.cpu, name:'未使用'}
            ]
            break;
        case "memory":
            config["data"]=[
                {value:data.mem, name:'已使用'},
                {value:100-data.mem, name:'未使用'}
            ]
            break;
        case "disk":
            config["data"]=[
                {value:data.diskread, name:'磁盘读取'},
                {value:data.diskwrite, name:'磁盘写入'}
            ]
            break;
        case "net":
            config["data"]=[
                {value:data.netin, name:'网络流入'},
                {value:data.netout, name:'网络流出'}
            ]
            break;
        case '1':
            //终端信息
            config["name"]="终端信息";
            config["data"]=[]
            Linedate={};
            for(var k=0;k<data.length;k++){
                var mydata=data[k];
                var op = mydata.vda_os_name;
                if(op){
                    if(Linedate[op]){
                        Linedate[op]=Linedate[op]+1;
                    }else{
                        Linedate[op]=1;
                    }

                }
            }
            for(key in Linedate)  {
                var vda={value:Linedate[key], name:key};
                config["data"].push(vda);
            }
            break;
        case '2':
            //系统行为 软件使用频率
            Linedate={};
            config["name"]="系统行为";
            for(var k=0;k<data.length;k++){
                var mydata=data[k];

                if(mydata.vda_sub_type=1&&mydata.vda_content){
                    if(Linedate[mydata.vda_content]){
                        Linedate[mydata.vda_content]=Linedate[mydata.vda_content]+1;
                    }else{
                        Linedate[mydata.vda_content]=1;
                    }

                }
            }
            config["data"]= [];
            for(key in Linedate)  {
                var vda={value:Linedate[key], name:key};
                config["data"].push(vda);
            }
            break;
        case '3':
            //网络连接  外部IP
            config["name"]="网络连接";
            Linedate={};
            for(var k=0;k<data.length;k++){
                var mydata=data[k];
                var vda_tcp_info=mydata.vda_tcp_info;
                for(var j=0;j<vda_tcp_info.length;j++){
                    var tcp_info=vda_tcp_info[j];
                    if(tcp_info.vda_dip){
                        if(Linedate[tcp_info.vda_dip]){
                            Linedate[tcp_info.vda_dip]=Linedate[tcp_info.vda_dip]+1;
                        }else{
                            Linedate[tcp_info.vda_dip]=1;
                        }
                    }
                }
            }
            config["data"]= [];
            for(key in Linedate)  {
                var vda={value:Linedate[key], name:key};
                config["data"].push(vda);
            }

            break;
        case '4':
            //文件操作
            config["name"]="文件操作";
            Linedate={};
            for(var k=0;k<data.length;k++){
                var mydata=data[k];
                var op;
                switch (mydata.vda_op){
                    case '1':
                        var op="文件新建";
                        break;
                    case '2':
                        var op="文件复制";
                        break;
                    case '3':
                        var op="文件删除";
                        break;
                    case '4':
                        var op="文件修改";
                        break;
                    case '5':
                        var op="文件重命名";
                        break;
                    case '6':
                        var op="U盘挂载";
                        break;
                    case '7':
                        var op="U盘卸载";
                        break;
                    case '8':
                        var op="打印";
                        break;
                }

                if(Linedate[op]){
                    Linedate[op]=Linedate[op]+1;
                }else{
                    Linedate[op]=1;
                }

            }
            config["data"]= [];
            for(key in Linedate)  {
                var vda={value:Linedate[key], name:key};
                config["data"].push(vda);
            }

            break;
        case '5':
            //应用进程行为
            config["name"]="应用进程行为";
            Linedate={};
            for(var k=0;k<data.length;k++){
                var mydata=data[k];
                var op=mydata.vda_app_name;
                if(op){
                    if(Linedate[op]){
                        Linedate[op]=Linedate[op]+1;
                    }else{
                        Linedate[op]=1;
                    }
                }
            }
            config["data"]= [];
            for(key in Linedate)  {
                var vda={value:Linedate[key], name:key};
                config["data"].push(vda);
            }
            break;
        case '6':
            //web应用行为
            config["name"]="web应用行为";
            Linedate={};
            for(var k=0;k<data.length;k++){
                var mydata=data[k];
                var op=mydata.vda_app_svr_domain;
                if(op){
                    if(Linedate[op]){
                        Linedate[op]=Linedate[op]+1;
                    }else{
                        Linedate[op]=1;
                    }
                }
            }
            config["data"]= [];
            for(key in Linedate)  {
                var vda={value:Linedate[key], name:key};
                config["data"].push(vda);
            }
            break;
        case '7':
            //邮件行为
            config["name"]="邮件行为";
            Linedate={};
            for(var k=0;k<data.length;k++){
                var mydata=data[k];

                var op;
                if(mydata.vda_op==1){
                    op=mydata.vda_to_name;
                }else{
                    op=mydata.vda_from_name;
                }
                if(op){
                    if(Linedate[op]){
                        Linedate[op]=Linedate[op]+1;
                    }else{
                        Linedate[op]=1;
                    }
                }
            }
            config["data"]= [];
            for(key in Linedate)  {
                var vda={value:Linedate[key], name:key};
                config["data"].push(vda);
            }
            break;
        case '8':
            //文件传输
            config["name"]="文件传输";
            Linedate={};
            for(var k=0;k<data.length;k++){
                var mydata=data[k];

                var op=mydata.vda_ftp_dip;

                if(op){
                    if(Linedate[op]){
                        Linedate[op]=Linedate[op]+1;
                    }else{
                        Linedate[op]=1;
                    }
                }
            }
            config["data"]= [];
            for(key in Linedate)  {
                var vda={value:Linedate[key], name:key};
                config["data"].push(vda);
            }
            break;
        case '9':
            //网卡
            config["name"]="网卡";
            Linedate={};
            LinedataA=0;
            LinedataB=0;
            for(var k=0;k<data.length;k++){
                var mydata=data[k];

                var vda_nic_info=mydata.vda_nic_info;
                for(var j=0;j<vda_nic_info.length;j++){
                    var nic_info=vda_nic_info[j];
                    if(nic_info){

                        var myinfo = nic_info.split(":");
                        var op = myinfo[0];

                        if(op&&myinfo[2]&&myinfo[3]){
                            if(Linedate[op]){
                                Linedate[op]=[(Linedate[op][0]+myinfo[2]),(Linedate[op][1]+myinfo[3])];
                            }else{
                                Linedate[op]=[myinfo[2],myinfo[3]];
                            }
                        }

                        /* var op = nic_info.vda_name;

                         if(op&&nic_info.vda_send&&nic_info.vda_recv){
                         if(Linedate[op]){
                         Linedate[op]=[(Linedate[op][0]+nic_info.vda_send),(Linedate[op][1]+nic_info.vda_recv)];
                         }else{
                         Linedate[op]=[0,0];
                         }
                         }*/
                    }
                }
            }
            config["data"]= [];
            for(key in Linedate)  {
                LinedataA=LinedataA+Linedate[key][0];
                LinedataB=LinedataB+Linedate[key][1];
            }
            var vda={value:LinedataA, name:"网卡发送数据"};
            config["data"].push(vda);
            var vda={value:LinedataB, name:"网卡接收数据"};
            config["data"].push(vda);
            break;
    }
    return config;
}


function setConfig(myparameter,data,type) {
    //获取历史数据
    var Linedate=map_linedate[myparameter.ElementId];
    var Linedata=map_linedata[myparameter.ElementId];
    //判断 Linedate Linedata 是否为空   Linedata=[]; Linedate=[];
    var LinedataA=map_linedataA[myparameter.ElementId];
    var LinedataB=map_linedataB[myparameter.ElementId];
    if(!Linedata){
        Linedata=[];
    }
    if(!Linedate){
        Linedate=[];
    }
    if(!LinedataA){
        LinedataA=[];
    }
    if(!LinedataB){
        LinedataB=[];
    }

    var config={};
    config["name"]=myparameter.dataType;
    var now = new Date();

    switch (myparameter.dataType){
        case 'cpu':
            Linedata.push(data.cpu);
            Linedate.push(now.toLocaleTimeString().replace(/^\D*/,''));
            config["date"]= Linedate;

            map_linedate[myparameter.ElementId]=Linedate;
            map_linedata[myparameter.ElementId]=Linedata;
            config["series"] =[
                {
                    name:myparameter.dataType,
                    type:type,

                    label: {
                        normal: {
                            textStyle:{
                                color:myparameter.color,
                                fontSize:myparameter.fontSize,
                                fontFamily:myparameter.fontFamily
                            }
                        }
                    },

                    data: Linedata
                }
            ]

            break;
        case "memory":
            Linedata.push(data.mem);
            Linedate.push(now.toLocaleTimeString().replace(/^\D*/,''));
            config["date"]= Linedate;
            map_linedate[myparameter.ElementId]=Linedate;
            map_linedata[myparameter.ElementId]=Linedata;
            config["series"] =[
                {
                    name:myparameter.dataType,
                    type:type,
                    label: {
                        normal: {
                            textStyle:{
                                color:myparameter.color,
                                fontSize:myparameter.fontSize,
                                fontFamily:myparameter.fontFamily
                            }
                        }
                    },

                    data: Linedata
                }
            ]
            break;
        case "disk":
            LinedataA.push(data.diskread);
            LinedataB.push(data.diskwrite);
            Linedate.push(now.toLocaleTimeString().replace(/^\D*/,''));
            config["date"]= Linedate;

            map_linedate[myparameter.ElementId]=Linedate;
            map_linedataA[myparameter.ElementId]=LinedataA;
            map_linedataB[myparameter.ElementId]=LinedataB;
            config["series"] =[
                {
                    name:'磁盘读取',
                    type:type,
                    label: {
                        normal: {
                            textStyle:{
                                color:myparameter.color,
                                fontSize:myparameter.fontSize,
                                fontFamily:myparameter.fontFamily
                            }
                        }
                    },

                    data: LinedataA
                }, {
                    name:'磁盘写入',
                    type:type,
                    label: {
                        normal: {
                            textStyle:{
                                color:myparameter.color,
                                fontSize:myparameter.fontSize,
                                fontFamily:myparameter.fontFamily
                            }
                        }
                    },

                    data: LinedataB
                }
            ]
            break;
        case "net":
            LinedataA.push(data.netin);
            LinedataB.push(data.netout);
            Linedate.push(now.toLocaleTimeString().replace(/^\D*/,''));
            config["date"]= Linedate;

            map_linedate[myparameter.ElementId]=Linedate;
            map_linedataA[myparameter.ElementId]=LinedataA;
            map_linedataB[myparameter.ElementId]=LinedataB;
            config["series"] =[
                {
                    name:'网络流入',
                    type:type,
                    label: {
                        normal: {
                            textStyle:{
                                color:myparameter.color,
                                fontSize:myparameter.fontSize,
                                fontFamily:myparameter.fontFamily
                            }
                        }
                    },

                    data: LinedataA
                }, {
                    name:'网络流出',
                    type:type,
                    label: {
                        normal: {
                            textStyle:{
                                color:myparameter.color,
                                fontSize:myparameter.fontSize,
                                fontFamily:myparameter.fontFamily
                            }
                        }
                    },

                    data: LinedataB
                }
            ]
            break;
        case '1':
            //终端信息
            Linedate=[];
            Linedata=[];
            for(var k=0;k<data.length;k++){
                var mydata=data[k];
                Linedate.push(dateFormatUtil(mydata.vda_op_time));
                Linedata.push(mydata.vda_soft_install_info.length)
            }
            config["date"]= Linedate;

            config["series"] =[
                {
                    name:'系统安装软件数量',
                    type:type,
                    label: {
                        normal: {
                            textStyle:{
                                color:myparameter.color,
                                fontSize:myparameter.fontSize,
                                fontFamily:myparameter.fontFamily
                            }
                        }
                    },

                    data: Linedata
                }
            ]
            break;
        case '2':
            //系统行为 软件使用频率
            Linedate={};
            Linedata=[];

            for(var k=0;k<data.length;k++){
                var mydata=data[k];

                if(mydata.vda_sub_type=1&&mydata.vda_content){
                    if(Linedate[mydata.vda_content]){
                        Linedate[mydata.vda_content]=Linedate[mydata.vda_content]+1;
                    }else{
                        Linedate[mydata.vda_content]=1;
                    }

                }

            }
            config["date"]= [];

            for(key in Linedate)  {
                config["date"].push(key);
                Linedata.push(Linedate[key]);
            }
            config["series"]=[{
                name:"软件使用频率",
                type:type,
                label: {
                    normal: {
                        textStyle:{
                            color:myparameter.color,
                            fontSize:myparameter.fontSize,
                            fontFamily:myparameter.fontFamily
                        }
                    }
                },
                data: Linedata
            }]

            break;
        case '3':
            //网络连接  外部IP
            Linedate={};
            Linedata=[];

            for(var k=0;k<data.length;k++){
                var mydata=data[k];
                var vda_tcp_info=mydata.vda_tcp_info;

                for(var j=0;j<vda_tcp_info.length;j++){
                    var tcp_info=vda_tcp_info[j];
                    if(tcp_info.vda_dip){
                        if(Linedate[tcp_info.vda_dip]){
                            Linedate[tcp_info.vda_dip]=Linedate[tcp_info.vda_dip]+1;
                        }else{
                            Linedate[tcp_info.vda_dip]=1;
                        }
                    }
                }
            }
            config["date"]= [];
            for(key in Linedate)  {
                config["date"].push(key);
                Linedata.push(Linedate[key]);
            }
            config["series"]=[{
                name:"外部IP",
                type:type,
                label: {
                    normal: {
                        textStyle:{
                            color:myparameter.color,
                            fontSize:myparameter.fontSize,
                            fontFamily:myparameter.fontFamily
                        }
                    }
                },
                data: Linedata
            }]
            break;
        case '4':
            //文件操作
            Linedate={};
            Linedata=[];

            for(var k=0;k<data.length;k++){
                var mydata=data[k];
                var op;
                switch (mydata.vda_op){
                    case '1':
                        var op="文件新建";
                        break;
                    case '2':
                        var op="文件复制";
                        break;
                    case '3':
                        var op="文件删除";
                        break;
                    case '4':
                        var op="文件修改";
                        break;
                    case '5':
                        var op="文件重命名";
                        break;
                    case '6':
                        var op="U盘挂载";
                        break;
                    case '7':
                        var op="U盘卸载";
                        break;
                    case '8':
                        var op="打印";
                        break;
                }

                if(Linedate[op]){
                    Linedate[op]=Linedate[op]+1;
                }else{
                    Linedate[op]=1;
                }

            }
            config["date"]= [];
            for(key in Linedate)  {
                config["date"].push(key);
                Linedata.push(Linedate[key]);
            }
            config["series"]=[{
                name:"文件操作",
                type:type,
                label: {
                    normal: {
                        textStyle:{
                            color:myparameter.color,
                            fontSize:myparameter.fontSize,
                            fontFamily:myparameter.fontFamily
                        }
                    }
                },
                data: Linedata
            }]
            break;
        case '5':
            //应用进程行为
            Linedate={};
            Linedata=[];

            for(var k=0;k<data.length;k++){
                var mydata=data[k];
                var op=mydata.vda_app_name;
                if(op){
                    if(Linedate[op]){
                        Linedate[op]=Linedate[op]+1;
                    }else{
                        Linedate[op]=1;
                    }
                }


            }
            config["date"]= [];
            for(key in Linedate)  {
                config["date"].push(key);
                Linedata.push(Linedate[key]);
            }
            config["series"]=[{
                name:"应用程序",
                type:type,
                label: {
                    normal: {
                        textStyle:{
                            color:myparameter.color,
                            fontSize:myparameter.fontSize,
                            fontFamily:myparameter.fontFamily
                        }
                    }
                },
                data: Linedata
            }]
            break;
        case '6':
            //web应用行为
            Linedate={};
            Linedata=[];

            for(var k=0;k<data.length;k++){
                var mydata=data[k];
                var op=mydata.vda_app_svr_domain;
                if(op){
                    if(Linedate[op]){
                        Linedate[op]=Linedate[op]+1;
                    }else{
                        Linedate[op]=1;
                    }
                }


            }
            config["date"]= [];
            for(key in Linedate)  {
                config["date"].push(key);
                Linedata.push(Linedate[key]);
            }
            config["series"]=[{
                name:"访问地址统计",
                type:type,
                label: {
                    normal: {
                        textStyle:{
                            color:myparameter.color,
                            fontSize:myparameter.fontSize,
                            fontFamily:myparameter.fontFamily
                        }
                    }
                },
                data: Linedata
            }]
            break;
        case '7':
            //邮件行为
            Linedate={};
            Linedata=[];

            for(var k=0;k<data.length;k++){
                var mydata=data[k];

                var op;
                if(mydata.vda_op==1){
                    op=mydata.vda_to_name;
                }else{
                    op=mydata.vda_from_name;
                }
                if(op){
                    if(Linedate[op]){
                        Linedate[op]=Linedate[op]+1;
                    }else{
                        Linedate[op]=1;
                    }
                }
            }
            config["date"]= [];
            for(key in Linedate)  {
                config["date"].push(key);
                Linedata.push(Linedate[key]);
            }
            config["series"]=[{
                name:"邮件往来账户",
                type:type,
                label: {
                    normal: {
                        textStyle:{
                            color:myparameter.color,
                            fontSize:myparameter.fontSize,
                            fontFamily:myparameter.fontFamily
                        }
                    }
                },
                data: Linedata
            }]
            break;
        case '8':
            //文件传输
            Linedate={};
            Linedata=[];

            for(var k=0;k<data.length;k++){
                var mydata=data[k];

                var op=mydata.vda_ftp_dip;

                if(op){
                    if(Linedate[op]){
                        Linedate[op]=Linedate[op]+1;
                    }else{
                        Linedate[op]=1;
                    }
                }
            }
            config["date"]= [];
            for(key in Linedate)  {
                config["date"].push(key);
                Linedata.push(Linedate[key]);
            }
            config["series"]=[{
                name:"目的IP",
                type:type,
                label: {
                    normal: {
                        textStyle:{
                            color:myparameter.color,
                            fontSize:myparameter.fontSize,
                            fontFamily:myparameter.fontFamily
                        }
                    }
                },
                data: Linedata
            }]
            break;
        case '9':
            //网卡
            Linedate={};
            LinedataA=[];
            LinedataB=[];
            for(var k=0;k<data.length;k++){
                var mydata=data[k];

                var vda_nic_info=mydata.vda_nic_info;
                for(var j=0;j<vda_nic_info.length;j++){
                    var nic_info=vda_nic_info[j];
                    if(nic_info){

                        var myinfo = nic_info.split(":");
                        var op = myinfo[0];

                        if(op&&myinfo[2]&&myinfo[3]){
                            if(Linedate[op]){
                                Linedate[op]=[(Linedate[op][0]+myinfo[2]),(Linedate[op][1]+myinfo[3])];
                            }else{
                                Linedate[op]=[myinfo[2],myinfo[3]];
                            }
                        }

                        /* var op = nic_info.vda_name;

                         if(op&&nic_info.vda_send&&nic_info.vda_recv){
                         if(Linedate[op]){
                         Linedate[op]=[(Linedate[op][0]+nic_info.vda_send),(Linedate[op][1]+nic_info.vda_recv)];
                         }else{
                         Linedate[op]=[0,0];
                         }
                         }*/
                    }
                }


            }
            config["date"]= [];
            for(key in Linedate)  {
                config["date"].push(key);
                LinedataA.push(Linedate[key][0]);
                LinedataB.push(Linedate[key][1]);
            }
            config["series"]=[{
                name:"网卡发送数据",
                type:type,
                label: {
                    normal: {
                        textStyle:{
                            color:myparameter.color,
                            fontSize:myparameter.fontSize,
                            fontFamily:myparameter.fontFamily
                        }
                    }
                },
                data: LinedataA
            },{
                name:"网卡接收数据",
                type:type,
                label: {
                    normal: {
                        textStyle:{
                            color:myparameter.color,
                            fontSize:myparameter.fontSize,
                            fontFamily:myparameter.fontFamily
                        }
                    }
                },
                data: LinedataB
            }]
            break;

    }
    return config;
}


function  setLineConfig(myparameter,data) {
    return setConfig(myparameter,data,"line");
}


function  setBarConfig(myparameter,data) {
    return setConfig(myparameter,data,"bar");
}




//-----------------------------------------工具类----------------------------------------------------------------------------
/*
 时间格式化工具
 把Long类型的yyyy-MM-dd日期还原yyyy-MM-dd格式日期
 */
function dateFormatUtil(longTypeDate){
    var dateTypeDate = "";
    var date = new Date();
    date.setTime(longTypeDate);
    dateTypeDate += date.getFullYear();   //年
    dateTypeDate += "-" + getMonth(date); //月
    dateTypeDate += "-" + getDay(date);   //日
    return dateTypeDate;
}

//返回 01-12 的月份值
function getMonth(date){
    var month = "";
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if(month<10){
        month = "0" + month;
    }
    return month;
}

//返回01-30的日期
function getDay(date){
    var day = "";
    day = date.getDate();
    if(day<10){
        day = "0" + day;
    }
    return day;
}


function getMyData(mdataType) {
    var data;
    switch (mdataType){
        case "1":
            data=[
                {
                    "vda_log_type": "1",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_op_time": "1489112464",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_hostname": "WIN7-64-PC",
                    "vda_os_name": "Microsoft Windows 7 旗舰版 ",
                    "vda_os_version": "6.1.7600",
                    "vda_os_ins_date": "2016/12/5, 16:30:46",
                    "vda_pmem": "2047",
                    "vda_vmem": "4095",
                    "vda_act": "1",
                    "vda_mac": "00-0C-29-F0-85-46",
                    "vda_mgmt_port": "20000",
                    "vda_cpu_info": "Installed 1  CPUs   [01]: Intel64 Family 6 Model 62 Stepping 4 GenuineIntel ~1800 Mhz",
                    "vda_disk_info": [
                        "C:19.90:85.10"
                    ],
                    "vda_soft_install_info": [
                        "Angry IP Scanner:Angry IP Scanner:3.5:-",
                        "Definition update for Microsoft Office 2010 (KB982726):Microsoft:-:-",
                        "FileZilla Client 3.24.0:Tim Kosse:3.24.0:-",
                        "Foxmail:腾讯公司:7.2:-",
                        "Google Chrome:Google Inc.:43.0.2357.130:20161227",
                        "Google Update Helper:Google Inc.:1.3.26.9:20161227",
                        "HTTP Analyzer Std V7.5.4:IEInspector Software:7.5.4:20161228",
                        "Java 8 Update 111:Oracle Corporation:8.0.1110.14:20161226",
                        "Java Auto Updater:Oracle Corporation:2.8.111.14:20161226",
                        "Microsoft Office Access MUI (Chinese (Simplified)) 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office Excel MUI (Chinese (Simplified)) 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office IME (Chinese (Simplified)) 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office Office 64-bit Components 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office OneNote MUI (Chinese (Simplified)) 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office Outlook MUI (Chinese (Simplified)) 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office PowerPoint MUI (Chinese (Simplified)) 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office Professional 2010:Microsoft Corporation:14.0.4763.1000:-",
                        "Microsoft Office Proof (Chinese (Simplified)) 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office Proof (English) 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office Proofing (Chinese (Simplified)) 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office Publisher MUI (Chinese (Simplified)) 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office Shared 64-bit MUI (Chinese (Simplified)) 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office Shared MUI (Chinese (Simplified)) 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office Single Image 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Office Word MUI (Chinese (Simplified)) 2010:Microsoft Corporation:14.0.4763.1000:20161205",
                        "Microsoft Outlook Social Connector (KB2289116) 穝:Microsoft:-:-",
                        "Microsoft Outlook Social Connector 更新 (KB2289116):Microsoft:-:-",
                        "Microsoft Visual C++ 2008 Redistributable - x64 9.0.30729.6161:Microsoft Corporation:9.0.30729.6161:20161205",
                        "Microsoft Visual C++ 2008 Redistributable - x86 9.0.30729.4148:Microsoft Corporation:9.0.30729.4148:20161205",
                        "PL/SQL Developer 10.0.2.1697:Allround Automations:10.0.2.1697:-",
                        "Security Update for Microsoft Office 2010 (KB2289078):Microsoft:-:-",
                        "Security Update for Microsoft Office 2010 (KB2289161):Microsoft:-:-",
                        "Security Update for Microsoft Publisher 2010 (KB2409055):Microsoft:-:-",
                        "Security Update for Microsoft Word 2010 (KB2345000):Microsoft:-:-",
                        "SoftPerfect Network Scanner version 7.0.1:SoftPerfect:7.0.1:20161226",
                        "Splunk Enterprise:Splunk, Inc.:6.3.3.0:20161227",
                        "Update for Microsoft Office 2010 (KB2202188):Microsoft:-:-",
                        "Update for Microsoft Office 2010 (KB2413186):Microsoft:-:-",
                        "Update for Microsoft OneNote 2010 (KB2433299):Microsoft:-:-",
                        "VMware Tools:VMware, Inc.:9.4.0.1280544:20161205",
                        "VNC Server 5.2.2:RealVNC Ltd:5.2.2:20170308",
                        "VNC Viewer 5.2.2:RealVNC Ltd:5.2.2:20170308",
                        "Web Companion:Lavasoft:2.3.1479.2868:20170224",
                        "WinPcap 4.1.3:Riverbed Technology, Inc.:4.1.0.2980:-",
                        "WinSCP 5.9:Martin Prikryl:5.9:20170224",
                        "Wireshark 2.0.0 (64-bit):The Wireshark developer community, https://www.wireshark.org:2.0.0:-"
                    ]
                }
            ]
            break;
        case "2":
            data=[
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "0",
                    "vda_op_time": "1489112464",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "1",
                    "vda_op_time": "1489112464",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "4348",
                    "vda_content": "VDA_File_Monitor.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "1",
                    "vda_op_time": "1489112468",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "TSTheme.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "3",
                    "vda_op_time": "1489112471",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "10880",
                    "vda_content": "filezilla.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "4",
                    "vda_op_time": "1489112472",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "FileZilla"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "5",
                    "vda_op_time": "1489112473",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "检查更新"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "6",
                    "vda_op_time": "1489112474",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "检查更新"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "8",
                    "vda_op_time": "1489112476",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "4992",
                    "vda_content": "fzsftp.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "8",
                    "vda_op_time": "1489112476",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "3104",
                    "vda_content": "conhost.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "11",
                    "vda_op_time": "1489112480",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "7540",
                    "vda_content": "fzsftp.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "11",
                    "vda_op_time": "1489112480",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "3140",
                    "vda_content": "conhost.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "15",
                    "vda_op_time": "1489112486",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "sftp://root@192.168.20.52 - FileZilla"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "16",
                    "vda_op_time": "1489112487",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "fzsftp.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "16",
                    "vda_op_time": "1489112487",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "conhost.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "16",
                    "vda_op_time": "1489112487",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "fzsftp.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "16",
                    "vda_op_time": "1489112487",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "conhost.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "17",
                    "vda_op_time": "1489112488",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "12512",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "21",
                    "vda_op_time": "1489112498",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "Foxmail"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "22",
                    "vda_op_time": "1489112499",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "6872",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "25",
                    "vda_op_time": "1489112502",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "filezilla.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "29",
                    "vda_op_time": "1489112508",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "128",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "29",
                    "vda_op_time": "1489112508",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "测试内容 - 写邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "31",
                    "vda_op_time": "1489112510",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "发送邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "31",
                    "vda_op_time": "1489112510",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "测试内容 - 写邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "32",
                    "vda_op_time": "1489112511",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "33",
                    "vda_op_time": "1489112512",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "发送邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "34",
                    "vda_op_time": "1489112513",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "24852",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "41",
                    "vda_op_time": "1489112522",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "111 - 写邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "42",
                    "vda_op_time": "1489112523",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "42",
                    "vda_op_time": "1489112523",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "发送邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "42",
                    "vda_op_time": "1489112523",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "111 - 写邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "46",
                    "vda_op_time": "1489112527",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "35900",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "58",
                    "vda_op_time": "1489112539",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "发送邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "60",
                    "vda_op_time": "1489112541",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "测试内容 - 写邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "62",
                    "vda_op_time": "1489112543",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "62",
                    "vda_op_time": "1489112543",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "发送邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "62",
                    "vda_op_time": "1489112543",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "测试内容 - 写邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "65",
                    "vda_op_time": "1489112546",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "24796",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "74",
                    "vda_op_time": "1489112555",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "发送邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "76",
                    "vda_op_time": "1489112557",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "测试内容 - 写邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "78",
                    "vda_op_time": "1489112559",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "78",
                    "vda_op_time": "1489112559",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "发送邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "78",
                    "vda_op_time": "1489112559",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "测试内容 - 写邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "81",
                    "vda_op_time": "1489112562",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "35868",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "81",
                    "vda_op_time": "1489112562",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "发送邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "83",
                    "vda_op_time": "1489112565",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "测试内容 - 写邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "85",
                    "vda_op_time": "1489112567",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "85",
                    "vda_op_time": "1489112567",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "发送邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "85",
                    "vda_op_time": "1489112567",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "测试内容 - 写邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "88",
                    "vda_op_time": "1489112570",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "4428",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "98",
                    "vda_op_time": "1489112583",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "128",
                    "vda_content": "SecureCRT.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "99",
                    "vda_op_time": "1489112589",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "15160",
                    "vda_content": "SecureCRT.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "99",
                    "vda_op_time": "1489112589",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "SecureCRT.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "100",
                    "vda_op_time": "1489112590",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "SecureCRT"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "100",
                    "vda_op_time": "1489112590",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "not connected - SecureCRT"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "104",
                    "vda_op_time": "1489112594",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "发送邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "106",
                    "vda_op_time": "1489112596",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "Foxmail"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "107",
                    "vda_op_time": "1489112597",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "107",
                    "vda_op_time": "1489112597",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "108",
                    "vda_op_time": "1489112598",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "34688",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "108",
                    "vda_op_time": "1489112598",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "28372",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "108",
                    "vda_op_time": "1489112598",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "Foxmail"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "111",
                    "vda_op_time": "1489112601",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "30808",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "111",
                    "vda_op_time": "1489112601",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "测试内容 - 写邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "112",
                    "vda_op_time": "1489112602",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "发送邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "112",
                    "vda_op_time": "1489112602",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "测试内容 - 写邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "113",
                    "vda_op_time": "1489112603",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "115",
                    "vda_op_time": "1489112605",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "发送邮件"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "115",
                    "vda_op_time": "1489112606",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "35148",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "116",
                    "vda_op_time": "1489112607",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "Foxmail"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "117",
                    "vda_op_time": "1489112609",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "117",
                    "vda_op_time": "1489112609",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "118",
                    "vda_op_time": "1489112610",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "SecureCRT"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "119",
                    "vda_op_time": "1489112612",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "Enter Secure Shell Password"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "120",
                    "vda_op_time": "1489112613",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "123",
                    "vda_op_time": "1489112616",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "Enter Secure Shell Password"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "129",
                    "vda_op_time": "1489112624",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "Foxmail.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "130",
                    "vda_op_time": "1489112625",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "SecureCRT"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "131",
                    "vda_op_time": "1489112626",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "192.168.20.52 - SecureCRT"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "131",
                    "vda_op_time": "1489112626",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "SecureCRT"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "132",
                    "vda_op_time": "1489112627",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "124",
                    "vda_content": "plsqldev.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "132",
                    "vda_op_time": "1489112627",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "SecureCRT.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "134",
                    "vda_op_time": "1489112630",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "1",
                    "vda_mem_info": "2772",
                    "vda_content": "splwow64.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "135",
                    "vda_op_time": "1489112631",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "(Not logged on)"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "136",
                    "vda_op_time": "1489112632",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "Oracle Logon"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "141",
                    "vda_op_time": "1489112695",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "Oracle Logon"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "141",
                    "vda_op_time": "1489112695",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "(Not logged on)"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "142",
                    "vda_op_time": "1489112698",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "PL/SQL Developer - (Not logged on)"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "142",
                    "vda_op_time": "1489112698",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "(Not logged on)"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "149",
                    "vda_op_time": "1489112707",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "1",
                    "vda_content": "Confirm"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "150",
                    "vda_op_time": "1489112708",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "Confirm"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "151",
                    "vda_op_time": "1489112709",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "1",
                    "vda_op": "2",
                    "vda_content": "plsqldev.exe"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "151",
                    "vda_op_time": "1489112709",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "PL/SQL Developer - (Not logged on)"
                },
                {
                    "vda_log_type": "2",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "151",
                    "vda_op_time": "1489112709",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_sub_type": "2",
                    "vda_op": "2",
                    "vda_content": "(Not logged on)"
                },
                {
                    "vda_log_type": "1",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "164",
                    "vda_op_time": "1489112749",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "2"
                }
            ]
            break
        case "3":
            data=[
                {
                    "vda_log_type": "3",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "0",
                    "vda_op_time": "1489112463",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_tcp_info": [
                        {
                            "vda_dip": "10.11.118.100",
                            "vda_dport": "20000",
                            "vda_sip": "192.168.130.10",
                            "vda_sport": "24758"
                        }
                    ]
                },
                {
                    "vda_log_type": "3",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "8",
                    "vda_op_time": "1489112477",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_tcp_info":[
                        {
                            "vda_dip": "10.11.118.100",
                            "vda_dport": "20000",
                            "vda_sip": "192.168.130.10",
                            "vda_sport": "24758"
                        }
                    ]
                },
                {
                    "vda_log_type": "3",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "10",
                    "vda_op_time": "1489112480",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_tcp_info": [
                        {
                            "vda_dip": "10.11.118.100",
                            "vda_dport": "20000",
                            "vda_sip": "192.168.130.10",
                            "vda_sport": "24758"
                        }
                    ]
                },
                {
                    "vda_log_type": "3",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "23",
                    "vda_op_time": "1489112501",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_tcp_info": [
                        {
                            "vda_dip": "10.11.118.100",
                            "vda_dport": "20000",
                            "vda_sip": "192.168.130.10",
                            "vda_sport": "24758"
                        }
                    ]
                },
                {
                    "vda_log_type": "3",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "24",
                    "vda_op_time": "1489112502",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_tcp_info": [
                        {
                            "vda_dip": "10.11.118.100",
                            "vda_dport": "20000",
                            "vda_sip": "192.168.130.10",
                            "vda_sport": "24758"
                        }
                    ]
                }
            ]
            break
        case "4":
            data=[
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "0",
                    "vda_op_time": "1489112463",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "6",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "25",
                    "vda_op_time": "1489112503",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/20/1"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "25",
                    "vda_op_time": "1489112503",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/20/1/52"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "27",
                    "vda_op_time": "1489112506",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/21/1"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "27",
                    "vda_op_time": "1489112506",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/21/1/53"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "28",
                    "vda_op_time": "1489112508",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Indexes/attach/attachInfo.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "29",
                    "vda_op_time": "1489112508",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/20/1/52"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "29",
                    "vda_op_time": "1489112509",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Indexes/attach/attachInfo.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "29",
                    "vda_op_time": "1489112509",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/22/1"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "29",
                    "vda_op_time": "1489112509",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/22/1/54"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "29",
                    "vda_op_time": "1489112509",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Indexes/attach/attachInfo.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "30",
                    "vda_op_time": "1489112510",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/22/1/54"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "30",
                    "vda_op_time": "1489112510",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Indexes/attach/attachInfo.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "31",
                    "vda_op_time": "1489112510",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Global/Address/3.0/ContactCombination.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "41",
                    "vda_op_time": "1489112522",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/23/1"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "41",
                    "vda_op_time": "1489112522",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/23/1/55"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "41",
                    "vda_op_time": "1489112522",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Indexes/attach/attachInfo.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "60",
                    "vda_op_time": "1489112541",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/24/1"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "60",
                    "vda_op_time": "1489112541",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/24/1/56"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "61",
                    "vda_op_time": "1489112542",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Global/Address/3.0/ContactCombination.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "76",
                    "vda_op_time": "1489112558",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/25/1"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "76",
                    "vda_op_time": "1489112558",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Mails/25/1/57"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "76",
                    "vda_op_time": "1489112558",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Indexes/attach/attachInfo.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "77",
                    "vda_op_time": "1489112559",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Global/Address/3.0/ContactCombination.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "77",
                    "vda_op_time": "1489112559",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Indexes/attach/attachInfo.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "84",
                    "vda_op_time": "1489112566",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Global/Address/3.0/ContactCombination.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "84",
                    "vda_op_time": "1489112566",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Indexes/attach/attachInfo.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "99",
                    "vda_op_time": "1489112588",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "5",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/SecureCRT7.2/SecureCRT.exe",
                    "vda_file_dst_path": "C:/SecureCRT7.2/SecureCRT.bak"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "99",
                    "vda_op_time": "1489112588",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/SecureCRT7.2/SecureCRT.exe"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "99",
                    "vda_op_time": "1489112589",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "5",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/SecureCRT7.2/SecureCRT.exe",
                    "vda_file_dst_path": "C:/SecureCRT7.2/SecureCRT"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "99",
                    "vda_op_time": "1489112589",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/SecureCRT7.2/SecureCRT"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "99",
                    "vda_op_time": "1489112589",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "5",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/SecureCRT7.2/SecureCRT.bak",
                    "vda_file_dst_path": "C:/SecureCRT7.2/SecureCRT.exe"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "99",
                    "vda_op_time": "1489112589",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/SecureCRT7.2/SecureCRT.exe"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "99",
                    "vda_op_time": "1489112589",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "1",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/SecureCRT7.2/SecureCRT.temp"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "99",
                    "vda_op_time": "1489112589",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "3",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/SecureCRT7.2/SecureCRT.temp"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "111",
                    "vda_op_time": "1489112601",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Indexes/attach/attachInfo.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "112",
                    "vda_op_time": "1489112602",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Global/Address/3.0/ContactCombination.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "112",
                    "vda_op_time": "1489112602",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Foxmail 7.2/Storage/lijiang6155@126.com/Indexes/attach/attachInfo.rec0"
                },
                {
                    "vda_log_type": "4",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "141",
                    "vda_op_time": "1489112696",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_op": "4",
                    "vda_udisk": "0",
                    "vda_file_src_path": "C:/Users/Administrator/Documents/plsqldoc/frame_Index.html"
                }
            ]
            break
        case "5":
            data=[
                {
                    "vda_log_type": "5",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "123",
                    "vda_op_time": "1489112616",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_app_type": "0",
                    "vda_ssid": "x0gn5g0o_0_0",
                    "vda_op": "1",
                    "vda_app_name": "SecureCRT.exe",
                    "vda_res_ip": "192.168.20.52",
                    "vda_res_acc": "root",
                    "vda_res_protocol": "ssh2"
                },
                {
                    "vda_log_type": "5",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "123",
                    "vda_op_time": "1489112616",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_app_type": "0",
                    "vda_ssid": "x0gn5g0o_0_0",
                    "vda_op": "2",
                    "vda_cmd": "ls"
                },
                {
                    "vda_log_type": "5",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "125",
                    "vda_op_time": "1489112618",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_app_type": "0",
                    "vda_ssid": "x0gn5g0o_0_0",
                    "vda_op": "2",
                    "vda_cmd": "ifconfig"
                },
                {
                    "vda_log_type": "5",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "127",
                    "vda_op_time": "1489112620",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_app_type": "0",
                    "vda_ssid": "x0gn5g0o_0_0",
                    "vda_op": "2",
                    "vda_cmd": "whoami"
                },
                {
                    "vda_log_type": "5",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "130",
                    "vda_op_time": "1489112626",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_app_type": "0",
                    "vda_ssid": "x0gn5g0o_0_0",
                    "vda_op": "3"
                },
                {
                    "vda_log_type": "5",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "148",
                    "vda_op_time": "1489112707",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_app_type": "1",
                    "vda_ssid": "x0gn5g0o_2_0",
                    "vda_op": "1",
                    "vda_app_name": "plsqldev.exe",
                    "vda_res_ip": "",
                    "vda_res_protocol": "oracle"
                },
                {
                    "vda_log_type": "5",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "148",
                    "vda_op_time": "1489112707",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_app_type": "1",
                    "vda_ssid": "x0gn5g0o_2_0",
                    "vda_op": "2",
                    "vda_cmd": "select"
                },
                {
                    "vda_log_type": "5",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "150",
                    "vda_op_time": "1489112708",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_app_type": "1",
                    "vda_ssid": "x0gn5g0o_2_0",
                    "vda_op": "3"
                }
            ]
            break
        case "6":
            data=[
                {
                    "vda_app_acc": "lisi",
                    "vda_app_seq": "x0q884ka55",
                    "vda_app_svr_domain": "mail.sgcc.com.cn",
                    "vda_app_svr_port": "443",
                    "vda_browser_name": "IE",
                    "vda_browser_version": "8.0.7601.18934",
                    "vda_cookie_raw": "a",
                    "vda_frame_index": "0",
                    "vda_gpath": "000",
                    "vda_html": "1",
                    "vda_html_header": "1",
                    "vda_html_txt": "1",
                    "vda_local_ip": "192.168.20.186",
                    "vda_log_type": "6",
                    "vda_login_acc": "Administrator",
                    "vda_method": "get",
                    "vda_op_time": "1484017635",
                    "vda_post_data": "",
                    "vda_proto": "https",
                    "vda_remote_ip": "192.168.1.100",
                    "vda_request_id": "xxx",
                    "vda_request_info": [
                        {
                            "id": "x0lqdukdi2",
                            "k": "name",
                            "v": "admin"
                        },
                        {
                            "id": "x0pgaa3lne",
                            "k": "password",
                            "v": "123"
                        }
                    ],
                    "vda_response_duration": "47",
                    "vda_response_filename": "通讯录.txt",
                    "vda_sid": "x0971k0o",
                    "vda_spath": "/17/01/10/x0971k0o",
                    "vda_ssid": "-",
                    "vda_upload_filename": "通讯录 1.txt",
                    "vda_url": "/webmail/static/se/mail/history.htm",
                    "vda_url_arg": "i",
                    "vda_url_seq": "x0jpolscpl"
                }
            ]
            break
        case "7":
            data=[
                {
                    "vda_sid": "x0koczro",
                    "vda_mail_app": "爱奇艺会员+.xls",
                    "vda_frame_index": "1841",
                    "vda_gpath": "000",
                    "vda_from_name": "black@klmail.org",
                    "vda_local_ip": "10.11.118.41",
                    "vda_app_name": "foxmail",
                    "vda_op": "1",
                    "vda_login_acc": "Administrator",
                    "vda_log_type": "7",
                    "vda_to_name": "office1@klmail.org",
                    "vda_op_time": "1498539543",
                    "vda_spath": "/17/06/26/x0koczro",
                    "vda_mail_subject": "转发: 爱奇艺会员+"
                },
                {
                    "vda_sid": "x0koczro",
                    "vda_mail_app": "server.exe;爱奇艺会员.xls",
                    "vda_frame_index": "2444",
                    "vda_gpath": "000",
                    "vda_from_name": "black@klmail.org",
                    "vda_local_ip": "10.11.118.41",
                    "vda_app_name": "foxmail",
                    "vda_op": "1",
                    "vda_login_acc": "Administrator",
                    "vda_log_type": "7",
                    "vda_to_name": "office1@klmail.org",
                    "vda_op_time": "1498541891",
                    "vda_spath": "/17/06/26/x0koczro",
                    "vda_mail_subject": "转发: server"
                }
            ]
            break
        case "8":
            data=[
                {
                    "vda_log_type": "8",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "10",
                    "vda_op_time": "1489112479",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_app_name": "filezilla",
                    "vda_op": "1",
                    "vda_filesize": "6",
                    "vda_ftp_dip": "192.168.20.52",
                    "vda_local_path": "C:/Users/administrator.JH/Desktop",
                    "vda_dst_path": "/root",
                    "vda_filename": "新建文本文档 (2).txt"
                },
                {
                    "vda_log_type": "8",
                    "vda_sid": "x0gn5g0o",
                    "vda_spath": "/17/03/10/x0gn5g0o",
                    "vda_frame_index": "12",
                    "vda_op_time": "1489112483",
                    "vda_remote_ip": "192.168.20.166",
                    "vda_gpath": "000",
                    "vda_local_ip": "192.168.20.182",
                    "vda_login_acc": "Administrator",
                    "vda_app_name": "filezilla",
                    "vda_op": "1",
                    "vda_filesize": "2006142",
                    "vda_ftp_dip": "192.168.20.52",
                    "vda_local_path": "C:/Users/administrator.JH/Desktop",
                    "vda_dst_path": "/root",
                    "vda_filename": "《员工内部创业实施细则（试行）》20161227.zip"
                }
            ]
            break
        case "9":
            data=[
                {
                    "vda_sid": "x0coczro",
                    "vda_login_acc": "Administrator",
                    "vda_log_type": "9",
                    "vda_gpath": "000",
                    "vda_frame_index": "19",
                    "vda_op_time": "1498467681",
                    "vda_nic_info": [
                        "Red Hat VirtIO Ethernet Adapter:FA-16-3E-C7-BC-B1:696:5460"
                    ],
                    "vda_local_ip": "10.11.118.41",
                    "vda_spath": "/17/06/26/x0coczro"
                }
            ]
            break

    }
    return data;
}

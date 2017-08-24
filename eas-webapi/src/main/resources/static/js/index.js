/**
 * Created by Administrator on 2017/6/10.
 */
var allsources;
var stompClient = null;
disconnect();
connect();
$(function(){

    //滚动条
    addScrollbar(".testCase_contentForm",34*6);

    /*
     * 获取所有资源
     */
    getAllSource();
	/*
	 * 获取所有规则
	 */
	getAllRules();

    /*
     * 新建列表绑定事件
     */
    $("#data_re").change(function(){
        editEvent.sourceChange($(this).find('option:selected').val());
    })
    $("#data_item").change(function(){
        editEvent.itemChange($(this).find('option:selected').val());
        $("#ruleTable").html('');
    })
    $("#eventfields").change(function(){
        editEvent.fieldsChange($(this).find('option:selected').attr('data-type'));
    })
    $("#eventfields2").change(function(){
        editEvent.fieldsChange2($(this).find('option:selected').attr('data-type'));
    })
    $("#eventType").change(function(){
        editEvent.enTypeChange($(this).val());
    })
    $("#editFrom").change(function(){
        editEvent.editFromChange($(this).find('option:selected').attr('data-type'))
    })
    $("#editTo").change(function(){
        editEvent.editToChange($(this).find('option:selected').attr('data-type'))
    })
    $("#editBtn").click(function(){
        if($(".BOXselected").length!=1){
            return
        }
        var currentTr = $(".BOXselected").parent().parent();
        $.ajax({
            type:"get",
            url:"./v1/event/"+currentTr.attr('data-id'),
            async:true,
            success:function(data){
                if(!data.state){
                    //alert(data.msg);
                    popAlertMsg({ title:data.msg , type: 1 });
                    return
                }
                //如果主机类型为主机,from为空
                if(data.data.from){
                    data.data.from = JSON.parse(data.data.from);
                }
                data.data.to = JSON.parse(data.data.to);
                editBtnEvent(data.data);
            },
            error:function(data){
                //alert('服务器出错')
                popAlertMsg({ title: "服务器出错", type: 1 });
                console.log(data);
            }
        });
        $("#souceLi,#eventLi").click(function(){
            getAllSource();
        })
        $("#ruleLi").click(function(){
            getAllRules();
        })
//		var options = {
//			eventName:currentTr.find('.eventName').attr('data-value'),
//			dataRe:currentTr.find('.dataRe').attr('data-value'),
//			dataItem:currentTr.find('.dataItem').attr('data-value'),
//			eventDes:currentTr.find('.eventDes').attr('data-value'),
//			editFrom:currentTr.find('.editFrom').attr('data-value'),
//			editTo:currentTr.find('.editTo').attr('data-value'),
//			editExport:currentTr.find('.editExport').attr('data-value'),
////			eventType:currentTr.find('.eventType').attr('data-value'),
//		}
//		editBtnEvent(options);
    })
    
    
    
    /*勾选框选中后才能弹出删除弹窗*/
    $('.cutBtn').click(function(){
        if($(".BOXselected").length!=0){
            $('#mask3').show();
        }
    })
    /*点击删除弹窗的确定按钮*/
    $("#deleteEvent").click(function(){
        var deletes = $(".BOXselected");
        for(let i =0,length = deletes.length;i<length;i++){
            cutEvent(deletes.eq(i).parent().parent().attr('data-id'));
        }
        $(".call").click();
    })

    /*将规则上传文件名称显示*/
    $('#file').change(function(){
        var name = this.files[0].name;
        console.log(name);
        $('#Pathplayer').val(name);
    })

    /*上传数据源文件的名称显示*/
    $('#FileUploader').change(function(){
        var name = this.files[0].name;
        $('#PathDisplayer').val(name);
    })
    /*上传数据源*/
    $('#addDataBtn').click(function(){
        var file = $('#FileUploader')[0].files[0];
        var formData = new FormData();
        formData.append('file',file);
        $.ajax({
            url: './v1/datasource' ,
            type: 'POST',
            data: formData,
            async: false,
            processData: false,
            contentType: false,
            success: function (res) {
                if(res.state==true){
                    getAllSource();
                }else{
                    //alert('未知错误');
                    popAlertMsg({ title:res.msg , type: 1 });
                }
            },
            error: function () {
                console.log("upload file error");
                popAlertMsg({ title: "服务器出错", type: 1 });
            }
        });
    })

})

function getAllSource(){
    /*获取所有数据源*/
    $.ajax({
        method : 'GET',
        url : './v1/datasource',
        //async : false,
        dataType : "json",
        success : function(data) {
            //将数据源存储为全局变量,用以后面的事件新建
            allsources = data.data;
            if(!data.state){
                //alert(data.msg);
                popAlertMsg({ title:data.msg , type: 1 });
                return
            }
            $('.dataSource').html('');
            $('#data_re').html('');
            if(allsources != null && allsources != ""){
                var tr,a;
                var config;
                /*
                重置数据源
                 */
                for (var i=0;i<allsources.length;i++){
                    //为前面的序号
                    a = i+1;
                    config = JSON.parse(allsources[i].config);
                    allsources[i].config = config;
                    var id = allsources[i].token;
                    tr = '<tr data-id='+id+'> <td width="7%">'+a+'</td>'+
                        '<td width="30%">'+allsources[i].name+'</td>'+
                        '<td width="30%"><b class="heartbeat"></b><span></span></td>'+
                        '<td width="30%"><!--<a href="#" class="update" onclick="editData()">更新</a><b class="line">|</b>--><a href="#" class="operate" onclick="cutData('+allsources[i].id+')">删除</a></td></tr>';
                    $('.dataSource').append(tr);
                    /*为新建弹窗数据源一项获取数据*/
                    var option = '<option value="'+id+'" data-key="'+config.key+'">'+allsources[i].name+'</option>';
                    $('#data_re').append(option);
                }
                editEvent.sourceChange($('#data_re').val());
                getAllEvents();
                console.log('加载数据源成功');
            }else{
               // alert('获取数据源列表为空');
               // popAlertMsg({ title: "获取数据源列表为空", type: 1 });
            }
        },
        error : function() {
            //console.log("报错");
            popAlertMsg({ title: "服务器出错", type: 1 });
        }
    });
}

function getAllEvents(){
    /*获取所有事件*/
    $.ajax({
        method : 'GET',
        url : './v1/event',
        dataType : "json",
        success : function(data) {
            var datas = data.data;
            if(!data.state){
                //alert(data.msg);
                popAlertMsg({ title:data.msg , type: 1 });
                return
            }
            $(".event_tableContent").html('');
            if(datas != null && datas != ""){
                var tr;
                for (var i=0;i<datas.length;i++){
                    var a = i+1;
                    //对象转为json对象
                    var jsonObj = $.parseJSON(datas[i].matchCondition);
                    //如果没有from(主机模式)则不执行
                    if(datas[i].from){
                        datas[i].from = JSON.parse(datas[i].from);
                    }
                    datas[i].to = JSON.parse(datas[i].to);
                    var dataItem = editEvent.findsource(datas[i].dataSource,datas[i].dataItem);
                    if(!dataItem){
                        continue;
                    }
                    dataItem = dataItem.config;
                    var str,type,hide;
                    var arr='';
                    //循环添加字段
                    for(k in jsonObj){
                        hide = false;
                        //如果字段中的value等于项目的key,则该字段不显示
                        if(jsonObj[k].key == dataItem.key ){
                            hide=true;
                        }
                        if(hide){
                            continue;
                        }
                        str = jsonObj[k].des+jsonObj[k].MatchRules+jsonObj[k].name+ ',<br>';
                        arr+=str;
                    }
                    arr = arr.slice(0,-5);
                    if(datas[i].eventtype==1){
                        type = '主机';
                    }else if(datas[i].eventtype==2){
                        type = '网络';
                    }else{
                        return '网络类型错误'
                    }
                    //通过key找到name
                    datas[i].to = editEvent.findNameBykey(datas[i].to,dataItem[datas[i].dataItem]);
                    if(datas[i].from){
                        datas[i].from = editEvent.findNameBykey(datas[i].from,dataItem[datas[i].dataItem]);
                    }
                    for (key in dataItem.keys){
                        if(dataItem.keys[key]==datas[i].dataItem){
                            datas[i].dataItem=key;
                            break;
                        }
                    }
                    tr = '<tr data-id='+datas[i].id+'><td width="6%" class="table_checkbox"><label name="items"></label><span>'+a+'</span></td>'+
                        '<td width="11%">'+datas[i].event+'</td>'+
                        '<td width="11%">'+datas[i].eventid+'</td>'+
                        '<td width="11%">'+type+'</td>'+
                        '<td width="11%">'+datas[i].dataSource+'</td>'+
                        '<td width="11%">'+datas[i].dataItem+'</td>'+
                        '<td width="11%">'+datas[i].from+'/'+datas[i].to+'</td>'+
                        '<td width="17%">'+arr+'</td>'+
                        '<td width="11%">'+datas[i].des+'</td></tr>';
                    $('.event_tableContent').append(tr);
                }
                console.log('加载事件成功');
            }else{
                //alert('获取事件列表为空');
                //popAlertMsg({ title: "获取事件列表为空", type: 1 });
            }

        },
        error : function() {
            console.log("报错");
            popAlertMsg({ title: "服务器出错", type: 1 });
        }
    });
}

function getAllRules(){
	/*获取所有规则*/
    $.ajax({
        method : 'GET',
        url : './v1/rules',
        dataType : "json",
        success : function(data) {
            var datas = data.data;
            if(!data.state){
                //alert(data.msg);
                popAlertMsg({ title:data.msg , type: 1 });
                return
            }
            $("#eventRules").html('');
            $('#ruleTable2').html('');
            $("#names").val('');
            $("#desc").val('');
            $("#file").val('');
            $("#Pathplayer").val('');
            if(datas != null && datas != ""){
                console.log(datas);
                var tr;
                for (var i=0;i<datas.length;i++){
                    var rules_id = datas[i].id;
                    var k=i+1;
                    tr = '<tr><td width="7%">'+k+'</td>'+
                        '<td width="30%">'+datas[i].name+'</td>'+
                        '<td width="30%">'+datas[i].info+'</td>'+
                        '<td width="30%"><a href="#" class="delete" onclick="cutRule('+rules_id+')">删除</a></td></tr>';
                    $('#ruleTable2').append(tr);
                    $("#eventRules").append('<option value="'+datas[i].name+'" >'+datas[i].name+'</option>');
                }
            }else{
                //alert('获取规则列表为空');
                //popAlertMsg({ title:'获取规则列表为空' , type: 1 });
            }
            console.log('加载规则成功');
        },
        error : function() {
            popAlertMsg({ title: "服务器出错", type: 1 });
        }
    });
}



///*更新数据源*/
//function editData(){
//
//}
/*删除数据源*/
function cutData(datasource_id){
	popAlertMsg({ title: "确认删除该数据源吗?", type: 1,confirm:function(){
	    $.ajax({
	        method: 'DELETE',
	        url: './v1/datasource/'+datasource_id,
	        async: false,
	        success: function(data) {
	            if(!data.state){
	                //alert(data.msg);
	                popAlertMsg({ title:data.msg , type: 1 });
	                return
	            }
	            getAllSource();
	        },
	        error: function() {
	            //alert('服务器出错')
	            popAlertMsg({ title: "服务器出错", type: 1 });
	            console.log(data);
	            console.log("错误提示", "连接失败");
	        }
	    });
	},cancel:function(){
		return
	}})
}

/*添加规则*/
function addRule(){
    /*规则名称*/
    var ruleName = $('#names').val();
    /*规则描述*/
    var ruleDes = $('#desc').val();
    /*添加判断*/
    if(ruleName==""){
        popAlertMsg({ title: "规则名称不能为空", type: 1 });
        return;
    }
    /*上传文件*/
    var file = $('#file')[0].files[0];
    var formData = new FormData();
    formData.append('file',file);
/*判断导入文件格式*/
    var filename = file.name;
    var mime = filename.toLowerCase().substr(filename.lastIndexOf("."));
    console.log(mime);
    if(mime!=".jar"){
        popAlertMsg({ title: "请选择.jar格式的文件上传", type: 1 });
        return;
    }

    var data = {
        'info':ruleDes,
        'name':ruleName
    }
    $.ajax({
        url: './v1/rules/upload',
        type: 'POST',
        data: formData,
        async: false,
        processData: false,
        contentType: false,
        success: function (res) {
            if(res.state==true){
            	data.id = res.data.id
            	changeRuleArgs(data);
            }else{
                //alert('未知错误');
                popAlertMsg({ title: "未知错误", type: 1 });
            }
            console.log("upload file ok");
        },
        error: function () {
            console.log("upload file error");
            popAlertMsg({ title: "服务器出错", type: 1 });
        }
    });
    function changeRuleArgs(data){
    	$.ajax({
	        url: './v1/rules',
	        type: 'put',
	        data: JSON.stringify(data),
	        contentType:'application/json',
	        dataType:'json',
	        success: function (res) {
	            if(res.state==true){
	                /*将返回数据拼接到表格中*/
	                getAllRules();
	            }else{
	                //alert('未知错误');
	                popAlertMsg({ title: "未知错误", type: 1 });
	            }
	            console.log("upload file ok");
	        },
	        error: function () {
	            console.log("upload file error");
	            popAlertMsg({ title: "服务器出错", type: 1 });
	        }
	    });
    }
}
/*删除规则*/
function cutRule(rules_id){
	popAlertMsg({ title: "确认删除该规则吗?", type: 1,confirm:function(){
		$.ajax({
	        method: 'DELETE',
	        url: './v1/rules/'+rules_id,
	        async: false,
	        success: function(data) {
	            getAllRules();
	        },
	        error: function() {
	            console.log("错误提示", "连接失败");
	            popAlertMsg({ title: "服务器出错", type: 1 });
	        }
	    });
	},cancel:function(){
		return
	}});
	    
}

/*添加事件*/
function addEvent(){
    //创建匹配字段数组
    var matchCondition = [];
    var allrules = $(".allrules");
    for(let i=0,length = allrules.length;i<length;i++){
        var rule = getKeys(i,1);
        matchCondition.push(rule);
        if(!rule.MatchRules || !rule.name){
            popAlertMsg({ title:'规则或条件值不得为空' , type: 1 });
            return
        }
    }
    //在匹配规则最后添加上项目的key和数据源的key
    var tmpDataItem = {
        key:$("#data_re").find('option:selected').attr('data-key'),
        value:$("#data_item").val(),
        type:0,
        MatchRules:'=='
    }
    matchCondition.push(tmpDataItem);
    //递归函数找到所有的rule下的分支
    function getKeys(i,class2){
        var currentRule = allrules.eq(i);
        var newClass = '.field' +class2+ 'rule';
        var currentMatch = {
            key:currentRule.find(newClass).attr('data-id'),
            des:currentRule.find(newClass).val(),
            type:currentRule.find(newClass).attr('data-type'),
            name:currentRule.find('.baseruleValue').val(),

            MatchRules : currentRule.find('.baserule').val()
        }
        if(currentMatch.type!=2){
            currentMatch.value = currentRule.find('.baseruleValue').attr('data-id');
            currentMatch.MatchRules = currentRule.find('.baserule').val();
        }else{
            currentMatch.keys = [];
            class2++;
            currentMatch.des = currentMatch.des + '.' + currentRule.find('.field' +class2+ 'rule').val();
            var newCurrentMatch = getKeys(i,class2);
            currentMatch.keys.push(newCurrentMatch);
        }
        return currentMatch
    }

    var editFrom = $("#editFrom").find('option:selected');
    var editTo = $("#editTo").find('option:selected');
    var fromArray = {
        key:editFrom.val(),
        type:editFrom.attr('data-type'),
    }
    var toArray = {
        key:editTo.val(),
        type:editTo.attr('data-type'),
    }
    //如果type类型为2,搜索二级菜单
    if(fromArray.type==2){
        fromArray.keys = {
            key:$("#editFrom2").find('option:selected').val(),
            type:$("#editFrom2").find('option:selected').attr('data-type')
        }
    }
    if(toArray.type==2){
        toArray.keys = {
            key:$("#editTo2").find('option:selected').val(),
            type:$("#editTo2").find('option:selected').attr('data-type')
        }
    }
    var data = {
        "content": $("#eventExport").val(),
        "dataItem": $("#data_item").val(),
        "dataSource": $("#data_re").val(),
        "des": $("#eventDes").val(),
        "event": $("#eventName").val(),
        "eventtype": $("#eventType").val(),
        "from": JSON.stringify(fromArray),
        "matchCondition": matchCondition,
        "to": JSON.stringify(toArray),
    }
    var method = 'post';
    var thisBtn = $(".submit");
    //编辑的时候会给确定按钮增加data-id,检测发现data-id则将method改成put,更改
    if(thisBtn.attr('data-id')){
        data.id = thisBtn.attr('data-id');
        method = 'put';
    }
    if(data.eventtype==1){
        data.from = '';
    }
    $.ajax({
        type:method,
        url:"./v1/event",
        async:true,
        data:JSON.stringify(data),
        contentType:'application/json',
        success:function(data){
            if(!data.state){
               // alert(data.msg);
                popAlertMsg({ title:data.msg , type: 1 });
                return
            }
            thisBtn.removeAttr('data-id');
            getAllEvents();
        },
        error:function(data){
            //alert('服务器出错')
            popAlertMsg({ title: "服务器出错", type: 1 });
            console.log(data);
        }
    });
    //关闭弹出框
    $('.cansole').click();
}
/*修改事件*/
function editBtnEvent(options){
    //初始化
    $('.newBtn').click()
    reset(options);
    //增加新数据自动完成
    editEvent.sourceChange(options.dataSource);
    editEvent.itemChange(options.dataItem);
    editEvent.enTypeChange(options.eventtype);
    $("#data_item").val(options.dataItem)
    $('.maskBar span').text('编辑');
    $('.submit').attr('data-id',options.id);
    var Matchs = JSON.parse(options.matchCondition);
    for(key in Matchs){
        if(!Matchs[key].des){
            continue;
        }
        var currentMatch = Matchs[key];
        $("#eventfields").val(currentMatch.key);
        $("#eventRules").val(currentMatch.MatchRules);
        editEvent.fieldsChange(currentMatch.type);
        if(currentMatch.keys){
            currentMatch = currentMatch.keys[0];
        }
        $("#eventfields2").val(currentMatch.key);
        $("#eventInputChoice").val(currentMatch.name);
        $("#eventSelectChoice").val(currentMatch.value);
        add();
    }
    editEvent.itemChange($("#data_item").val());
    // var keyFrom = editEvent.findKey1ByKey2(options.from);
    // var keyTo = editEvent.findKey1ByKey2(options.to);
    editEvent.toChange(options.to.key);
    if(options.from){
        editEvent.fromChange(options.from.key);
        if(options.from.type==2){
            $("#editFrom2").val(options.from.keys.key)
        }
    }
    if(options.to.type==2){
        $("#editTo2").val(options.to.keys.key)
    }
}

/*删除事件*/
function cutEvent(id){
    $.ajax({
        type:"delete",
        url:"./v1/event/"+id,
        async:true,
        success:function(data){
            if(!data.state){
                //alert(data.msg);
                popAlertMsg({ title:data.msg , type: 1 });
                return
            }
            console.log('删除成功')
            getAllEvents();
        },
        error:function(data){
            //alert('服务器出错')
            popAlertMsg({ title: "服务器出错", type: 1 });
            console.log(data);
        }
    });
}

/*
 * 重置事件
 */
function reset(options){
    var args = $.extend({
        content:'',
        des:'',
        event:''
    },options);
    $("#eventName").val(args.event);
    $("#eventDes").val(args.des);
    $("#eventExport").val(args.content);
    editEvent.sourceChange($("#data_re").val());
    $('#ruleTable').html('');
}

/*导出事件*/
function exports(){
    function download(fileURL){
        // 通过添加一个隐藏的iframe标签，实现下载
        var $a = $('<iframe>');
        $a.attr({
            'style':'display:none',
            'src':fileURL,
        });
        $('.right').append($a);
    }
    download('./v1/event/download');
}
/*添加字段行的方法*/
function add(){
    var from = $("#editFrom").val();
    var to = $("#editTo").val();
    var field1 = $("#eventfields").find('option:selected');
    var field2 = $("#eventfields2").find('option:selected');
    var rules = $("#eventRules").find('option:selected');
    if($("#eventInputChoice").parent().hasClass('condation')){
        var ruleValue = $("#eventSelectChoice").find('option:selected').text();
        var dataid = $("#eventSelectChoice").find('option:selected').val();
    }else{
        var ruleValue = $("#eventInputChoice").val();
        var dataid = $("#eventInputChoice").val();
    }
    var tr = '<tr class="allrules"> <td> <p style="margin-left: 24px;"> <label>字段：</label> <input readonly type="text" class="field1rule" data-id="'+field1.val()+'" data-type="'+field1.attr("data-type")+'"  value="'+field1.text()+'" > </p> </td>'+
        '<td><p style="margin-left: 24px;"> <input readonly type="text" class="field2rule" data-type="'+field2.attr("data-type")+'" data-id="'+field2.val()+'" value="'+field2.text()+'" > </p> </td>'+
        '<td> <p style="margin-left: 28px;"> <label>规则：</label> <input readonly type="text" class="baserule" data-id="'+rules.val()+'" value="'+rules.text()+'" > </p> </td>'+
        '<td> <p style="margin-left: 28px;"> <label>条件值：</label> <input readonly type="text" class="last_data baseruleValue" data-id="'+dataid+'" value='+ruleValue+' > </p> </td>'+
        '<td> <a href="#" class="minus minusTwo"  onClick="minus(this)"></a> </td> </tr>';

    $('#ruleTable').append(tr);
    editEvent.itemChange($("#data_item").val());
    editEvent.fromChange(from);
    editEvent.toChange(to);
}
/*删除字段行的方法*/
function minus(k){
    $(k).parent().parent().remove();
    var from = $("#editFrom").val();
    var to = $("#editTo").val();
    editEvent.itemChange($("#data_item").val())
    editEvent.fromChange(from);
    editEvent.toChange(to);
}


/*
新建弹框动态改变主方法
1.下面方法中每一个方法结束后都会调用下一级
2.在页面加载时会给对应的select添加下列的方法
3.每次添加字段的时候,会调用itemchange的方法.
itemchange会搜寻下面已创建的所有字段,如果已经输入过,则不加载
二级菜单需要二级菜单中所有的内容都选择过,一级菜单的内容不加载
 */
var editEvent = {
    current:'',
    itemKey:'',
    menu1Key:'',
    menu2Key:'',
    //数据源改变
    sourceChange:function(id){
        $("#data_item").html("");
        this.current = this.findsource(id);
        if(!this.current){
            console.log('未找到对应数据源');
            return
        }
        $("#ruleTable").html('');
        this.current = this.current.config;
        /*数据项一栏*/
        for(key in this.current.keys){
            var op = '<option value="'+this.current.keys[key]+'" >'+key+'</option>';
            $('#data_item').append(op);
        }
        this.itemChange($("#data_item").val())
    },
    //项目改变
    itemChange:function(id){
        for(key in this.current){
            if(key == id){
                var source1 = this.current[key];
                this.itemKey = key;
                $("#editFrom").html('');
                $("#editTo").html('');
                $("#eventfields").html('');
                for(key2 in source1){
                    $("#editFrom").append($('<option value="'+source1[key2].key+'" data-type="'+source1[key2].type+'">'+key2+'</option>'));
                    $("#editTo").append(($('<option value="'+source1[key2].key+'" data-type="'+source1[key2].type+'">'+key2+'</option>')));
                    if((source1[key2].type!=2) && (!this.fieldSeted(key2))){
                        $("#eventfields").append($('<option value="'+source1[key2].key+'" data-type = "'+source1[key2].type+'">'+key2+'</option>'))
                    }else if(source1[key2].type==2){
                        for(key3 in source1[key2].keys){
                            if(!this.field2Seted(key3)){
                                $("#eventfields").append($('<option value="'+source1[key2].key+'" data-type = "'+source1[key2].type+'">'+key2+'</option>'))
                                break;
                            }
                        }
                    }
                }
                this.fieldsChange($("#eventfields").find('option:selected').attr('data-type'));
                this.editFromChange($("#editFrom").find('option:selected').attr('data-type'));
                this.editToChange($("#editTo").find('option:selected').attr('data-type'));
                return
            }
        }
    },
    //编辑from改变
    editFromChange:function(type){
        $("#editFrom2").html('');
        if(type!=2){
            return
        }else{
            this.menu1Key = $("#editFrom").find('option:selected').text();
            var menu2 = this.current[this.itemKey][this.menu1Key].keys;
            for(key in menu2){
                $("#editFrom2").append('<option value="'+menu2[key].key+'" data-type = "'+menu2[key].type+'">'+key+'</option>');
            }
        }
    },
    editToChange:function(type){
        $("#editTo2").html('');
        if(type!=2){
            return
        }else{
            this.menu1Key = $("#editTo").find('option:selected').text();
            var menu2 = this.current[this.itemKey][this.menu1Key].keys;
            for(key in menu2){
                $("#editTo2").append('<option value="'+menu2[key].key+'" data-type = "'+menu2[key].type+'">'+key+'</option>');
            }
        }
    },
    fieldsChange:function(type){
        $("#eventInputChoice").val('');
        $("#eventfields2").html('');
        $("#eventSelectChoice").html('');
        this.menu1Key = $("#eventfields").find('option:selected').text();
        if(type==0){
            $(".eventChoice.condation").removeClass('condation');
            $("#eventSelectChoice").parent().addClass('condation');
        }else if(type==1){
            var menu1 = this.current[this.itemKey][this.menu1Key].values;
            for(key in menu1){
                $("#eventSelectChoice").append('<option value="'+menu1[key]+'" >'+key+'</option>');
            }
            $(".eventChoice.condation").removeClass('condation');
            $("#eventInputChoice").parent().addClass('condation');
        }else if(type==2){
            var menu2 = this.current[this.itemKey][this.menu1Key].keys;
            for(key in menu2){
                if(!this.field2Seted(key)){
                    $("#eventfields2").append('<option value="'+menu2[key].key+'" data-type = "'+menu2[key].type+'">'+key+'</option>');
                }
            }
            this.fieldsChange2($("#eventfields2").find('option:selected').attr('data-type'));
        }
    },
    fieldsChange2:function(type){
        $("#eventInputChoice").val('');
        $("#eventSelectChoice").html('');
        this.menu2Key = $("#eventfields2").find('option:selected').text();
        if(type==0){
            $(".eventChoice.condation").removeClass('condation');
            $("#eventSelectChoice").parent().addClass('condation');
        }else if(type==1){
            var menu1 = this.current[this.itemKey][this.menu1Key][this.menu2Key].values;
            for(key in menu1){
                $("#eventSelectChoice").append('<option value="'+menu1[key].key+'" >'+key+'</option>');
            }
            $(".eventChoice.condation").removeClass('condation');
            $("#eventInputChoice").parent().addClass('condation');
        }
    },
    enTypeChange:function(type){
        $("#eventType").val(type);
        $(".fromSelection").each(function(){
            $(this).removeClass('ifzhuji');
        })
        if(type==1){
            $(".fromSelection").each(function(){
                $(this).addClass('ifzhuji');
            })
        }
    },
    fromChange:function(newVal){
        $("#editFrom").val(newVal);
        this.editFromChange($("#editFrom").find('option:selected').attr('data-type'));
    },
    toChange:function(newVal){
        $("#editTo").val(newVal);
        this.editToChange($("#editTo").find('option:selected').attr('data-type'));
    },
    findsource:function(id,itemId){
        for(key in allsources){
            if(allsources[key].token==id){
                if(itemId){
                    for(key2 in allsources[key].keys){
                        if(allsources[key].keys[key2]==itemId){
                            return allsources[key][itemId]
                        }
                    }
                }
                return allsources[key]
            }
        }
    },
    findKey1ByKey2:function(val){
        var currentItem = this.current[this.itemKey];
        for(key1 in currentItem){
            if(currentItem[key1].type!=2){
                if(currentItem[key1].key==val){
                    return currentItem[key1].key
                }
            }else{
                for(key2 in currentItem[key1].keys){
                    if(currentItem[key1].keys[key2].key==val){
                        return currentItem[key1].key
                    }
                }
            }
        }
    },
    findNameBykey:function(Ckey,item){
        if(Ckey.type==2){
            var str = '';
            for(key2 in item) {
                if (item[key2].key == Ckey.key) {
                    str = key2;
                    break;
                }
            }
            for(key3 in item[str].keys) {
                if (item[str].keys[key3].key == Ckey.keys.key) {
                    str += '->' + key3;
                    return str;
                }
            }
        }else{
            for(key2 in item){
                if(item[key2].key==Ckey.key){
                    return key2
                }
            }
        }
    },
    fieldSeted:function(name){
        var currentRules = $(".field1rule");
        for(let i=0,length=currentRules.length;i<length;i++){
            if(currentRules[i].value==name){
                return true
            }
        }
    },
    field2Seted:function(name){
        var currentRules = $(".field2rule");
        for(let i=0,length=currentRules.length;i<length;i++){
            if(currentRules[i].value==name){
                return true
            }
        }
    }
}


function connect() {
    //链接SockJS 的endpoint 名称为"/endpointWisely"
    var socket = new SockJS('/kl_eas/endpointWisely');

    //使用stomp子协议的WebSocket 客户端
    stompClient = Stomp.over(socket);

    //链接Web Socket的服务端。
    stompClient.connect({}, function(frame) {
//          setConnected(true);
        console.log('Connected: ' + frame);
        //订阅/topic/getResponse 目标发送的消息。这个是在控制器的@SendTo中定义的。
        stompClient.subscribe('/topic/kl_eas', function(respnose){
            showResponse(JSON.parse(respnose.body).msg);
        });
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
//  setConnected(false);
    console.log("Disconnected");
}

function showResponse(message) {
    if(message=='Subscribe mapped!'){
        return
    }
    var data = JSON.parse(message);
    console.log(data)
    var heartbeat = $("#dataSource").find('tr[data-id='+data.token+']').find('.heartbeat');
    heartbeat.removeClass('green').removeClass('red').next().text('');
    if(data.status){
        heartbeat.addClass('green');
        heartbeat.next().text('激活');
    }else{
        heartbeat.addClass('red');
        heartbeat.next().text('关闭');
    }
}

/*setTimout(sendName(),5000);
function sendName() {
    var name = $('#name').val();
    //通过stompClient.send 向/welcome 目标 发送消息,这个是在控制器的@messageMapping 中定义的。
     stompClient.send("/welcome", {}, JSON.stringify({ 'name': name }));
}*/

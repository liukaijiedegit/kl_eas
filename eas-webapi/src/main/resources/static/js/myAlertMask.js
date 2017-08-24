$(function(){
    var objtype = {
            1: "img/wrong.png",
            2: "img/right.png"
            /*btn1:"common/images/only-confirm-btn.png",
            btn2:"common/images/only-confirm-btn-hover.png"*/
        };
        for(ele in objtype){
        	var img = new Image();
        	img.src = objtype[ele];
        }
});
// 自定义的alert弹出框样式
function popAlertMsg(obj) {
	
/**
 * obj={
 * 		string:"" 				----->	显示的字符串（子内容）-------						---- 如无string，则仅显示一行
 * 		title:""				----->	显示的标题										---- title不能为空				！必填
 * 		type:number				----->	选择需要的提示框类型		1：叉号；2：对号----------	---- 默认及输入错误时为1
 * 		confirm：function		----->	确定按钮的回调函数--------							---- 如果无函数，则仅执行隐藏弹出框操作
 * 		cancel：function			----->	取消按钮的回调函数--------							---- 如无回调函数，不显示取消按钮
 * }
 * 
 * */
	var string = obj.string;
	var title = obj.title;
	var type = obj.type||1;
	var confirm = obj.confirm;
	var cancel = obj.cancel;
	
	// 定义一个是否有title的flag
	var flag = true;
	if (typeof(string) === "undefined") {
			flag = false;
		}
	
	// 定义一个是否有cancel的flag
	var flagBTN = true;
	if (typeof(cancel) === "undefined") {
		flagBTN = false;
	}
	
	
	
	// 如果之前有提示框，则将其删除 
	 $('#myAlertMask').remove();
    //根据传入参数状态取值
    var objtype = {
        1: "img/wrong.png",
        2: "img/right.png"
    };

    //弹窗内容
    var msg = /*'<div  class="myAlertMask" id="myAlertMask">' +
    	'<div  class="myAlertMask-content">'+
        '<img src="' + objtype[type] + '" alt="">' +
        '<span class="msgScrollBar">' + title + '</span>' +
        '<p>' + string + '</p>' +
        '<a href="javascript:;" class="sures ensure">确定</a>' +
        '<a href="javascript:;" class="cancel">取消</a>' +
        '<a href="javascript:;" class="sureonly ensure">确定</a>' +
        '</div>'+
        '</div>';*/
'<div  class="myAlertMask" id="myAlertMask">'+
	'<div class="myAlertMaskCon"> <div>'+
        '<div class="maskBar"> <span>提示</span> </div>'+
        '<div class="myAlertContent">'+
        '<img src="' + objtype[type] + '" alt=""><span>' + title + '</span>'+
		'</div> <div class="myAlertBo">'+
	'<a href="javascript:;" class="sures ensure">确定</a>' +
	'<a href="javascript:;" class="cancel">取消</a>' +
	'<a href="javascript:;" class="sureonly ensure">确定</a> </div> </div> </div> </div>';

    //将弹窗内容添加到body上
    $(document.body).append(msg);
    
    // 根据是否有string来决定显示内容的样式
    if(flag){
    	$('.myAlertMask-content span').css({
    		'font-size':'20px',
    		'margin-bottom': '25px',
    		'display':'inline-block'
    	});
    	$('.myAlertMask-content p').show();
    	
    }else{
    	$('.myAlertMask-content span').css({
    		'font-size':'18px',
    		'margin-bottom': '0px',
    		'display':'block'
    	});
    	$('.myAlertMask-content p').hide();
    }
    
    // 根据是否有cancel回调函数，判断是否显示取消按钮
    if(flagBTN){
    		$('.sures').show();
    		$('.cancel').show();
    		$('.sureonly').hide();
    	}else{
    		$('.sureonly').show();
    		$('.sures').hide();
    		$('.cancel').hide();
    	}

    //点击确定按钮弹窗消失
    $('#myAlertMask .ensure').on('click', function () {
        $('#myAlertMask').remove();
    	if(typeof(confirm) === 'function'){
    		confirm();
    	}
    });
    //点击取消按钮弹窗消失
    $('#myAlertMask .cancel').on('click', function () {
		$('#myAlertMask').remove();
     	if(typeof(cancel) === 'function'){
     		cancel();
    	}else{
    		console.log('popAlertMsg传入函数错误');
    	}
        
    });

}
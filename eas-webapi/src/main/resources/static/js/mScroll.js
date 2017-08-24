/*引用滚动条插件封装公用函数
 * jQstr--需要滚动的整体范围，该范围的类名或id名
 * step--每一次滚动的高度
 * width--滚动轨道的宽度
 * */


function addScrollbar(jQstr,step,width){
	
	width = width || 15;
	$(jQstr).mCustomScrollbar({
        axis:"y",  //指滚动方向，x/y
		theme:"light-3",
		advanced:{
			autoExpandHorizontalScroll:true
		},
		keyboard:{scrollType:"stepped"},
		snapAmount:step,
		mouseWheel:{scrollAmount:step}
    });
	
	$('.mCSB_draggerRail').css("width",width);
	$('.mCSB_dragger_bar').css("width",width-2);
}
	
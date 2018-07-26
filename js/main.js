require.config({
	paths:{
		"jquery":"https://cdn.bootcss.com/jquery/3.3.1/jquery.min",
		"jqueryUI":"https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min"		
	}
})

define(['dialog','jquery','jqueryUI'],function(d,$,$UI){
	$(".alert").click(function(event) {
		var alert = new d.Dialog();
		alert.alert({
			w:400,
			h:250,
			title:"alert",
			content:"hello",
			text4AlertBtn:"知道啦！",
			hasFooter:false,
			handler4Close:function(){
				console.log('close')
			}
		})
	});
	$(".confirm").click(function(event) {
		var confirm = new d.Dialog();
		confirm.confirm({
			w:400,
			h:250,
			title:"confirm",
			content:"hello",
			text4ConfirmBtn:"确定",
		}).on("confirm",function(){
			alert("confirm");
		});
		confirm.on("cancel",function(){
			alert("cancel")
		})

	});
	$(".prompt").click(function(event) {
		var prompt = new d.Dialog();
		prompt.prompt({
			w:400,
			h:250,
			title:"prompt",
			text4PromptBtn:"输入",
		}).on("prompt",function(ipt){
			alert("您输入的是：" + ipt)
		});
		prompt.on("cancel",function(){
			alert("cancel：")
		})
	});		
})
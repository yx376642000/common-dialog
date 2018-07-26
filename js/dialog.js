define(['widget','jquery',"jqueryUI"],function (w,$,$UI) {

	function Dialog(){
		//设置默认配置
		this.cfg = {
			w:600,
			h:300,
			title:"提示",
			content:"内容",
			hasMask:true,//默认有模态框
			isDraggable:true,//默认可以拖动
			dragHandler:".dialog-header",//默认标题部分可以拖动
			hasCloseBtn:true,//默认有关闭按钮
			hasFooter:true,

			handler4Close:null,//关闭按钮点击事件
			handler4Alert:null,//alert弹窗按钮点击事件
			text4AlertBtn:"确定",//alert按钮定制文案

			text4ConfirmBtn:"确定",
			text4CancelBtn:"取消",
			handler4ConfiremBtn:null,//confirm 确定事件
			handler4CancelBtn:null,//confirm 取消事件

			text4PromptBtn:"确定",
			inputType:'text',//输入框类型
			inputMaxLen:16,//输入框最大输入长度
			inputDefaultValue:"请输入内容",//输入框默认内容
			handler4PromptBtn:null
		}
	};
	Dialog.prototype = $.extend({}, new w.Widget(),{
		//渲染弹窗模版
		renderUI:function(){
			var footerContent = '';
			switch(this.cfg.dType){
				case "alert":
					footerContent = '<a href="javascript:;" class="dialogBtn alertBtn">'+ this.cfg.text4AlertBtn +'</a>';
					break;
				case "confirm":
					footerContent = '<a href="javascript:;" class="dialogBtn cancelBtn">'+ this.cfg.text4CancelBtn +'</a>'+
									'<a href="javascript:;" class="dialogBtn confirmBtn">'+ this.cfg.text4ConfirmBtn +'</a>';
					break;
				case "prompt":
					this.cfg.content ='<input class="prompt-input" type="'+this.cfg.inputType+'" placeholder="'+ this.cfg.inputDefaultValue +'" maxlength="'+ this.cfg.inputMaxLen +'">';
					footerContent = '<a href="javascript:;" class="dialogBtn promptBtn">'+ this.cfg.text4PromptBtn +'</a>'+
									'<a href="javascript:;" class="dialogBtn cancelBtn promptCancel">'+ this.cfg.text4CancelBtn +'</a>';
					break;
			};

			this.boundingBox = $(

				'<div class="dialog-container">'+
					'<div class="dialog-header">'+ this.cfg.title +'</div>' +
					'<div class="dialog-mian">'+ this.cfg.content +'</div>'+
				'</div>'				
			);
			if(this.cfg.hasFooter){
				this.boundingBox.append('<div class="dialog-footer">'+ footerContent +'</div>');
			}
			//判断是否拥有模态框
			if(this.cfg.hasMask){
				this._mask = $('<div class="dialog-mask"></div>');
				this._mask.appendTo('body');
			};

			//判断是否有关闭按钮
			if(this.cfg.hasCloseBtn){
				this.boundingBox.append('<div class="dialog-close">X</div>')
			}

			//将弹窗模版加载到body上
			this.boundingBox.appendTo(document.body);
			this._promptIpt = this.boundingBox.find(".prompt-input");

		},

		//监听弹窗事件
		listenUI:function(){
			var _this = this;

			//弹窗关闭事件
			if(this.cfg.handler4Close){
				_this.on("close",this.cfg.handler4Close);
			};

			//alert弹窗按钮点击事件
			if(this.cfg.handler4Alert){
				_this.on("alert",this.cfg.handler4Alert);
			};

			//confirm弹窗按钮点击事件
			if(this.cfg.handler4ConfiremBtn){
				_this.on("confirm",this.cfg.handler4ConfiremBtn);
			};
			if(this.cfg.handler4CancelBtn){
				_this.on("cancel",this.cfg.handler4CancelBtn);
			};

			//prompt弹窗按钮点击事件
			if(this.cfg.handler4PromptBtn){
				_this.on("prompt",_this.cfg.handler4PromptBtn);
			}

			this.boundingBox.delegate('.dialog-close', 'click', function() {
				_this.do("close");
				_this.destroy();
			}).delegate('.alertBtn', 'click', function() {
				_this.do("alert");
				_this.destroy();
			}).delegate(".confirmBtn",'click',function(){
				_this.do('confirm');
				_this.destroy();
			}).delegate('.cancelBtn', 'click', function() {
				_this.do("cancel");
				_this.destroy();
			}).delegate('.promptBtn', 'click', function() {
				_this.do("prompt",_this._promptIpt.val());
				_this.destroy();
			});
			this._mask.click(function(event) {
				_this.do("close");
				_this.destroy();
			});
		},

		//初始化弹窗
		initUI:function(){
			this.boundingBox.css({
				width:this.cfg.w + 'px',
				height:this.cfg.h + 'px',
				left:(this.cfg.x || (window.innerWidth - this.cfg.w)/2 ) + 'px',
				top:(this.cfg.y || (window.innerHeight - this.cfg.h)/2 ) + 'px',

			});
			//是否可以拖拽
			if(this.cfg.isDraggable){
				if(this.cfg.dragHandler){
					this.boundingBox.draggable({handle:this.cfg.dragHandler});
				}else{
					this.boundingBox.draggable();
				}
			}
		},

		destructor:function(){
			this._mask && this._mask.remove();
		},

		alert:function(cfg){
			$.extend(this.cfg,cfg,{dType:"alert"});
			this.render();
			return this;
		},

		confirm:function(cfg){
			$.extend(this.cfg,cfg,{dType:"confirm"});
			this.render();
			return this;
		},

		prompt:function(cfg){
			$.extend(this.cfg,cfg,{dType:"prompt"});
			console.log(2)
			this.render();
			this._promptIpt.focus();
			return this;			
		}

	})
	return {
		Dialog:Dialog
	}
})
/*
	定义一个抽象类
*/

define(['jquery'],function($){
	function Widget(){
		this.boundingBox = null;
	}

	Widget.prototype = {
		//定义一个方法，渲染组件
		render:function(container){
			this.renderUI();
			this.handlers = {};
			this.listenUI();
			this.initUI();
			$(container || document.body).append(this.boundingBox);
		},

		//定义一个方法，销毁组件
		destroy:function(){
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		},

		//定义一个接口，渲染dom
		renderUI:function(){},

		//定义一个接口，监听事件
		listenUI:function(){},

		//定义一个接口，初始化组件属性
		initUI:function(){},

		//定义一个接口，处理销毁前的函数
		destructor:function(){},

		//自定义事件，观察者模式
		on:function(type,handler){
			if( typeof this.handlers[type] == 'undefined'){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;//链式调用
		},
		do:function(type,data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i = 0,len = handlers.length; i < len; i++){
					handlers[i](data);
				}
			}
		}
	}

	return {
		Widget:Widget
	}
});

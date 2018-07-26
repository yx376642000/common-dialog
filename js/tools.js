
//异步加载script
function loadScript(src, callback){

	var script = document.createElement("script");
	script.type = "text/javascript";
	if(script.readyState){
		script.onreadystatechange = function (){
			if(script.readyState == "complete" || script.readyState == "loaded"){
				callback();
			}
		}
	}else{
		script.onload = function(){
			callback();
		}
	}
	script.src = src;
	document.head.appendChild(script);
};

//查看滚动条距离
function getScrollOffset(){
	if(window.pageXOffset){
		return{
			x:window.pageXOffset,
			y:window.pageYOffset
		}
	}else{
		return{
			x:document.body.scrollLeft + document.documentElement.scrollLeft,
			y:document.body.scrollTop + document.documentElement.scrollTop
		}
	}
};

//绑定函数
function bindEvent(target, type, callback){
	if(target.addEventListener){
		target.addEventListener(type, callback, false);
	}else if(target.attachEvent){
		target.attachEvent("on" + type, function(){
			callback.call(target);
		})
	}else{
		target["on" + type] = callback;
	}
};

//检测类型
function checkType(target){
	var temp = {
		"[object Array]"   : "Array",
		"[object Object]"  : "Object",
		"[object Number]"  : "Number object",
		"[object String]"  : "String object",
		"[object Boolean]" : "Boolean object",
	};
	var type = typeof(target);
	if(target === null){
		return "null";
	}
	if(type == "object"){
		var str = Object.prototype.toString.call(target);
		return temp[str];
	}else{
		return type;
	}
};

//数组原型编程去重
Array.prototype.unique = function(){
	var temp = {},
		arr = [],
		len = this.length;
	for(var i = 0; i < len; i++){
		if(!temp[this[i]]){
			temp[this[i]] = "anything";
			arr.push(this[i]);
		}
	}
	return arr;
};

//深度克隆
function deepClone(target, result){
	var result = result || {};
	//利用对象原型上的toString方法判断是否为引用值
	var toStr = Object.prototype.toString;
	//遍历对象
	for(var prop in target){
		//判断是否为对象上自己的属性值
		if(target.hasOwnProperty(prop)){
			//判断属性值是否为null或者引用属性
			if(target[prop] != null && typeof(target[prop]) == "object"){
				//判断是数组还是对象
				result[prop] = toStr.call(target[prop]) == "[object Array]" ? [] : {};
				deepClone(target[prop], result[prop]);
			}else{
				result[prop] = target[prop];
			}
		}
	}
};

//阻止冒泡
function stopBuble(e){
	if(e.stopPropagation){
		e.stopPropagation();
	}else{
		e.cancaleBuble = true;
	}
}

//阻止默认事件
function cancleHandle(e){
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}

//截取字符串
function getQueryString(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	var r = window.location.search.substr(1).match(reg);
	var context = "";
	if(r != null) context = r[2];
	reg = null;
	r = null;
	return context == null || context == "" || context == "undefined" ? "" : context;
 };

//在元素后插入元素 xxx.insertAfter(targetNode, afterNode)
Element.prototype.insertAfter = function(targetNode, afterNode){
	var beforeNode = afterNode.nextElementSibling;
	if(beforeNode == null){
		this.appendChild(targetNode);
	}else{
		this.insertBefore(targetNode, beforeNode)
	}
}

//防抖
function debounce(func,delay){
	var timer;
	var delay = delay || "300";
	var context = this, args = arguments;
	return function(){
		clearTimeout(timer);
		timer = setTimeout(function(){
			func.apply(context,args);
		},delay)

	}
}

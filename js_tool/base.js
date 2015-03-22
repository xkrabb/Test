// 用于挂载其他全局对象的
var GLOBAL = {} ;

// 多重命名空间函数
GLOBAL.namespace = function(str){
	var arr = str.split("."),
		o=GLOBAL;
	for(i=(arr[0]=="GLOBAL") ? 1 : 0; i<arr.length; i++){
		o[arr[i]]= o[arr[i]] || {} ;
		o=o[arr[i]];
	}
};

// 可以将DOM相关操作方法，挂在以DOM为命名空的全局对象里
GLOBAL.namespace("DOM") ;
// 兼容IE和FF的下一节点，不包括空或文本节点
GLOBAL.DOM.getNextNod = function(node){
	node = typeof node == "string" ? document.getElementById(node) : node ;
	var nextNode = node.nextSibling;
	if(!nextNode){	return null ;}
	if(!document.all){  	//document.all在IE下识别
		while(true){
			if(nextNode.nodeType ==1){
				break ;
			}else{
				if(nextNode.nextSibling){
					nextNode = nextNode.nextSibling ;
				}else{
					break ;
				}
			}
		}
	}
	return nextNode ;
} ;

//添加删除样式 
function addClass(node,str){
	if(!new RegExp("(^|\\s+)"+str).test(node.className)){
		node.className = node.className + " " + str ;
	}
}

function removeClass(node,str){
	node.className=node.className.replace(new RegExp("(^|\\s+)"+str), '') ;
}


// 设置透明度，IE下用滤镜，FF下用opacity属性
function setOpacity(node, level){
	node = typeof node == "string" ? document.getElementById(node) : node ;
	if(document.all){
		node.style.filter = 'alpha(opacity=' + level + ')' ;
	}else{
		node.style.opacity = level/100 ;
	}
};

// 事件对象
function getEventTarget(e){
	e = window.event || e;
	return e.srcElement || e.target ;
};

// 阻止事件冒泡
function stopPropagation(e){
	e = window.event || e;
	if(document.all){
		e.cancelBubble = true ;
	}else{
		e.stopPropagation() ;
	}
} ;

// 为元素添加事件，增加this的指向，默认指向node
function on(node, eventType, handler, scope){
	node = typeof node == "string" ? document.getElementById(node) : node ;
	scope = scope || node ;
	if(document.all){
		node.attachEvent("on"+eventType, function(){handler.apply(scope,arguments)}) ;
	}else{
		node.addEventListener(eventType, function(){handler.apply(scope,arguments)},false) ;
	}
} ;

//功能扩展部分
// 提供js原生未提供的去首尾空白符
function trim(ostr){
	return ostr.replace(/^\s+|\s+$/g, "") ;
}

// 通过id获取节点
function getById(node){
	node = typeof node == "string" ? document.getElementById(node) : node ;
	return node;
}
// 通过class获取节点,str是class名，root是上一节点，tag是查找的标签
function getByClass(str, root, tag){
	if(root){
		root = typeof root == "string" ? document.getElementById(root) : root ;
	}else{
		root = document.body ;
	}
	tag = tag||"*" ;
	var els = root.getElementsByTagName(tag),
		arr =[] ;
	for(var i =0,n=els.length ;i<n ;i++){
		for(var j =0 ,k=els[i].className.split(" "),l =k.length ;j<l ;j++){
			if(k[j]==str){
				arr.push(els[i]) ;
				break ;
			}
		}
	}
	return arr ;
}

// 类型判断方法
function isNumber(s){
	return !isNaN(s) ;
}
function isString(s){
	return typeof s === "string" ;
}
function isBoolean(s){
	return typeof s === "boolean" ;
}
function isFunction(s){
	return typeof s === "function" ;
}
function isNull(s){
	return s === null ;
}
function isUndefined(s){
	return typeof s === "undefined" ;
}
function isEmpty(s){
	return /^\s*$/.test(s) ;
}
function isArray(s){
	return s instanceof Array ;
}

// 设置css3样式
function setCss3 (obj,attrObj) {  
  for (var i in attrObj) {
    var newi=i;
    if(newi.indexOf("-")>0){
      var num=newi.indexOf("-");
      newi=newi.replace(newi.substr(num,2),newi.substr(num+1,1).toUpperCase());
    }
    obj.style[newi]=attrObj[i];
    newi=newi.replace(newi.charAt(0),newi.charAt(0).toUpperCase());
    obj.style["webkit"+newi]=attrObj[i];
    obj.style["moz"+newi]=attrObj[i];
    obj.style["o"+newi]=attrObj[i];
    obj.style["ms"+newi]=attrObj[i];
  }
}

// 继承
function extend(subClass ,superClass){
	var F = function(){} ;
	F.prototype = superClass.prototype ;
	subClass.prototype = new F() ;
	subClass.prototype.constructor = subClass ;
	subClass.superclass = superClass .prototype ;
	if(superClass.prototype.constructor == Object.prototype.constructor){
		superClass.prototype.constructor = superClass ;
	}
}
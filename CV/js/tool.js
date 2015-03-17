var EventUtil={
	addHandler: function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false) ;
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler) ;
		}else{
			element["on"+type]=handler ;
		}
	},
	removeHandler:function(){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false) ;
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler) ;
		}else{
			element["on"+type]=null ;
		}
	},
	stopBubble:function(ev){  //阻止事件冒泡
		if(ev.stopPropagation){
	        ev.stopPropagation();
	    }else{
	        ev.cancelBubble=true;
	    }
	},
}

//运动方法框架
function startMove(obj, json, fnEnd){
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
     	var bStop=true;	 //假设：所有值都已经到了
     	for(var attr in json){
      		var cur=0;
	   		if(attr=='opacity'){
	   			cur=Math.round(parseFloat(getStyle(obj, attr))*100);
	  		}else{
	   			cur=parseInt(getStyle(obj, attr));
	  		}
	  	 	var speed=(json[attr]-cur)/5;
	   		speed=speed>0?Math.ceil(speed):Math.floor(speed);
	   		if(cur!=json[attr])
	   			bStop=false;
	   		if(attr=='opacity'){
	    		obj.style.filter='alpha(opacity:'+(cur+speed)+')';
	    		obj.style.opacity=(cur+speed)/100;
	   		}else{
	    		obj.style[attr]=cur+speed+'px';
	   		}
	 	}
	  	if(bStop){
	   		clearInterval(obj.timer);
	   		if(fnEnd)fnEnd();
	  	}
 	}, 30);
}

function getStyle(obj, name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj, false)[name];
	}
}

// 悬浮运动
function floatMove(oDiv,iTarget){
	clearInterval(oDiv.timer);
	oDiv.timer=setInterval(function (){
		var speed=(iTarget-oDiv.offsetTop)/5;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(oDiv.offsetTop==iTarget){
			clearInterval(oDiv.timer);
		}else{
			oDiv.style.top=oDiv.offsetTop+speed+'px';
		}
	}, 30);
}

//三维X轴旋转
function divTurn(box,init){
  	clearInterval(box.timer) ;
  	box.angle=init ;
  	box.timer=setInterval(function(){
  		if(init==0){
    		box.angle+=4 ;
  		}else{
  			box.angle-=4 ;
  		} 
	    if(box.angle<=0||box.angle>=180){  	
	     	clearInterval(box.timer) ;
	    }
	    setCss3(box,{transform:"rotateX("+box.angle+"deg)"}) ;
  },30) ;
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

//获取css属性,非css3
function GetCurrentStyle (obj, prop){
    if (obj.currentStyle){  //IE 
        return obj.currentStyle[prop];
    }else if (window.getComputedStyle) { //非IE
        propprop = prop.replace (/([A-Z])/g, "-$1");
        propprop = prop.toLowerCase ();
        return document.defaultView.getComputedStyle(obj,null)[propprop];
    }
    return null;
 }

(function($){
	$.extend($.fn,{
		scrollTo:function(time,to){
			time=time||800;
			to=to||1;
            $('a[href*=#]', this).click(function(){
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var $target = $(this.hash);
                    $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
                    if ($target.length) {
                        if (to == 1) {
                            $('html,body').animate({
                                scrollTop: $target.offset().top
                            }, time);
                        }
                        else if(to==2){
                            $('html,body').animate({
                                scrollLeft: $target.offset().left
                            }, time);
                        }else{
							alert('argument error！');
						}
                        return false;
                    }
                }
            });
		}
	});
})(jQuery);

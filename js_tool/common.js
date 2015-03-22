// 需要导入base.js文件，里面有GOLBAL.namespace()方法

GLOBAL.namespace("Cookie") ;
GLOBAL.Cookie={
	read : function(name){
		var cookieStr = "; " + document.cookie + "; " ;
			index = cookieStr.indexOf("; " + name +"=") ;
		if(index != -1){
			var s = cookieStr.indexOf(index + name.length+3, cookieStr.length) ;
			return unescape(s.substring(0, s.indexOf("; "))) ;
		}else{
			return null ;
		}
	},

	set : function(name, value, expires){
		var expDays = expires*24*60*60*1000 ;
		var expDate = new Date() ;
		expDate.setTime(expDate.getTime()+expDays) ;
		var expString = expires ? "; expires=" + expDate.toGMTString() : "" ;
		var pathString = ";path=/" ;
		document.cookie = name + "=" + escape(value) + expString + pathString ;
	},

	del : function(name){
		var exp = new Date(new Date().getTime()-1) ;
		var s = this.read(name) ;
		if(s != null ){
			document.cookie = name + "=" + s + ";expires=" + exp.toGMTString() +";path=/" ;
		} 
	}
} ;
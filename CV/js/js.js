;$(function(){
	// title部分控制
	var $oMoveBox=$(".header-bar .title .move-block") ; 
		$titleUl=$(".header-bar .title .tit-ul") ;
		$rightBlociUl=$(".left-block .right-block-ul") ;

	addEvenToUl($titleUl[0],$oMoveBox[0]) ;
	$titleUl.scrollTo(700) ;
	$rightBlociUl.scrollTo(700) ;
	
	//基本部分，div翻转，待优化，通过获取css3样式来判断翻转方向。
	var $box1=$(".body-one .box .personal .info ") ;
		$info=$(".body-one .box .personal .info .outbox") ;
		flag=true ;
		flag1=true ;
	$box1[0].onclick=function(){
		if(flag){	
			divTurn($info[0],0) ;
			flag=false ;
		}else{
			divTurn($info[0],180) ;
			flag=true ;
		}
	}
	$box1[1].onclick=function(){
		if(flag1){	
			divTurn($info[1],0) ;
			flag1=false ;
		}else{
			divTurn($info[1],180) ;
			flag1=true ;
		}
	}
	// 相关技能部分初始化方法
	initTecBlock() ;
	//自我介绍轮播器初始化
	initAutoPlay();

}) ;
window.onload=function(){

}
window.onscroll=function(){
	// 右侧导航栏
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		$aBtn=$(".left-block .right-block-ul li a") ;
		leftDiv=$(".left-block")[0] ;

	if(scrollTop<150){
		leftDiv.style.display="none" ;
	}else{

		leftDiv.style.display="block" ;
		floatMove(leftDiv,Math.floor(document.documentElement.clientHeight/2)-leftDiv.offsetHeight+scrollTop) ;
	}

	// 实习经验板块
	if(scrollTop>400&&scrollTop<1700){
		startMove($(".body-two .work-one")[0],{left:20}) ;
		startMove($(".body-two .work-two")[0],{left:130}) ;
	}else{
		startMove($(".body-two .work-one")[0],{left:-1020}) ;
		startMove($(".body-two .work-two")[0],{left:1130}) ;
	}

	//技能板块title下拉效果


}

function initAutoPlay(){
	var oDiv=$(".body-four .autoplay")[0],
		oBtnPrev=$(".body-four .autoplay .bigwindow .big-pic .prev")[0] ,
		oBtnNext=$(".body-four .autoplay .bigwindow .big-pic .next")[0] ,
		oMarkLeft=$(".body-four .autoplay .bigwindow .big-pic .mark-left")[0] ,
		oMarkRight=$(".body-four .autoplay .bigwindow .big-pic .mark-right")[0] ,

		oDivSmall =$(".body-four .autoplay .smallwindow .small-pic")[0] ,
		oUlSmall=$(".body-four .autoplay .smallwindow .small-pic ul")[0] ,
		$aLiSmall=$(".body-four .autoplay .smallwindow .small-pic li"),

		oUlBig=$(".body-four .autoplay .bigwindow .big-pic")[0] ,
		$aLiBig=$(".body-four .autoplay .bigwindow .big-pic li"),
		$aLiUpBorder=$(".body-four .autoplay .upborder li"),
		$aLiDownBorder=$(".body-four .autoplay .downborder li"),

		nowZIndex=2,
		now=0;

	//电影胶卷白框分布
	for(var i=0,len=$aLiUpBorder.length;i<len;i++){
		setCss3($aLiUpBorder[i],{left:20+i*80+"px"});
		setCss3($aLiDownBorder[i],{left:20+i*80+"px"});
	}

	//左右按钮
	oBtnPrev.onmouseover=oMarkLeft.onmouseover=function (){
		startMove(oBtnPrev, {opacity:100});
	};
	oBtnPrev.onmouseout=oMarkLeft.onmouseout=function (){
		startMove(oBtnPrev, {opacity:0});
	};
	oBtnNext.onmouseover=oMarkRight.onmouseover=function (){
		startMove(oBtnNext, {opacity:100});
	};
	oBtnNext.onmouseout=oMarkRight.onmouseout=function (){
		startMove(oBtnNext, {opacity:0});
	};

	//大图切换
	for(var i=0,len=$aLiSmall.length;i<len;i++){
		$aLiSmall[i].index=i;
		$aLiSmall[i].onclick=function(){
			if(this.index==now) return;
			now=this.index;
			tab();
		};
		$aLiSmall[i].onmouseover=function (){
			startMove(this, {opacity: 100});
		};
		$aLiSmall[i].onmouseout=function (){
			if(this.index!=now){
				startMove(this, {opacity: 60});
			}
		};

	}

	function tab(){
		$aLiBig[now].style.zIndex=nowZIndex++;
		for(var i=0,len=$aLiSmall.length;i<len;i++){ //小图先变暗，再把选定小图变亮
			startMove($aLiSmall[i], {opacity:60});
		}
		startMove($aLiSmall[now], {opacity:100});
		$aLiBig[now].style.width=0;
		startMove($aLiBig[now], {width:540});
		if(now==0){
			startMove(oUlSmall, {top:0});
		}else if(now==($aLiSmall).length-1){
			startMove(oUlSmall, {top:-(now-2)*($aLiSmall[0]).offsetHeight});
		}else{
			startMove(oUlSmall, {top:-(now-1)*($aLiSmall[0]).offsetHeight});
		}
		//放映滚动效果 TODO
		/*for(var i=0,len=$aLiUpBorder.length;i<len;i++){
		}*/

	}
	oBtnPrev.onclick=function (){
		now--;
		if(now==-1){
			now=$aLiSmall.length-1;
		}
		tab();
	};
	oBtnNext.onclick=function (){
		now++;
		if(now==$aLiSmall.length){
			now=0;
		}	
		tab();
	};
	var timer=setInterval(oBtnNext.onclick, 3000);	
	oDiv.onmouseover=function (){
		clearInterval(timer);
	};
	oDiv.onmouseout=function (){
		timer=setInterval(oBtnNext.onclick, 3000);
	};
}

//相关技能部分初始化操作
function initTecBlock(){
	var $titCon=$(".body-three .select-ul .select-menu .tec-title") ,
		$titli=$(".body-three .select-ul .select-menu .tec-title li") ,
		$tecBox=$(".body-three .select-ul .left-menu .tec-box") ,
		$qianduanUl=$(".body-three .select-ul .left-menu .tec-box ul") ,
		$qianduanLi=$(".body-three .select-ul .left-menu .tec-box ul li") ,
		$labCon=$(".body-three .select-ul .card-content .card-box ul li") ,
		indexTrun=0;

	cardTurn($labCon[0]) ;
	for(var i=0,len=$qianduanLi.length;i<len;i++){
		$qianduanLi[i].onmouseover=function(ev){
			if("tab-active"==this.className){   //如果已经在当前页，则不进行翻页等操作
				return ;
			}
			for(var j=0,len=$qianduanLi.length;j<len;j++){
				$qianduanLi[j].className="" ;
			}
			this.className="tab-active" ;
			var num =this.id-1 ;
			
			cardTurn($labCon[num]) ;
			EventUtil.stopBubble(ev) ;
		}
	}

	function cardTurn(card){  //技能内容翻页效果
		clearInterval(card.timer) ;
	  	card.angle=-85 ;
	  	card.timer=setInterval(function(){
	    	card.angle+=2 ;
		    if(card.angle>=0){  	
		     	clearInterval(card.timer) ;
		     	card.angle=0;
		    }
		    setCss3(card,{transform:"rotateY("+card.angle+"deg)"}) ;
	  	},30) ;
	    setCss3(card,{zIndex:++indexTrun}) ;
	}

	//ul上触发委托事件，改方法可以优化工具方法
	EventUtil.addHandler($titCon[0],"mouseover",function(ev){ 
		var ev = ev||window.event ;
		var target =ev.target || ev.srcElement ;
		switch(target.id){
			case "webqian":
				$titli[0].className="select-active" ;
				$titli[1].className="" ;
				startMove($tecBox[0],{left:0});
			break ;
			case "webhou":
				$titli[1].className="select-active" ;
				$titli[0].className="" ;
				startMove($tecBox[0],{left:-275});
			break ;
		}
		EventUtil.stopBubble(ev) ;
	}) ;
}

function addEvenToUl(ul,omove){  //事件委托，在ul上触发
	EventUtil.addHandler(ul,"mouseover",function(ev){
		var ev = ev||window.event ;
		var target =ev.target || ev.srcElement ;
		switch(target.id){
			case "bar-one":
			startMove(omove,{left:8}) ;
			break ;
			case "bar-two":
			startMove(omove,{left:149}) ;
			break ;
			case "bar-three":
			startMove(omove,{left:291}) ;
			break ;
			case "bar-four":
			startMove(omove,{left:435}) ;
			break ;
		}
	}) ;
	EventUtil.addHandler(ul,"mouseout",function(){
		startMove(omove,{left:8}) ;
	}) ;
}

function doatuo(btn,action){ //模拟事件鼠标点击事件
	var ev = document.createEvent("MouseEvent") ;
	ev.initMouseEvent(action,true,true,document.defaultView,0,0,0,0,0,
		false,false,false,false,0,null) ;
	btn.dispatchEvent(ev) ;
}
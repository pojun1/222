
var row_marked = Array();
var row_over_color;
var row_marked_color;

function onRowOver(row, rowNo){
  if(row_marked[rowNo]==null||!row_marked[rowNo]){
    // use row.bgColor save ori color since it has no effect if has style backgroundColor
    row.bgColor=row.style.backgroundColor;
    row.style.backgroundColor=row_over_color!=null?row_over_color:'#CCFFCC';
  }
}
function onRowOut(row, rowNo){
  if(row_marked[rowNo]==null||!row_marked[rowNo]){
    row.style.backgroundColor=row.bgColor;
    row.bgColor='';
  }
}
function onRowClicked(row, rowNo){
  // FIXME: following several lines only works on IE
  whichIt = event.srcElement;
 	while (whichIt.tagName != "SELECT" && whichIt.tagName != "INPUT" && whichIt.tagName != "A") {
		whichIt = whichIt.parentElement;
		if (whichIt == null){
			// no link clicked, passed
			break;
		}
	}

	
	if (whichIt != null){
	  return;
	}
	if(row_marked[rowNo]==null||!row_marked[rowNo]){
	  row_marked[rowNo]=true;
	  row.style.backgroundColor = row_marked_color!=null?row_marked_color:'#FFCC99';
	}
	else{
	  row_marked[rowNo]=false;
	  row.style.backgroundColor = row_over_color!=null?row_over_color:'#CCFFCC';
	}
}

//弹出图层
function openNewDiv() {
	var m = "mask";
	// mask图层
   var sWidth,sHeight; 
   sWidth=document.documentElement.scrollWidth; 
   sHeight=document.documentElement.scrollHeight; 
   var bgObj=document.createElement("div"); 
   bgObj.setAttribute('id','bgDiv'); 
   bgObj.style.position="absolute"; 
   bgObj.style.top="0"; 
   bgObj.style.background="#fff"; 
   bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75"; 
   bgObj.style.opacity="0.6"; 
   bgObj.style.left="0"; 
   bgObj.style.width=sWidth + "px"; 
   bgObj.style.height=sHeight + "px"; 
   bgObj.style.zIndex = "10000"; 
   document.body.appendChild(bgObj); 

	// 新激活图层
	var newDiv = document.createElement("div");
	newDiv.id = "popDiv";
	newDiv.style.position = "absolute";
	newDiv.style.zIndex = "10001";
	newDiv.style.width = "200px";
	newDiv.style.height = "200px";
	newDiv.style.top = event.clientY + document.documentElement.scrollTop+"px";
	newDiv.style.left = event.clientX + document.documentElement.scrollLeft+"px";

	newDiv.style.background = "#EFEFEF";
	newDiv.style.border = "1px solid #666666";
	newDiv.style.padding = "5px";
	newDiv.align = "left"
	newDiv.innerHTML = "<div align=\"center\"><a href=\"javascript:void(0)\">-终端号详细信息-</a></div><br /><div align=\"center\"><img src=\"page/images/13221815.gif\" /></div><br />";
	document.body.appendChild(newDiv);
	
	createCloseBtn(newDiv);
	
	return newDiv;
}

function createCloseBtn(newDiv){
	// 关闭mask和新图层
	var newA = document.createElement("a");
	newA.href = "#";
	newA.innerHTML = "[ 关闭 ]";
	newA.onclick = function() {
		document.body.removeChild(document.getElementById("bgDiv"));
		document.body.removeChild(document.getElementById("popDiv"));
		return false;
	}
	newDiv.appendChild(newA);
}


//菜单展现
function MainDiv(Mainid){
element= document.getElementById(Mainid);
element.style.display = (element.style.display.toLowerCase() == "block"?"none":"block");
}
function SubDiv(Mainid,Subid){
element= document.getElementById(Mainid);
element.className = (element.className.toLowerCase() == "subdoton"?"subdotoff":"subdoton");
element= document.getElementById(Subid);
element.style.display = (element.style.display.toLowerCase() == "block"?"none":"block");
}

//屏幕变暗效果
function div_on(x,y){
  if (window.navigator.appName=="Microsoft Internet Explorer"&&window.navigator.appVersion.substring(window.navigator.appVersion.indexOf("MSIE")+5,window.navigator.appVersion.indexOf("MSIE")+8)>=5.5){
    document.getElementById("full").filters.blendTrans.apply();//这里是模糊滤镜效果，FF不支持
    }
	document.getElementById("full").style.visibility="visible";
  if (window.navigator.appName=="Microsoft Internet Explorer"&&window.navigator.appVersion.substring(window.navigator.appVersion.indexOf("MSIE")+5,window.navigator.appVersion.indexOf("MSIE")+8)>=5.5){
    document.getElementById("full").filters.blendTrans.play();//这里是模糊滤镜效果，FF不支持
    }
	document.getElementById("pop").style.width=x;
	document.getElementById("pop").style.height=y;
	document.getElementById("pop").style.left=window.document.body.clientWidth/2-x/2;
    document.getElementById("pop").style.top=window.document.body.clientHeight/2-y/2;
  if (window.navigator.appName=="Microsoft Internet Explorer"&&window.navigator.appVersion.substring(window.navigator.appVersion.indexOf("MSIE")+5,window.navigator.appVersion.indexOf("MSIE")+8)>=5.5){
	document.getElementById("pop").filters.blendTrans.apply();//这里是模糊滤镜效果，FF不支持
	}
    document.getElementById("pop").style.visibility="visible";
  if (window.navigator.appName=="Microsoft Internet Explorer"&&window.navigator.appVersion.substring(window.navigator.appVersion.indexOf("MSIE")+5,window.navigator.appVersion.indexOf("MSIE")+8)>=5.5){
    document.getElementById("pop").filters.blendTrans.play();//这里是模糊滤镜效果，FF不支持
	}
	
}
function div_off(){
	document.getElementById("full").style.visibility="hidden";
	document.getElementById("pop").style.visibility="hidden";
}


//网关sub
function subDiv(bankid,subid){
for(i=1;i<20;i++){
//	if(("bank"+i)!=bankid){
		//alert("123");
if(document.getElementById("bank"+i))
document.getElementById("bank"+i).className="close";
if(document.getElementById("sub"+i))
document.getElementById("sub"+i).style.display="none";
//}
}
//alert("123");
element= document.getElementById(bankid);
element.className = (element.className.toLowerCase() == "close"?"open":"close");
element= document.getElementById(subid);
element.style.display = (element.style.display.toLowerCase() == "block"?"none":"block");
}

function closeDiv(bankid,subid){
document.getElementById(bankid).className="close";
document.getElementById(subid).style.display="none";
	}


//演示用
function yanshi(){
	document.getElementById('loadding_mc').style.display='none';
	document.getElementById('list_info').style.display='block';
	}
//----------------------------------------------------------------------------
//  
//  主调用函数是 setday(this,[object])和setday(this)，[object]是控件输出的控件名，举两个例子：
//  一、<input name=txt><input type=button value=setday onclick="setday(this,document.all.txt)">
//  二、<input onfocus="setday(this)">
//  
//  本日历的年份限制是（1000 - 9999）
//  按ESC键关闭该控件
//  在年和月的显示地方点击时会分别出年与月的下拉框
//  控件外任意点击一点即可关闭该控件
/* 




说明：
1.受到iframe的限制，如果拖动出日历窗口，则日历会停止移动。
*/

//==================================================== 参数设定部分 =======================================================
var bMoveable=true;		//设置日历是否可以拖动
var _VersionInfo=""	//

//==================================================== WEB 页面显示部分 =====================================================
var strFrame;		//存放日历层的HTML代码
document.writeln('<div style="position:absolute;left:140px;top:-22px"><iframe id=thanksDateLayer src="javascript:true"  frameborder=0 style="position: absolute; width: 144; height: 211; z-index: 9998; display: none"></iframe></div>');
strFrame='<style>';
strFrame+='INPUT.button{BORDER-RIGHT: #E6B858 1px solid;BORDER-TOP: #E6B858 1px solid;BORDER-LEFT: #E6B858 1px solid;';
strFrame+='BORDER-BOTTOM: #E6B858 1px solid;BACKGROUND-COLOR: #fff8ec;font-family:宋体;}';
strFrame+='TD{FONT-SIZE: 9pt;font-family:宋体;}';
strFrame+='</style>';
strFrame+='<script>';
strFrame+='var datelayerx,datelayery;	/*存放日历控件的鼠标位置*/';
strFrame+='var bDrag;	/*标记是否开始拖动*/';
strFrame+='function document.onmousemove()	/*在鼠标移动事件中，如果开始拖动日历，则移动日历*/';
strFrame+='{if(bDrag && window.event.button==1)';
strFrame+='	{var DateLayer=parent.document.all.thanksDateLayer.style;';
strFrame+='		DateLayer.posLeft += window.event.clientX-datelayerx;/*由于每次移动以后鼠标位置都恢复为初始的位置，因此写法与div中不同*/';
strFrame+='		DateLayer.posTop += window.event.clientY-datelayery;}}';
strFrame+='function DragStart()		/*开始日历拖动*/';
strFrame+='{var DateLayer=parent.document.all.thanksDateLayer.style;';
strFrame+='	datelayerx=window.event.clientX;';
strFrame+='	datelayery=window.event.clientY;';
strFrame+='	bDrag=true;}';
strFrame+='function DragEnd(){		/*结束日历拖动*/';
strFrame+='	bDrag=false;}';
strFrame+='</script>';
strFrame+='<div style="z-index:9999;position: absolute; left:0; top:0;" onselectstart="return false"><span id=tmpSelectYearLayer  style="z-index: 9999;position: absolute;top: 3; left: 19;display: none"></span>';
strFrame+='<span id=tmpSelectMonthLayer  style="z-index: 9999;position: absolute;top: 3; left: 78;display: none"></span>';
strFrame+='<table border=1 cellspacing=0 cellpadding=0 width=142 height=160 bordercolor=#E6B858 bgcolor=#E6B858 >';
strFrame+='  <tr ><td width=142 height=23  bgcolor=#FFFFFF><table border=0 cellspacing=1 cellpadding=0 width=140  height=23>';
strFrame+='      <tr align=center ><td width=16 align=center bgcolor=#E6B858 style="font-size:12px;cursor: hand;color: #ffffff" ';
strFrame+='        onclick="parent.thanksPrevM()" title="向前翻 1 月" ><b >&lt;</b>';
strFrame+='        </td><td width=60 align=center style="font-size:12px;cursor:default"';
strFrame+='onmouseover="style.backgroundColor=\'#FFD700\'" onmouseout="style.backgroundColor=\'white\'" ';
strFrame+='onclick="parent.tmpSelectYearInnerHTML(this.innerText.substring(0,4))" title="点击这里选择年份"><span id=thanksYearHead></span></td>';
strFrame+='<td width=48 align=center style="font-size:12px;cursor:default" onmouseover="style.backgroundColor=\'#FFD700\'" ';
strFrame+=' onmouseout="style.backgroundColor=\'white\'" onclick="parent.tmpSelectMonthInnerHTML(this.innerText.length==3?this.innerText.substring(0,1):this.innerText.substring(0,2))"';
strFrame+='        title="点击这里选择月份"><span id=thanksMonthHead ></span></td>';
strFrame+='        <td width=16 bgcolor=#E6B858 align=center style="font-size:12px;cursor: hand;color: #ffffff" ';
strFrame+='         onclick="parent.thanksNextM()" title="向后翻 1 月" ><b >&gt;</b></td></tr>';
strFrame+='    </table></td></tr>';
strFrame+='  <tr ><td width=142 height=18 >';
strFrame+='<table border=1 cellspacing=0 cellpadding=0 bgcolor=#E6B858 ' + (bMoveable? 'onmousedown="DragStart()" onmouseup="DragEnd()"':'');
strFrame+=' BORDERCOLORLIGHT=#CCB27D BORDERCOLORDARK=#FFFFFF width=140 height=20  style="cursor:' + (bMoveable ? 'move':'default') + '">';
strFrame+='<tr  align=center valign=bottom><td style="font-size:12px;color:#FFFFFF" >日</td>';
strFrame+='<td style="font-size:12px;color:#FFFFFF" >一</td><td style="font-size:12px;color:#FFFFFF" >二</td>';
strFrame+='<td style="font-size:12px;color:#FFFFFF" >三</td><td style="font-size:12px;color:#FFFFFF" >四</td>';
strFrame+='<td style="font-size:12px;color:#FFFFFF" >五</td><td style="font-size:12px;color:#FFFFFF" >六</td></tr>';
strFrame+='</table></td></tr>';
strFrame+='  <tr ><td width=142 height=120 >';
strFrame+='    <table border=1 cellspacing=2 cellpadding=0 BORDERCOLORLIGHT=#CCB27D BORDERCOLORDARK=#FFFFFF bgcolor=#fff8ec width=140 height=120 >';
var n=0; for (j=0;j<5;j++){ strFrame+= ' <tr align=center >'; for (i=0;i<7;i++){
strFrame+='<td width=20 height=20 id=thanksDay'+n+' style="font-size:12px"  onclick=parent.thanksDayClick(this.innerText,0)></td>';n++;}
strFrame+='</tr>';}
strFrame+='      <tr align=center >';
for (i=35;i<39;i++)strFrame+='<td width=20 height=20 id=thanksDay'+i+' style="font-size:12px"  onclick="parent.thanksDayClick(this.innerText,0)"></td>';
strFrame+='        <td colspan=3 align=right ><span onclick=parent.closeLayer() style="font-size:12px;cursor: hand"';
strFrame+='          title="' + _VersionInfo + '"><u>关闭</u></span>&nbsp;</td></tr>';
strFrame+='    </table></td></tr><tr ><td >';
strFrame+='        <table border=0 cellspacing=1 cellpadding=0 width=100%  bgcolor=#FFFFFF>';
strFrame+='          <tr ><td  align=left><input  type=button class=button value="<<" title="向前翻 1 年" onclick="parent.thanksPrevY()" ';
strFrame+='             onfocus="this.blur()" style="font-size: 12px; height: 20px"><input  class=button title="向前翻 1 月" type=button ';
strFrame+='             value="< " onclick="parent.thanksPrevM()" onfocus="this.blur()" style="font-size: 12px; height: 20px"></td><td ';
strFrame+='              align=center><input  type=button class=button value=今天 onclick="parent.thanksToday()" ';
strFrame+='             onfocus="this.blur()" title="当前日期" style="font-size: 12px; height: 20px; cursor:hand"></td><td ';
strFrame+='              align=right><input  type=button class=button value=" >" onclick="parent.thanksNextM()" ';
strFrame+='             onfocus="this.blur()" title="向后翻 1 月" class=button style="font-size: 12px; height: 20px"><input ';
strFrame+='              type=button class=button value=">>" title="向后翻 1 年" onclick="parent.thanksNextY()"';
strFrame+='             onfocus="this.blur()" style="font-size: 12px; height: 20px"></td>';
strFrame+='</tr></table></td></tr></table></div>';

window.frames.thanksDateLayer.document.writeln(strFrame);
window.frames.thanksDateLayer.document.close();		//解决ie进度条不结束的问题

//==================================================== WEB 页面显示部分 ======================================================
var outObject;
var outButton;		//点击的按钮
var outDate="";		//存放对象的日期
var odatelayer=window.frames.thanksDateLayer.document.all;		//存放日历对象
function setday(tt,obj) //主调函数
{
	if (arguments.length >  2){alert("对不起！传入本控件的参数太多！");return;}
	if (arguments.length == 0){alert("对不起！您没有传回本控件任何参数！");return;}
	var dads  = document.all.thanksDateLayer.style;
	var th = tt;
	var ttop  = tt.offsetTop;     //TT控件的定位点高
	var thei  = tt.clientHeight;  //TT控件本身的高
	var tleft = tt.offsetLeft;    //TT控件的定位点宽
	var ttyp  = tt.type;          //TT控件的类型
	while (tt = tt.offsetParent){ttop+=tt.offsetTop; tleft+=tt.offsetLeft;}
	dads.top  = (ttyp=="image")? ttop+thei : ttop+thei+6;
	dads.left = tleft;
	outObject = (arguments.length == 1) ? th : obj;
	outButton = (arguments.length == 1) ? null : th;	//设定外部点击的按钮
	//根据当前输入框的日期显示日历的年月
	var reg = /^(\d+)-(\d{1,2})-(\d{1,2})$/; 
	var tempStr = outObject.value;
	var tempStr2 = tempStr.substring(0,4) + "-" + tempStr.substring(4,6) + "-" + tempStr.substring(6,8);
	//var r = outObject.value.match(reg); 
	
	//alert(tempStr2);
	
	r = tempStr2.match(reg);
	
	if(r!=null){
		r[2]=r[2]-1; 
		var d= new Date(r[1], r[2],r[3]); 
		if(d.getFullYear()==r[1] && d.getMonth()==r[2] && d.getDate()==r[3]){
			outDate=d;		//保存外部传入的日期
			
		}
		else outDate="";
			thanksSetDay(r[1],r[2]+1);
	}
	else{
		outDate="";
		thanksSetDay(new Date().getFullYear(), new Date().getMonth() + 1);
	}
	dads.display = '';

	event.returnValue=false;
}

var MonHead = new Array(12);    		   //定义阳历中每个月的最大天数
    MonHead[0] = 31; MonHead[1] = 28; MonHead[2] = 31; MonHead[3] = 30; MonHead[4]  = 31; MonHead[5]  = 30;
    MonHead[6] = 31; MonHead[7] = 31; MonHead[8] = 30; MonHead[9] = 31; MonHead[10] = 30; MonHead[11] = 31;

var thanksTheYear=new Date().getFullYear(); //定义年的变量的初始值
var thanksTheMonth=new Date().getMonth()+1; //定义月的变量的初始值
var thanksWDay=new Array(39);               //定义写日期的数组

function document.onclick()	{ 
  with(window.event)
  { if (srcElement != outObject && srcElement != outButton)
    closeLayer();
  }
}

function document.onkeyup()		//按Esc键关闭，切换焦点关闭
  {
    if (window.event.keyCode==27){
		if(outObject)outObject.blur();
		closeLayer();
	}
	else if(document.activeElement)
		if(document.activeElement.getAttribute("Author")==null && document.activeElement != outObject && document.activeElement != outButton)
		{
			closeLayer();
		}
  }

function thanksWriteHead(yy,mm)  //往 head 中写入当前的年与月
  {
	odatelayer.thanksYearHead.innerText  = yy + " 年";
    odatelayer.thanksMonthHead.innerText = mm + " 月";
  }

function tmpSelectYearInnerHTML(strYear) //年份的下拉框
{
  if (strYear.match(/\D/)!=null){alert("年份输入参数不是数字！");return;}
  var m = (strYear) ? strYear : new Date().getFullYear();
  if (m < 1000 || m > 9999) {alert("年份值不在 1000 到 9999 之间！");return;}
  var n = m - 10;
  if (n < 1000) n = 1000;
  if (n + 26 > 9999) n = 9974;
  var s = "<select  name=tmpSelectYear style='font-size: 12px' "
     s += "onblur='document.all.tmpSelectYearLayer.style.display=\"none\"' "
     s += "onchange='document.all.tmpSelectYearLayer.style.display=\"none\";"
     s += "parent.thanksTheYear = this.value; parent.thanksSetDay(parent.thanksTheYear,parent.thanksTheMonth)'>\r\n";
  var selectInnerHTML = s;
  for (var i = n; i < n + 26; i++)
  {
    if (i == m)
       {selectInnerHTML += "<option  value='" + i + "' selected>" + i + "年" + "</option>\r\n";}
    else {selectInnerHTML += "<option  value='" + i + "'>" + i + "年" + "</option>\r\n";}
  }
  selectInnerHTML += "</select>";
  odatelayer.tmpSelectYearLayer.style.display="";
  odatelayer.tmpSelectYearLayer.innerHTML = selectInnerHTML;
  odatelayer.tmpSelectYear.focus();
}

function tmpSelectMonthInnerHTML(strMonth) //月份的下拉框
{
  if (strMonth.match(/\D/)!=null){alert("月份输入参数不是数字！");return;}
  var m = (strMonth) ? strMonth : new Date().getMonth() + 1;
  var s = "<select  name=tmpSelectMonth style='font-size: 12px' "
     s += "onblur='document.all.tmpSelectMonthLayer.style.display=\"none\"' "
     s += "onchange='document.all.tmpSelectMonthLayer.style.display=\"none\";"
     s += "parent.thanksTheMonth = this.value; parent.thanksSetDay(parent.thanksTheYear,parent.thanksTheMonth)'>\r\n";
  var selectInnerHTML = s;
  for (var i = 1; i < 13; i++)
  {
    if (i == m)
       {selectInnerHTML += "<option  value='"+i+"' selected>"+i+"月"+"</option>\r\n";}
    else {selectInnerHTML += "<option  value='"+i+"'>"+i+"月"+"</option>\r\n";}
  }
  selectInnerHTML += "</select>";
  odatelayer.tmpSelectMonthLayer.style.display="";
  odatelayer.tmpSelectMonthLayer.innerHTML = selectInnerHTML;
  odatelayer.tmpSelectMonth.focus();
}

function closeLayer()               //这个层的关闭
  {
    document.all.thanksDateLayer.style.display="none";
  }

function IsPinYear(year)            //判断是否闰平年
  {
    if (0==year%4&&((year%100!=0)||(year%400==0))) return true;else return false;
  }

function GetMonthCount(year,month)  //闰年二月为29天
  {
    var c=MonHead[month-1];if((month==2)&&IsPinYear(year)) c++;return c;
  }
function GetDOW(day,month,year)     //求某天的星期几
  {
    var dt=new Date(year,month-1,day).getDay()/7; return dt;
  }

function thanksPrevY()  //往前翻 Year
  {
    if(thanksTheYear > 999 && thanksTheYear <10000){thanksTheYear--;}
    else{alert("年份超出范围（1000-9999）！");}
    thanksSetDay(thanksTheYear,thanksTheMonth);
  }
function thanksNextY()  //往后翻 Year
  {
    if(thanksTheYear > 999 && thanksTheYear <10000){thanksTheYear++;}
    else{alert("年份超出范围（1000-9999）！");}
    thanksSetDay(thanksTheYear,thanksTheMonth);
  }
function thanksToday()  //Today Button
  {
	var today;
    thanksTheYear = new Date().getFullYear();
    thanksTheMonth = new Date().getMonth()+1;
    if(thanksTheMonth<10){
      thanksTheMonth = "0"+thanksTheMonth;
    }
    today=new Date().getDate();
    if(today<10){
      today = "0"+today;
    }
    //thanksSetDay(thanksTheYear,thanksTheMonth);
    if(outObject){
		outObject.value=thanksTheYear + "" + thanksTheMonth + "" + today;
    }
    closeLayer();
  }
function thanksPrevM()  //往前翻月份
  {
    if(thanksTheMonth>1){thanksTheMonth--}else{thanksTheYear--;thanksTheMonth=12;}
    thanksSetDay(thanksTheYear,thanksTheMonth);
  }
function thanksNextM()  //往后翻月份
  {
    if(thanksTheMonth==12){thanksTheYear++;thanksTheMonth=1}else{thanksTheMonth++}
    thanksSetDay(thanksTheYear,thanksTheMonth);
  }

function thanksSetDay(yy,mm)   //主要的写程序**********
{
  thanksWriteHead(yy,mm);
  //设置当前年月的公共变量为传入值
  thanksTheYear=yy;
  thanksTheMonth=mm;
  
  for (var i = 0; i < 39; i++){thanksWDay[i]=""};  //将显示框的内容全部清空
  var day1 = 1,day2=1,firstday = new Date(yy,mm-1,1).getDay();  //某月第一天的星期几
  for (i=0;i<firstday;i++)thanksWDay[i]=GetMonthCount(mm==1?yy-1:yy,mm==1?12:mm-1)-firstday+i+1	//上个月的最后几天
  for (i = firstday; day1 < GetMonthCount(yy,mm)+1; i++){thanksWDay[i]=day1;day1++;}
  for (i=firstday+GetMonthCount(yy,mm);i<39;i++){thanksWDay[i]=day2;day2++}
  for (i = 0; i < 39; i++)
  { var da = eval("odatelayer.thanksDay"+i)     //书写新的一个月的日期星期排列
    if (thanksWDay[i]!="")
      { 
		//初始化边框
		da.borderColorLight="#CCB27D";
		da.borderColorDark="#FFFFFF";
		if(i<firstday)		//上个月的部分
		{
			da.innerHTML="<b><font color=gray>" + thanksWDay[i] + "</font></b>";
			da.title=(mm==1?12:mm-1) +"月" + thanksWDay[i] + "日";
			da.onclick=Function("thanksDayClick(this.innerText,-1)");
			if(!outDate)
				da.style.backgroundColor = ((mm==1?yy-1:yy) == new Date().getFullYear() && 
					(mm==1?12:mm-1) == new Date().getMonth()+1 && thanksWDay[i] == new Date().getDate()) ?
					 "#FFD700":"#e0e0e0";
			else
			{
				da.style.backgroundColor =((mm==1?yy-1:yy)==outDate.getFullYear() && (mm==1?12:mm-1)== outDate.getMonth() + 1 && 
				thanksWDay[i]==outDate.getDate())? "#00ffff" :
				(((mm==1?yy-1:yy) == new Date().getFullYear() && (mm==1?12:mm-1) == new Date().getMonth()+1 && 
				thanksWDay[i] == new Date().getDate()) ? "#FFD700":"#e0e0e0");
				//将选中的日期显示为凹下去
				if((mm==1?yy-1:yy)==outDate.getFullYear() && (mm==1?12:mm-1)== outDate.getMonth() + 1 && 
				thanksWDay[i]==outDate.getDate())
				{
					da.borderColorLight="#FFFFFF";
					da.borderColorDark="#CCB27D";
				}
			}
		}
		else if (i>=firstday+GetMonthCount(yy,mm))		//下个月的部分
		{
			da.innerHTML="<b><font color=gray>" + thanksWDay[i] + "</font></b>";
			da.title=(mm==12?1:mm+1) +"月" + thanksWDay[i] + "日";
			da.onclick=Function("thanksDayClick(this.innerText,1)");
			if(!outDate)
				da.style.backgroundColor = ((mm==12?yy+1:yy) == new Date().getFullYear() && 
					(mm==12?1:mm+1) == new Date().getMonth()+1 && thanksWDay[i] == new Date().getDate()) ?
					 "#FFD700":"#e0e0e0";
			else
			{
				da.style.backgroundColor =((mm==12?yy+1:yy)==outDate.getFullYear() && (mm==12?1:mm+1)== outDate.getMonth() + 1 && 
				thanksWDay[i]==outDate.getDate())? "#00ffff" :
				(((mm==12?yy+1:yy) == new Date().getFullYear() && (mm==12?1:mm+1) == new Date().getMonth()+1 && 
				thanksWDay[i] == new Date().getDate()) ? "#FFD700":"#e0e0e0");
				//将选中的日期显示为凹下去
				if((mm==12?yy+1:yy)==outDate.getFullYear() && (mm==12?1:mm+1)== outDate.getMonth() + 1 && 
				thanksWDay[i]==outDate.getDate())
				{
					da.borderColorLight="#FFFFFF";
					da.borderColorDark="#CCB27D";
				}
			}
		}
		else		//本月的部分
		{
			da.innerHTML="<b>" + thanksWDay[i] + "</b>";
			da.title=mm +"月" + thanksWDay[i] + "日";
			da.onclick=Function("thanksDayClick(this.innerText,0)");		//给td赋予onclick事件的处理
			//如果是当前选择的日期，则显示亮蓝色的背景；如果是当前日期，则显示暗黄色背景
			if(!outDate)
				da.style.backgroundColor = (yy == new Date().getFullYear() && mm == new Date().getMonth()+1 && thanksWDay[i] == new Date().getDate())?
					"#FFD700":"#e0e0e0";
			else
			{
				da.style.backgroundColor =(yy==outDate.getFullYear() && mm== outDate.getMonth() + 1 && thanksWDay[i]==outDate.getDate())?
					"#00ffff":((yy == new Date().getFullYear() && mm == new Date().getMonth()+1 && thanksWDay[i] == new Date().getDate())?
					"#FFD700":"#e0e0e0");
				//将选中的日期显示为凹下去
				if(yy==outDate.getFullYear() && mm== outDate.getMonth() + 1 && thanksWDay[i]==outDate.getDate())
				{
					da.borderColorLight="#FFFFFF";
					da.borderColorDark="#CCB27D";
				}
			}
		}
        da.style.cursor="hand"
      }
    else{da.innerHTML="";da.style.backgroundColor="";da.style.cursor="default"}
  }
}

function thanksDayClick(n,ex)  //点击显示框选取日期，主输入函数*************
{
  var yy=thanksTheYear;
  var mm = parseInt(thanksTheMonth)+ex;	//ex表示偏移量，用于选择上个月份和下个月份的日期
	//判断月份，并进行对应的处理
	if(mm<1){
		yy--;
		mm=12+mm;
	}
	else if(mm>12){
		yy++;
		mm=mm-12;
	}
	
  if (mm < 10){mm = "0" + mm;}
  if (outObject)
  {
    if (!n) {//outObject.value=""; 
      return;}
    if ( n < 10){n = "0" + n;}
    outObject.value= yy + "" + mm + "" + n ; //注：在这里你可以输出改成你想要的格式
    closeLayer(); 
  }
  else {closeLayer(); alert("您所要输出的控件对象并不存在！");}
}



//str前后的空格除去
function trim(str)
{
    var returnstr="";
    if(str == "")
       return "";
    var i = 0;
    for(i = 0;i<str.length;i++)
    {
        if(str.charAt(i) == ' ')
        {
            continue;
         }
        break;
    }
	//str = "" + str;
    str = str.substring(i,str.length);
    if(str =="")
       return "";
    for(i=str.length-1;i>=0;i--)
    {
        if(str.charAt(i)==' ')
        {
            continue;
         }
         break;
     }
     returnstr = str.substring(0,i+1);
     return returnstr;
}
//check number  
function isNumber(e){
  if(isNaN(e)){
    return false;
  }
  return true;
}
//check integer
function isInteger(e){ 
	
	if(isNaN(e)||e.indexOf('.')!=-1){
		return false;
	}
	return true;
}


//check positive integer
function isPosInteger(e){ 
	for(i=0;i<e.length;i++){
		var oneChar=e.charAt(i);
		if(oneChar<'0'||oneChar>'9'){
			return false;
		}
    	}
	if(e<0){
		return false;
	}
	return true;
}
//check positive integer
function isPosIntegerNew(e){ 
	if (isEmpty(e)) {
  		return false;
  	}
	for(i=0;i<e.length;i++){
		var oneChar=e.charAt(i);
		if(oneChar<'0'||oneChar>'9'){
			return false;
		}
    	}
	if(e<0){
		return false;
	}
	return true;
}
//check Emial
function isEmail(e){  
 if(e.indexOf('@')!=-1&&e.indexOf('.')!=-1)
 return true;
 else
 return false; 
}
//check isLetter
function isLetter(e){
  for(i=0;i<e.length;i++){
    var oneChar=e.charAt(i);
    if((oneChar<'a'||oneChar>'z')&&(oneChar<'A'||oneChar>'Z')){
      return false;
    }
    }
  return true;
} 

//check English name
function isEnglishName(e){
  for(i=0;i<e.length;i++){
    var oneChar=e.charAt(i);
    if((oneChar<'a'||oneChar>'z')&&(oneChar<'A'||oneChar>'Z')&&oneChar!=' '){
      return false;
    }
    }
  return true;
} 
function isLetAndPosInt(e){
  for(i=0;i<e.length;i++){
    var oneChar=e.charAt(i);
    if((oneChar<'a'||oneChar>'z')&&(oneChar<'0'||oneChar>'9')&&(oneChar<'A'||oneChar>'Z')){
      return false;
    }
    }
  return true;
} 
//判断是否是6-15位的由数字或者字母组成的密码
function isPasswd(s) 
{ 
var patrn=/^[a-zA-Z0-9]{6,15}$/
if (!patrn.exec(s)) return false 
return true 
}
//check is longer
function isLonger(str,length){
 if(str.length<length)
   return false;
 else
   return true;
}            
//check is shorter
function isShorter(str,length){
 if(str.length>length)
   return false;
 else
   return true;
}            
//判断是否合法金额域
    function isMoney(formName,moneyName) {
       money=eval("document."+formName+"."+moneyName+".value");
       var obj=eval("document."+formName+"."+moneyName);
       if (!isValid(money)){
       	 alert("请输入正确的金额!");
       	 obj.focus();
       	 return(false);
	}
	
       return(true);
    } 
    //判断是否是整数
    function isValid(theStr) {
       var flag = true;
       var theMask = '0123456789.,';
       theStr = trim(theStr);
       if (isEmpty(theStr))  flag=false;
       else
        { for (var i=0;i<theStr.length;i++){
           if (theMask.indexOf(theStr.substring(i,i+1)) == -1) {
              flag = false;
              break;
              }
           }
         }
         return flag;
     }    
//check empty
function isEmpty(e){
 var newString = trim(e);
 if(newString==null||newString=="")
   return true;
 else
   return false;
} 
//check empty
function isEmptyAny(formname,inputnames){
  var inputArray=inputnames.split(","); 
  var inputname,inputvalue; 
  for(i=0;i<inputArray.length;i++){ 
    //alert(inputArray[i]); 
    inputname=eval("document."+formname+"."+inputArray[i]);
    inputvalue=trim(inputname.value);
    if(inputvalue==""){
      //alert("??????!"); 
      inputname.focus();
      return true;
    }        
  }
  return false;
}
//检查日期是否如YYYYMMDD格式
function checkCalender(year,month,date,beginyear,endyear,formname,inputname){
  var input=eval("document."+formname+"."+inputname);
  if(year<beginyear||year>endyear){
    alert("请输入合法年份："+beginyear+"--"+endyear+"！"); 
    input.focus();
    return false;
  }
  leapyear = (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ?1:0;
  //alert(leapyear);
  var month_length = new Array(12)
  month_length[0] = 31;
  month_length[1] = leapyear ? 29 : 28;
  month_length[2] = 31;
  month_length[3] = 30;
  month_length[4] = 31;
  month_length[5] = 30;
  month_length[6] = 31;
  month_length[7] = 31;
  month_length[8] = 30;
  month_length[9] = 31;
  month_length[10] = 30;
  month_length[11] = 31;   
  if(month<1||month>12){
    alert("请输入合法月份：1--12"); 
    input.focus();
    return false;
  }
  var month1=parseInt(month,10)-1;
  if(date<1||date>month_length[month1]){
    alert("请输入合法日期：1--"+month_length[month1]); 
    input.focus();
    return false;
  }
  return true;  
}
//检查日期是否如YYYYMMDD格式
//输入的参数:beginyear、endyear（被检查日期的开始及结束年份） formname（被检查的FORM名称） inputname（被检查的TEXT-INPUT名称）
function checkDate(beginyear,endyear,formname,inputname){
  var input=eval("document."+formname+"."+inputname); 
  var strdate=input.value;
  if(isEmpty(strdate)==true||isPosInteger(strdate)==false||strdate.length!=8){
    alert("日期必须为8位的整数！"); 
    input.focus();
    return false;
  }
  var year=strdate.substr(0,4);
  var month=strdate.substr(4,2);
  var date=strdate.substr(6,2);  
  if(checkCalender(year,month,date,beginyear,endyear,formname,inputname)==false){
  return false; 
  } 
  return true;
}
function verifyTime(begindate,enddate,form){
    var begintime = eval("document."+form+"."+begindate+".value");
    var endtime = eval("document."+form+"."+enddate+".value"); 

    if (parseInt(begintime)> parseInt(endtime)){
      alert("请输入正确的时间，结束时间应不小于开始时间！");
      return false;
     } 
      return true;    
}


//汉化日期
function theDate()
{
	var Today = new Date();
	var year = Today.getYear(); 
	year=(year<1900?(1900+year):year); 
	var month= Today.getMonth();
	var date  = Today.getDate();
	var day  = Today.getDay();
	switch(day)
	{ 
	case 1:day="星期一";break;
	case 2:day="星期二";break;
	case 3:day="星期三";break;
	case 4:day="星期四";break;
	case 5:day="星期五";break;
	case 6:day="星期六";break;
	case 0:day="星期日";break;
	}
	document.write(year+"年");
	document.write(month+1);
	document.write("月"+date+"日");
	document.write(day);
}

//根据前端输入日期和间隔天数，得到另一个日期
//输入参数： intervalday(间隔天数) formname(网页表单名) inputname(表单中的输入对象名)
//输出参数： 新的8位日期
function dateOther(intervalday, formname, inputname,otherDate)
{
	var strdate = 20040101;
    if(otherDate==0){
         var Input = eval("document." + formname + "." + inputname);
         strdate = Input.value;
         
    }else{
         strdate = otherDate;
         
    }
    
    var year = parseInt(strdate.substr(0, 4),10);
    var month = parseInt(strdate.substr(4, 2),10)-1;
    var date = parseInt(strdate.substr(6, 2),10);
    	dateDate = new Date(year,month,date);
	for (var i = 0; i < Math.abs(intervalday); i++)
	{
		if (parseInt(intervalday)>=0)
			dateDate.setTime(dateDate.getTime()+1000*60*60*24);
		else
			dateDate.setTime(dateDate.getTime()-1000*60*60*24);
	}
	var strYear = dateDate.getFullYear(); 
	var strMonth = dateDate.getMonth()+1;
	var strDate = dateDate.getDate();
	if (strMonth<10)
		strMonth="0"+strMonth;
	if (strDate<10)
		strDate="0"+strDate;
	strdate = strYear+""+strMonth+""+strDate;

	//alert(strdate);
	return strdate;
}


function dateLimit(dates){
	var todays = new Date();
	if (dates!=0){
	   todays.setTime(todays.getTime()-1000*60*60*24*dates);
	}
	var years = todays.getYear(); 
	years=(years<1900?(1900+years):years); 
	var months= todays.getMonth()+1;
	var dates=todays.getDate();
	if(months<10)
		months="0"+months;
	if(dates<10)
		dates="0"+dates;
	var limitdays=years+""+months+""+dates;
	return limitdays;
}


function dayCheck(begindate,enddate,form,paraDays,serverDate){
  
  var endtime = eval("document."+form+"."+enddate+".value"); 
  var begintime	=0;
  var onlystart =20040101;
  if(serverDate==0){	
	  begintime = eval("document."+form+"."+begindate+".value");
	  
	  onlystart = dateOther(paraDays, form, begindate,0);
	  
	  if (parseFloat(onlystart)<parseFloat(endtime)){
  	  //alert("只能查询"+paraDays.toString()+"天范围内的记录");
  	  return 1;
      }
      if (parseFloat(begintime)>parseFloat(endtime)){
      //    alert("终止日期应大于起始日期");
      return 2;
  }
   }else{
      begintime = eval("document."+form+"."+begindate+".value");
      //begintime=serverDate;
      onlystart = dateOther(paraDays, form, begindate,0);
      if (parseFloat(onlystart)<parseFloat(serverDate)){
  	  //alert("只能查询"+paraDays.toString()+"天范围内的记录");
  	  return 1;
      }
      if (parseFloat(begintime)>parseFloat(serverDate)){
      //    alert("终止日期应大于起始日期");
      return 2;
   }
  
}
  return 0;
}
/*
交易明细日期检查

1 结束日期大于当前日期
2 起始日期大于当前日期
3 只能查询365天范围内记录
4 起始日期大于终止日期
5 只能查询3个月内记录 
*/
function detailCheck(begindate,enddate,form,paraDays,serverDate){
  
  var endtime = eval("document."+form+"."+enddate+".value"); //终止日期
  var begintime	=eval("document."+form+"."+begindate+".value");//起始日期
  var startTime =20040101;
  if (parseFloat(endtime)>parseFloat(serverDate)){
  	  //alert("结束日期大于当前日期!");
  	  return 1;
  }
  if (parseFloat(begintime)>parseFloat(serverDate)){
  	  //alert("起始日期大于当前日期!");
  	  return 2;
  }
  tailTime=dateOther(365, form, begindate,begintime);
  if (parseFloat(tailTime)<parseFloat(serverDate)){
  	  //alert("只能查询365天范围内记录!");
  	  return 3;
  }
  if (parseFloat(begintime)>parseFloat(endtime)){
  	  //alert("起始日期大于终止日期!");
  	  return 4;
  }
  var interTime=dateOther(92, form, begindate,begintime);
   if (parseFloat(endtime)>parseFloat(interTime)){
  	  //alert("只能查询3个月内记录!");
  	  return 5;
  }
 
  return 0;
}
/*
客户停用日期检查

1 停用日期小于当前日期
2 启用日期小于当前日期
3 只能查询365天范围内记录
4 停用日期大于启用日期
5 只能停用N个月，一个月30天 
*/
function userStopCheck(stopdate,startdate,form,Nmonth,serverDate){
  
  var stoptime = eval("document."+form+"."+stopdate+".value"); //停用日期
  var starttime	=eval("document."+form+"."+startdate+".value");//启用日期
  if (parseFloat(stoptime)<parseFloat(serverDate)){
  	  //alert("停用日期必须大于等于当前日期!");
  	  return 1;
  }
  if (parseFloat(starttime)<=parseFloat(serverDate)){
  	  //alert("启用日期必须大于当前日期!");
  	  return 2;
  }
   if (parseFloat(stoptime)>=parseFloat(starttime)){
  	  //alert("停用日期必须小于启用日期!");
  	  return 3;
  }
  var interDays=Nmonth*30;
  var interTime=dateOther(interDays, form, stoptime,starttime);
   if (parseFloat(starttime)>parseFloat(interTime)){
  	  //alert("只能停用"+Nmonth+"个月!");
  	  return 4;
  }
 
  return 0;
}

//////////////////////////页面显示功能JS函数//////////////////////////////
//function menuShow(menu) //定义显示菜单的方法，参数menu即菜单的id。
//{
//  menu.style.display='block';
  //注意这里如何用JavaScript改变style对象的属性来达到改变CSS属性的目的。
//}
//function menuHide(menu) //定义隐藏菜单的方法，参数menu即菜单的id。
//{
//  menu.style.display='none';
  //同上
//}
//function change_img(from_img,to_img){ //将from_img替换为to_img
// document.images[from_img].style.visibility = "hidden";
// document.images[to_img].style.visibility = "visible";
//}

function checkAreaLength(v,l){
 var s= v.value;
 var temlen=0;
 var len = 0;
 for(i=0;i<s.length;i++){
     var c = s.substr(i,1);
     var ts = escape(c);

     if(ts.substring(0,2) == "%u"){
      len+=2;
      len+=temlen;
      temlen=0;
     }
     else if(ts.substring(0,3) == "%0D"){
      temlen+=1;
     }
     else if(ts.substring(0,3) == "%0A"){
         temlen+=1;
     }
     else if(ts.substring(0,3) == "%20"){
      temlen+=1;
     }
      else{
      len+=1;
      len+=temlen;
      temlen=0;
     }
   }
  if(len>l){
	var aaa=Math.floor(l/2);
	alert("该输入项插入值过长！最多"+l+"个字符或"+aaa+"个汉字。");  	
    
    v.focus();
    return false;
  }
  return true;
}
//check phone
function isPhone(e){ 
  for(var i=0;i<e.length;i++){
    var oneChar=e.charAt(i);
    if(oneChar=="-"){
      continue;
    }      
    if(oneChar<'0'||oneChar>'9'){
      return false;
    }
    }
  return true;
}
//判断输入的数据长度是否合法
function checkgblength(v){
 var s = v.value;
 var l = v.maxLength;
 var len = 0;
   for(i=0;i<s.length;i++){
     var c = s.substr(i,1);
     var ts = escape(c);
     if(ts.substring(0,2) == "%u") {
      len+=2;
     } else {
      len+=1;
     }
   }
   if(l>=len){
     return true;
   }
   else{
	var aaa=Math.floor(l/2);
	alert("该输入项插入值过长！最多"+l+"个字符或"+aaa+"个汉字。");
    v.focus();
    return false;
   }
}

//判断是否合法Ip地址
function isIpAddr(v){
	var content = v.value.split(".");
	if(content.length!=4){
   		alert("输入ip不规范");
   		v.focus();
   		return false;
	}
	if(content[0].length<1||isNaN(content[0])||parseInt(content[0])<1||parseInt(content[0])>255){
      		alert("输入ip不规范");
      		v.focus();
      		return false;
   		}
	for(var i=1;i<content.length;i++){
   		if(content[i].length<1||isNaN(content[i])||parseInt(content[i])<0||parseInt(content[i])>255){
      		alert("输入ip不规范");
      		v.focus();
      		return false;
   		}
	}
	return true;
}


//check date
function isDate(str) //输入是YYYYMMDD
{
	if(str.length!=8){
		return false;
	}
	var y = str.substring(0,4);
	var m = str.substring(4,6)-1;
	var d = str.substring(6,8);
	
	var date = new Date(y,m,d);
	if((date.getFullYear()==y) && (date.getMonth()==m) && (date.getDate()==d) ){
		return true;
	}else{
		return false;
	}
}

/*
**功能描述:适用于采用统一的安全密码控件的校验
*参数说明：无
*作者：hushou
*创建日期：2005-03-09
*/
function isSafePassword(){
	if(document.safeInput1.allType()!="10000"){
		alert("请输入6位数字交易密码!");
		return false;
	}
	if(document.safeInput1.isValid()){
		alert("请输入正确的6位数字交易密码!");			
		return false;
	}
	
	return true;
}

/*
**功能描述:判断日期是否正确有效
*参数说明：
*dateObject：日期对象
*showMsg：表示日期类型（例如：预约日期）
*作者：hushou
*创建日期：2005-03-09
*/
function isValidDate(dateObject,showMsg){
	if (isEmpty(dateObject.value)){
		alert("您输入的"+showMsg+"不能为空，请您输入"+showMsg+"！");
		dateObject.focus();
		return false;
	}else if (!isDate(dateObject.value)){
		alert("您输入的"+showMsg+"不是8位日期，请您重新输入"+showMsg+"！");
		dateObject.focus();
		return false;
	}
	return true;
}

/*
**功能描述:判断输入的数字是否正确
*参数说明：
*numberObject：数字对象
*showMsg：表示数字类型（例如：基金赎回份额）
*作者：hushou
*创建日期：2005-03-09
*/
function isValidNumber(numberObject,showMsg){
	if (isEmpty(numberObject.value)){
		alert("您输入的"+showMsg+"不能为空，请您输入"+showMsg+"！");
		numberObject.focus();
		return false;
	}else if (!isNumber(numberObject.value)){
		alert("您输入的"+showMsg+"不是数字，请您重新输入"+showMsg+"！");
		numberObject.focus();
		return false;
	}
	return true;
}

/*
**功能描述:判断输入的非负数是否正确
*参数说明：
*posIntegerObject：非负数对象
*showMsg：表示非负数类型（例如：确认序号等）
*作者：hushou
*创建日期：2005-03-09
*/
function isValidPosInteger(posIntegerObject,showMsg){
	if (isEmpty(posIntegerObject.value)){
		alert("您输入的"+showMsg+"不能为空，请您输入"+showMsg+"！");
		posIntegerObject.focus();
		return false;
	}else if (!isPosInteger(posIntegerObject.value)){
		alert("您输入的"+showMsg+"不是数字，请您重新输入"+showMsg+"！");
		posIntegerObject.focus();
		return false;
	}
	return true;
}
/*****************************************************************
// 	 *功能描述:检查selectName2和selectName1是否相同
// 	 *参数说明：formname,selectName1,selectName2,idx,msg
		    FORM名称，选项1，选项2，标志位，提示信息
		    标志位：1 检查selectName1和selectName2是否相同
		    标志位：2 检查selectName2和selectName1是否相同
// 	 *作者：wangtq
// 	 *创建日期：2005-03-09
******************************************************************/ 
	
	function checkIfSame(formname,selectName1,selectName2,idx,msg)
	{
		var form=eval("document."+formname);
		var selectObj1=eval("document."+formname+"."+selectName1);	
		var selectObj2=eval("document."+formname+"."+selectName2);
		var selectValue1=selectObj1.options[selectObj1.selectedIndex].value;
		var selectValue2=selectObj2.options[selectObj2.selectedIndex].value;
		if(selectValue1==selectValue2){
			if(idx=='1'){
				alert(msg);
				selectObj1.focus();
				return false;
			}else if(idx=='2'){
				alert(msg);
				selectObj2.focus();
				return false;
			}						
		}
		return true;
	}
	
/*****************************************************************
// 	 *功能描述:屏蔽鼠标右键
// 	 *参数说明：无
// 	 *作者：huangyp
// 	 *创建日期：2005-04-02
******************************************************************/   
	function document.oncontextmenu(){event.returnValue=false;}//屏蔽鼠标右键 
/*****************************************************************
// 	 *功能描述:屏蔽F1帮助
// 	 *参数说明：无
// 	 *作者：huangyp
// 	 *创建日期：2005-04-02
******************************************************************/   	
	function window.onhelp(){return false} //屏蔽F1帮助 
/*****************************************************************
// 	 *功能描述:Ctrl+N、Shift+F10、F11、F5刷新、退格键 
// 	 *参数说明：无
// 	 *作者：huangyp
// 	 *创建日期：2005-04-02
******************************************************************/   
	function document.onkeydown() 
	{ 
	  if ((window.event.altKey)&& 
	      ((window.event.keyCode==37)||   //屏蔽 Alt+ 方向键 ← 
	       (window.event.keyCode==39)))   //屏蔽 Alt+ 方向键 → 
	  { 
	     event.returnValue=false; 
	  } 
	     /* 注：这还不是真正地屏蔽 Alt+ 方向键， 
	     因为 Alt+ 方向键弹出警告框时，按住 Alt 键不放， 
	     用鼠标点掉警告框，这种屏蔽方法就失效了。以后若 
	     有哪位高手有真正屏蔽 Alt 键的方法，请告知。*/ 
	  if ((event.keyCode==8&&document.activeElement.tagName!="INPUT"&&document.activeElement.tagName!="TEXTAREA")  ||                 //屏蔽退格删除键 
	      (event.keyCode==116)||                 //屏蔽 F5 刷新键 
	      (event.ctrlKey && event.keyCode==82)){ //Ctrl + R 
	     event.keyCode=0; 
	     event.returnValue=false; 
	     } 
	  if (event.keyCode==122){event.keyCode=0;event.returnValue=false;}  //屏蔽F11 
	  if (event.ctrlKey && event.keyCode==78) event.returnValue=false;   //屏蔽 Ctrl+n 
	  if (event.shiftKey && event.keyCode==121)event.returnValue=false;  //屏蔽 shift+F10 
	  if (window.event.srcElement.tagName == "A" && window.event.shiftKey)  
	      window.event.returnValue = false;             //屏蔽 shift 加鼠标左键新开一网页 
	  if ((window.event.altKey)&&(window.event.keyCode==115))             //屏蔽Alt+F4 
	  { 
	      window.showModelessDialog("about:blank","","dialogWidth:1px;dialogheight:1px"); 
	      return false; 
	  } 
	} 


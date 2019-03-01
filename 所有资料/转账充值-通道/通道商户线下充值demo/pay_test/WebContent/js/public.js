//----------------------------------------------------------
//	Liana 3.0 系统JS公用函数库
//
//----------------------------------------------------------
	
//----------------------------------------------------------
//	检查变量是否是浮点数
//	返回值：
//	true：	是整数
//	false：	不是整数
//----------------------------------------------------------
function isDecimal( s )
{
	var isDecimal = RegExp(/^[0-9]+(\.?)[0-9]+$/);
	return ( isDecimal.test(s) );
}

//----------------------------------------------------------
//	将页面中的所有checkbox置为选中状态或全不选状态
//	输入：choose 为布尔值
//	true：选中
//	false：不选
//----------------------------------------------------------
function selectAll( choose )
{
	var allCheck = document.all.tags("input");
	for(var i=0; i<allCheck.length; i++){
		var tagBody = allCheck[i];
		if (tagBody.getAttribute("type") == "checkbox")
		{
			tagBody.checked= choose;
		}
	}
}
//----------------------------------------------------------
//	判断输入的是不是数字或者字母
//	输入：theStr 为字符串
//	返回值：true：是false：不是
//----------------------------------------------------------
function isIntChar(theStr) {
   var flag = true;
   var theMask = '-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
 //----------------------------------------------------------
//	判断输入的是不是数字或者字母或者特殊字符
//	输入：theStr 为字符串
//	返回值：true：是false：不是
//----------------------------------------------------------
function isIntChar2(theStr) {
   var flag = true;
   var theMask = ' _-*&%$#@!~^()0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
//----------------------------------------------------------
//	对数据域重新进行编码
//	输入：数据域
//	返回值：
//	编码后的数据域
//----------------------------------------------------------
function encode(s)
{
	if(s == null ) 
		return s;
	if(s.length == 0) 
		return s;
	
	var ret = "";
	for(i=0;i<s.length;i++)
	{
		var c = s.substr(i,1);
		var ts = escape(c);
		if(ts.substring(0,2) == "%u") 
		{
			ret = ret + ts.replace("%u","@@");
		} else {
			ret = ret + c;
		}
	}
	return ret;
}

//----------------------------------------------------------
//	检验账号合法性
//	输入：账号的字符串
//	返回值：
//	true：账号合法
//	false：账号不合法
//----------------------------------------------------------
function validateAccount(account,length) 
{
	if( isEmpty(account) )
	{
		alert("账号不能为空！");
		return false;
	}
	
	if( !isInteger(account) )
	{
		alert("账号必须为数字！");
		return false;
	}
	
	if( isShorter(account,length) )
	{
		alert("账号长度为"+length+"位！");
		return false;
	}	
	
	return true;
}

//----------------------------------------------------------
//	百分率格式化
//	输入：0～100间的字符串
//	返回值：
//	格式化后的字符串
//----------------------------------------------------------
function getFmtRate(str) 
{
	var rate = parseInt(str);
	
	if ( rate > 100 || rate < 0 )
		return("-1");
	
	return (rate/100);
}

//----------------------------------------------------------
//	内部管理系统关闭，取消按钮实现
//----------------------------------------------------------
function pageClose(path){
	window.location.href = path + "main_right.html";	
}

//----------------------------------------------------------
//	检查变量是否为空
//	返回值：
//	true：为空
//	false：不为空
//----------------------------------------------------------
function isEmpty(e)
{
	if( trim(e) == "" )
		return true;
	else
		return false;
}

//----------------------------------------------------------
// 	去掉字符串前后的空格
//	返回值：
//	去除空格后的字符串
//----------------------------------------------------------
function trim(param) {
	if ((vRet = param) == '') { return vRet; }
	while (true) {
		if (vRet.indexOf (' ') == 0) {
			vRet = vRet.substring(1, parseInt(vRet.length));
		} else if ((parseInt(vRet.length) != 0) && (vRet.lastIndexOf (' ') == parseInt(vRet.length) - 1)) {
			vRet = vRet.substring(0, parseInt(vRet.length) - 1);
		} else {
			return vRet;
		}
	}
}

//----------------------------------------------------------
// 	检查输入文本框中是否包含“|”或“#”非法字符
//	返回值：
//	true：	合法
//	false：	非法
//----------------------------------------------------------
function isValidText(param) {
	if ((param.indexOf('|') >= 0) || (param.indexOf('#') >= 0) ) {
		alert("“|”和“#”为系统保留字符，请不要输入！");
		return false;
	}
	return true;
}

//----------------------------------------------------------
//	检查变量的长度比给出的长度短
//	返回值：
//	true：	变量长度<给出的长度
//	false：	变量长度>=给出的长度
//----------------------------------------------------------

function isShorter(str,reqlength)
{
	if( str.length<reqlength )
		return true;
	else
		return false;
}

//----------------------------------------------------------
//	检查变量是否是整数
//	返回值：
//	true：	是整数
//	false：	不是整数
//----------------------------------------------------------
function isInteger(str)
{ 
	// 检查变量的每一位是否都是数字
	for(i=0;i<str.length;i++)
	{
		var oneChar=str.charAt(i);
		
		if(oneChar<'0'||oneChar>'9'){
			return false;
		}

	}
	return true;
}

//----------------------------------------------------------
//	检验金额
//	返回值：
//	true：	合法
//	false：	非法
//----------------------------------------------------------
function isMoney(param) {
	if ((isNaN(param)) || (parseFloat(param) < 0) || (param.indexOf('.') == 0) || (param.lastIndexOf('.') == param.length - 1)) {
		return false;
	}
	//不支持科学计数
	if(param.indexOf('e') > 0) {
		return false;
	}
	//小数点后最多只允许保留两位有效数字	
	var docIndex = trim(param).lastIndexOf('.');
	if ((docIndex < parseInt(trim(param).length) - 3) && (docIndex >= 0)) {
		return false;
	}
	return true;
}

//----------------------------------------------------------
//	检验价格
//	返回值：
//	true：	合法
//	false：	非法
//----------------------------------------------------------
function isPrice(param) {
	if ((isNaN(param)) || (parseFloat(param) < 0) || (param.indexOf('.') == 0) || (param.lastIndexOf('.') == param.length - 1)) {
		return false;
	}
	//不支持科学计数
	if(param.indexOf('e') > 0) {
		return false;
	}
	//小数点后最多只允许保留四位有效数字	
	var docIndex = trim(param).lastIndexOf('.');
	if ((docIndex < parseInt(trim(param).length) - 5) && (docIndex >= 0)) {
		return false;
	}
	return true;
}

//----------------------------------------------------------
// 	检验日期是否符合YYYYMMDD的格式
//	返回值：
//	true：	日期合法
//	false：	日期不合法
//----------------------------------------------------------
function isDate(param) {
	var pattern = /^\d+$/;
	if ( param.length != 8 ) {
		return false;
	}
	if(!pattern.test(param)) {
		return false;
	}
	sYear = param.substring( 0, 4 );
	sMonth = param.substring( 4, 6 );
	sDay = param.substring( 6, 8 );
	if ( ( eval( sMonth ) < 1 ) || ( eval( sMonth )  > 12 ) ) {
		return false;
	}
	var leapYear = ((( sYear % 4 == 0 ) && ( sYear % 100 != 0 )) || ( sYear % 400 == 0 )) ? true : false;
	var monthDay = new Array(12);
	monthDay[0] = 31;
	monthDay[1] = leapYear ? 29 : 28;
	monthDay[2] = 31;
	monthDay[3] = 30;
	monthDay[4] = 31;
	monthDay[5] = 30;
	monthDay[6] = 31;
	monthDay[7] = 31;
	monthDay[8] = 30;
	monthDay[9] = 31;
	monthDay[10] = 30;
	monthDay[11] = 31;
	if ( ( eval( sDay ) < 1 ) || ( eval( sDay )  > monthDay[eval(sMonth)-1] ) ) {
		return false;
	}
	return true;
}

//----------------------------------------------------------
// 	检查email合法性
//	返回值：
//	true：	合法
//	false：	不合法
//----------------------------------------------------------
function isEmail(aEmail) {
	var bValidate = RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(aEmail);
	
	if ( bValidate )
	{
		return true;
	}
	else
		return false;
}

function isOrgNo(aParam) {
	var pattern = /\d{16}(\d|[A-Z]|[a-z])/;
	if((aParam.length != 17) || (!pattern.test(aParam))) {
		return false;
	}
	return true;
}

function isOperatorId(aParam) {
	var pattern = /\d{4}/;
	if((aParam.length != 4) || (!pattern.test(aParam))) {
		return false;
	}
	return true;
}

// 选中某个数据域
function makeFocus(txtObject) {
	txtObject.focus();
	txtObject.select();
}

//----------------------------------------------------------
//	金额格式化
//	返回值：
//	格式化后的字符串
//----------------------------------------------------------
function toFmtMoney(str) {
	var subAmt = trim(str);
	if((subAmt.indexOf(".") == -1)||(subAmt.length == 1)) {
		subAmt = subAmt + ".00";
	}
	if(subAmt.indexOf(".") == (subAmt.length - 2)) {
		subAmt = subAmt + "0";
	}
	if(subAmt.indexOf(".") < (subAmt.length - 3)){
		subAmt = subAmt.substr(0, subAmt.indexOf(".") + 3);
	}
	return (subAmt);
}

//----------------------------------------------------------
//	限制键盘输入，只许输入数字
//----------------------------------------------------------
function inputNumber(){
	if(event.keyCode < 48||event.keyCode > 57){
		event.returnValue=false;
	}		
}

function disable_Button(name){
	name.disabled=1
}

function reload(name1){	
	name1.reset();
}


//----------------------------------------------------------
//控制text域的最大输入长度
//用法：onblur="checkLength(this,要控制的长度);",
//----------------------------------------------------------
function checkLength(v,l){
 var s = v.value;
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
     return;
   }
   else{
	var aaa=Math.floor(l/2);
	alert("该输入项插入值过长！最多"+l+"个字符或"+aaa+"个汉字。");
    v.value = "";
    v.focus();
   }
}

//----------------------------------------------------------
//控制textarea域的最大输入长度
//用法：onblur="checkAreaLength(this,要控制的长度);"
//----------------------------------------------------------
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
    //v.value = "";
    v.focus();
    return false;
  }
  return true;
}

//----------------------------------------------------------
//	通用打印
//----------------------------------------------------------
function commonprint(t1,t2,w,h){
	var sarg=new Array();
	var sdata=document.all.item(t2);
	sarg[0]=t1;
	sarg[1]=sdata.outerHTML;
	window.showModalDialog("print.jsp",sarg,"dialogWidth:"+w+"px;dialogHeight:"+h+"px;center:yes;help:no;status:no;resizable:yes");
	return;
}

//----------------------------------------------------------
//	对金额进行转换，将金额转换为以元为单位，小数点后有两位
//	例：输入域1234，转换后隐含域为1234.00
//	Creation date: (2003-09-12)	
//	@author: ecc-wangdong
//	@version: 1.0
//	@param：form, txtmoney, hidmoney
//	@param说明：
//              FORM名，表现域名称，隐藏域名称
//	@condition：该表现域已赋初值	
//----------------------------------------------------------
function convertToMoneyYuan(form,txtmoney,hidmoney){
    var tonumber;
    var re = /,/g;
    var txt_money = eval("document."+form+"."+txtmoney);
    var hid_money = eval("document."+form+"."+hidmoney);
    if (txt_money.value != ""){
    	var temp = trim(txt_money.value);
    	if (temp == ""){
    		alert("请输入正确的金额!");
    		txt_money.value="";
				hid_money.value="";
				txt_money.focus();
    		return;
    	}
    }
    tonumber = txt_money.value.replace(re,"");

    txt_money.value = "";
    hid_money.value = "";
   if (tonumber !="" && tonumber!=null){
   	rep = / /g;
		var amt = tonumber.replace(rep,"");
		
		for(var j = 0; j < amt.length; j++){
			if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
				alert("请输入正确的金额!");
				txt_money.value="";
				hid_money.value="";
				txt_money.focus();
				return;
			}
		}
		if(amt.indexOf(".")!=amt.lastIndexOf(".")){
			alert("请输入正确的金额!");
			txt_money.focus();
			return;
		}
	
		re = /,/g;
		var amt1 = amt.replace(re,"");

		var amt2=parseFloat(amt1);		
		if(amt2<=0){
			alert("输入的金额小于或等于零,请重新输入!");
			txt_money.focus();
			return;
		}else{		//大于0的正数;
			if(amt1.indexOf(".")!=-1){				
				var str = amt1.substr(amt1.indexOf(".")+1);				
				if(str.length>2){
					alert("输入的金额小数点后只能保留两位,请重新输入!");
					txt_money.focus();
					return;
				}else if(str.length==1){
					amt1=amt1 + "0";
				}else if(str.length<1){
					amt1=amt1 + "00";
				}
			}else{
				amt1=amt1 + ".00";
			}
			if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
			alert("请输入正确的金额!");
			txt_money.focus();
			return;
			}
			hid_money.value=amt1;
			var temp=amt1.substring(0,amt1.indexOf("."));
			if (temp.length > 10){
			    alert("输入的金额太大，请重新输入!");
			    txt_money.focus();
			    return;
			}
			txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
			return;							
		}
    }
}

//----------------------------------------------------------
//	对金额进行转换，包括表现域和隐藏域
//	Creation date: (2003-09-12)	
//	@author: ecc-wangdong
//	@version: 1.0
//	@param：form, txtmoney, hidmoney
//	@param说明：
//              FORM名，表现域名称，隐藏域名称
//	@condition：该表现域已赋初值	
//----------------------------------------------------------
function convertToMoney2(form,txtmoney,hidmoney){
    var tonumber;
    var re = /,/g;
    var txt_money = eval("document."+form+"."+txtmoney);
    var hid_money = eval("document."+form+"."+hidmoney);
    tonumber = txt_money.value.replace(re,"");

    txt_money.value = "";
    if (tonumber !="" && tonumber!=null){
   	rep = / /g;
		var amt = tonumber.replace(rep,"");
		
		for(var j = 0; j < amt.length; j++){
			if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
				alert("请输入正确的金额!");
				txt_money.value="";
				txt_money.focus();
				return;
			}
		}
		if(amt.indexOf(".")!=amt.lastIndexOf(".")){
			alert("请输入正确的金额!");
			txt_money.focus();
			return;
		}
	
		re = /,/g;
		var amt1 = amt.replace(re,"");

		var amt2=parseFloat(amt1);		
		if(amt2<0){
			alert("输入的金额小于零,请重新输入!");
			txt_money.focus();
			return;
		}else{		//大于0的正数;
			if(amt1.indexOf(".")!=-1){				
				var str = amt1.substr(amt1.indexOf(".")+1);				
				if(str.length>2){
					alert("输入的金额小数点后只能保留两位,请重新输入!");
					txt_money.focus();
					return;
				}else if(str.length==1){
					amt1=amt1 + "0";
				}else if(str.length<1){
					amt1=amt1 + "00";
				}
			}else{
				amt1=amt1 + ".00";
			}
			if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
			alert("请输入正确的金额!");
			txt_money.focus();
			return;
			}
			hid_money.value=amt1.substring(0,amt1.indexOf(".")) + amt1.substr(amt1.indexOf(".")+1);
			var temp=amt1.substring(0,amt1.indexOf("."));
			if (hid_money.value.length > 18){
			    alert("金额太大");
			    txt_money.focus();
			    return;
			}
			txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
			return;							
		}
    }
}

//---------------------------------------------------------------------------
//	表现形式增加逗号，只对整数部分做处理，由上一个函数调用。
//	Creation date: (2003-09-12)	
//	@author: ecc-handong
//	@version: 1.0
//	@param：number
//	@param说明：需转换数值	
//---------------------------------------------------------------------------

function comma(number) {
	number = '' + number;
	if (number.length > 3) {
		var mod = number.length % 3;
		var output = (mod > 0 ? (number.substring(0,mod)) : '');
		for (i=0 ; i < Math.floor(number.length / 3); i++) {
			if ((mod == 0) && (i == 0))
				output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
			else
				output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return (output);
	}
	else return number;
}

//---------------------------------------------------------------------------
//	表现形式增加逗号，这个可作为单独使用。
//	Creation date: (2003-09-12)	
//	@author: ecc-wangdong,handong
//	@version: 1.0
//	@param：number
//	@param说明：
//              需转换数值	
//---------------------------------------------------------------------------
function displayComma(str) {
	str = '' + str;
	if ((str.indexOf("."))!= -1){
		str1 = str.substring(0,str.indexOf("."));
		str2 = str.substring(str.indexOf("."));
	}else{
		str1 = str;
	}
	if (str1.length > 3) {
		var mod = str1.length % 3;
		var output = (mod > 0 ? (str1.substring(0,mod)) : '');
		for (i=0 ; i < Math.floor(str1.length / 3); i++) {
			if ((mod == 0) && (i == 0))
				output += str1.substring(mod+ 3 * i, mod + 3 * i + 3);
			else
				output += ',' + str1.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		if ((str.indexOf("."))!= -1){
			output = output + str2;
		}
		return (output);
	}
	else return str;
}


//----------------------------------------------------------
//	生成Excel文件并保存
//	输入参数：
//	formName：要生成的数据所在的form名称
//	tableName：要生成的数据所在的table名称
//----------------------------------------------------------
function exportexcel(formName,tableName){
      	var oXL = new ActiveXObject("Excel.Application");
      	oXL.Visible = true;
      	var oWB = oXL.Workbooks.Add();
      	var oSheet = oWB.ActiveSheet;
      
      	var div1=document.all.item(formName);
      	var table1=div1.all.item(tableName);
      	var table=new Array();

	var retArr = getTableRowsCols(table1);
      	var rlen=retArr[0];
      	var clen=retArr[1];
	
      	var flagTable=new Array(rlen);
      	for(var i=0;i<rlen;i++){
      		flagTable[i]=new Array(clen);
      		for(var j=0;j<clen;j++){
      			flagTable[i][j]=0;
      		}
      	}

	var rowBegin=1, colBegin=1;		//导出的表格的起始位置
	
      	var c1=oSheet.Cells(rowBegin,colBegin);
      	var c2=oSheet.Cells(rlen+rowBegin-1,clen+colBegin-1);
      	oSheet.Range(c1,c2).VerticalAlignment = -4108;
      	oSheet.Range(c1,c2).HorizontalAlignment =  -4108;
      	
  	exportTable(oSheet, flagTable, table1, rowBegin, colBegin);    	
    	      	
       	oSheet.Range(oSheet.Cells(rowBegin,colBegin),oSheet.Cells(rlen+rowBegin-1,clen+colBegin-1)).EntireColumn.AutoFit();
      	oXL.UserControl = true;
      	oXL.Quit();
}

//返回当前表格的行数和列数
//参数：objTable, 表格对象
//返回：retArr, retArr[0], 行数；retArr[1], 列数
function getTableRowsCols(objTable)
{
	var rowCnt=0, colCnt=0;
	for (var i=0; i<objTable.rows.length; i++) {
		var row = objTable.rows[i];	//当前行
		var rowRows=1, rowCols=0;	//当前行的初始行数和列数
		for (var j=0; j<row.cells.length; j++) {
			var cell = row.cells[j];	//当前单元格
			if (cell.firstChild !=null && cell.firstChild.tagName == "TABLE") {
				var inRetArr = getTableRowsCols(cell.firstChild);
				rowCols +=inRetArr [1];
				rowRows = rowRows<inRetArr[0] ? inRetArr[0] : rowRows;
			} else {	//不是表格
				rowCols += parseInt(cell.colSpan);
				rowRows = rowRows<parseInt(cell.rowSpan) ? parseInt(cell.rowSpan) : rowRows;
			}
		}
		colCnt = colCnt<rowCols ? rowCols : colCnt;
		rowCnt += rowRows;
	}
	var retArr = new Array();
	retArr[0] = rowCnt;
	retArr[1] = colCnt;
	
	return retArr;
}

//导出表格
function exportTable(oSheet, flagTable, objTable, rowBegin, colBegin){
	var flagRow=0, flagCol=0;		//跟踪当前的表示表中的相对位置
	for(var i=0; i<objTable.rows.length; i++) {
		var row = objTable.rows[i];	//当前行
		flagCol = 0;
		var subTableRows = 1;		//当前行若有表格，则记录其中最大的行数
		for (var j=0; j<row.cells.length; j++) {
			while (flagTable[rowBegin-1+flagRow][colBegin-1+flagCol]==1) {
				flagCol++;
			}
			var cell=row.cells[j];	//当前单元格
			if (cell.firstChild !=null && cell.firstChild.tagName == "TABLE") {
				var retArrRows = getTableRowsCols(cell.firstChild)[0];
				subTableRows = subTableRows<retArrRows ? retArrRows : subTableRows;
				exportTable(oSheet, flagTable, cell.firstChild, rowBegin+flagRow, colBegin+flagCol);
			} else {
				
				oSheet.Cells(rowBegin+flagRow, colBegin+flagCol).Font.Bold=1;
	               	 				
				var rs=parseInt(cell.rowSpan);
	               	 	var cs=parseInt(cell.colSpan);
	               	 	oSheet.Cells(rowBegin+flagRow, colBegin+flagCol).NumberFormatLocal="@";
	               	 	oSheet.Cells(rowBegin+flagRow, colBegin+flagCol).Value = cell.innerText;
	               	 	oSheet.Range(oSheet.Cells(rowBegin+flagRow, colBegin+flagCol),oSheet.Cells(rowBegin+flagRow+rs-1,colBegin+flagCol+cs-1)).MergeCells = 1;  
				
				//填写当前单元格在标志表格中的标志
				for(var k=0; k<rs; k++) {
					for(var l=0; l<cs; l++) {
						flagTable[rowBegin-1+flagRow+k][colBegin-1+flagCol+l]=1;
					}
				}
			}
				
			flagCol =flagCol + cs - 1;	//加速标志表格的列的移动，因为当前表格已经标识了cs个标志单元  			              		
		}
		flagRow += subTableRows;
	}	
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

//-----------------------------
//	检查时间间隔是否在规定间隔之内
//	输入：
//	startDate/endDate为YYYYMMDD型日期字符串
//	interval：间隔，单位为天
//	返回：true 符合要求
//	false 不符合要求
//-----------------------------

function dateInterval(startDate,endDate,interval) {
	var date1 = new Date(eval(startDate.substring(0,4)),eval(startDate.substring(4,6))-1,eval(startDate.substring(6,8)));
	var date2 = new Date(eval(endDate.substring(0,4)),eval(endDate.substring(4,6))-1,eval(endDate.substring(6,8)));
	if ( ( date2 - date1 ) / 86400000 > eval(interval) - 1 )
		return false;
	return true;
}


//判断是否固定电话
function isFixedPhone(e){

	for(var i=0;i<e.length;i++)
	{
		var oneChar=e.charAt(i);    

		if(oneChar=="-")
		{
			continue;
		} 
		if(oneChar<'0'||oneChar>'9')
		{
			alert("电话号码不应该含有数字和字符‘-’以外的字符!");
			return false;
		}
	}
	return true;
}

//判断是否移动电话
function isMobilePhone(e)
{
	for(var i=0;i<e.length;i++)
	{
		var oneChar=e.charAt(i);    

		if(oneChar=="+")
		{
			continue;
		}
		if(oneChar<'0'||oneChar>'9')
		{
			alert("移动电话号码不应该含有数字和字符‘+’以外的字符!");
			return false;
		}
	}
	return true;
}

//-----------------------------
//校验正整数
//-----------------------------
function isPosInteger( param ) { 
 	for ( i=0; i<param.length; i++) {
		var oneChar=param.charAt(i);
		if (oneChar<'0'||oneChar>'9') {
	  		return false;
		}
  	}
  	return true;
}

//-----------------------------
//	翻页函数
//-----------------------------
function onPrePage(formname,startRow,showNum)
{
	var form = eval("document."+formname);
	form.beginPos.value =parseInt(startRow)-parseInt(showNum);
	if( parseInt(form.beginPos.value) < 0){
		form.beginPos.value ="0";
		alert("这是第一页");
	}else{  
		form.submit();
	}
}

function onNextPage(formname,startRow,lastRow,showNum)
{
	var form = eval("document."+formname);
	form.beginPos.value =parseInt(startRow)+parseInt(showNum);
	//alert("beginPos "+form.beginPos.value);
	if( parseInt(form.beginPos.value) > lastRow){ 
		form.beginPos.value =startRow;
		alert("这是最后一页");
	}else{
		form.submit();
	}
}

function onPageNum(formname,tmpform,iShowNum,pageTotal)
{
	var form = eval("document."+formname);
	var tmpform = eval("document."+tmpform);
	var pageNum = trim(tmpform.pageId.value);
	//alert("pageNum:"+pageNum);
	if(isEmpty(pageNum)||!isPosInteger(pageNum)){
		alert("页数必须大于0小于等于"+pageTotal+"!");
		tmpform.pageId.focus();
		return;
	}
	if(parseInt(pageNum) <1 || parseInt(pageNum) >parseInt(pageTotal)){ 
		alert("页数必须大于0小于等于"+pageTotal+"!");
		tmpform.pageId.focus();
		return;
	}
	form.beginPos.value =parseInt(iShowNum)*parseInt((pageNum-1));
//	form.pageId.value =tmpform.pageId.value;
	
	//alert("beginPos:"+form.beginPos.value);
	form.submit();
}

//-----------------------------
//	返回对话框中的文件路径
//-----------------------------
function getFilePath(filespec)
{
	oldSpec=filespec;
	index=filespec.indexOf("\\");
	while(index>=0)
    {
    	if(filespec.length>index)
		filespec=filespec.substring(index+1);
		index=filespec.indexOf("\\");
	}
	index=filespec.indexOf("/");
	while(index>=0)
    {
		if(filespec.length>index)
		filespec=filespec.substring(index+1);
		index=filespec.indexOf("/");
	}
	index=oldSpec.indexOf(filespec);
	return oldSpec.substring(0,index);
}


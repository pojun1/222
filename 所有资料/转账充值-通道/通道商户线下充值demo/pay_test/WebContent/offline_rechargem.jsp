<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.fuiou.pay.client.util.DateUtils"%>
<%
response.setHeader("Pragma", "No-cache");
response.setHeader("Cache-Control", "no-cache,no-store,max-age=0");
response.setDateHeader("Expires", 0);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>XXX商城-商户</title>
<link href="styles/style.css" rel="stylesheet" type="text/css" />
<style type="text/css">
table{ 
	margin:0 auto; 
} 
</style>
</head>
<body>
<!--top -->


<br />
<form name="pay" method="post" action="offline_rechargeSendm.jsp">
  <table width="70%" cellspacing="0" border="0" cellspacing="1" >
  <tr> 
		<td class="info_title" >模拟订单信息</td>
  </tr>
  <tr>
   <td width="100%"> 
		<table width="100%" border="0" cellspacing="1">
			
		 <tr>
		    <td width="200" class="bg_gray" align="right" >商户代码：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2"  	align="left"> &nbsp;
			    <input type="text" name="mchnt_cd"  size='30' maxlength = '15' value = '0002900F0096235'/>
		  </tr>
		  <tr>
		    <td width="200" class="bg_gray" align="right" >支付类型：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2" 	align="left">&nbsp;&nbsp;
		     <select name="order_pay_type">
		     	<option value="B2O" >B2O</option>
		     	  <option value="B2C" >B2C</option>  
						<option value="B2B" >B2B</option>
						<option value="B2CD" >B2CD</option>
					</select>
				</td>
			</tr>	
			
		  <tr>
		    <td width="200" class="bg_gray" align="right" >流水号：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2" 	align="left">&nbsp;&nbsp;<input type="text" name="mchnt_txn_ssn"  size='40' maxlength = '40' value = '<%=DateUtils.getCurrentDate("yyMMddHHmmssSSS")+DateUtils.getNewRandomCode(5)%>'/></td>
		  </tr>

		  <tr>
		    <td width="200" class="bg_gray" align="right" >系统代码：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2" 	align="left">&nbsp;&nbsp;<input type="text" name="sys_cd"  size='10' maxlength = '10' value = 'WBXT'/></td>
		  </tr>
		  
		  <tr>
		    <td width="200" class="bg_gray" align="right" >交易名称：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2" 	align="left">&nbsp;&nbsp;<input type="text" name="tran_name"  size='10' maxlength = '161' value = 'XXMCZ'/></td>
		  </tr>
		  
		   <tr>
		    <td width="200" class="bg_gray" align="right" >交易日期：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2" 	align="left">&nbsp;&nbsp;<input type="text" name="mchnt_txn_dt"  size='60' maxlength = '100' value = '<%=DateUtils.getCurrentDate()%>'/></td>
		  </tr>
		  
		  <tr>
		    <td width="200" class="bg_gray" align="right" >用户手机号：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2" 	align="left">&nbsp;&nbsp;<input type="text" name="in_cust_no"  size='30' maxlength = '100' value = '13816330001'/></td>
		  </tr>
		  
		  <tr>
		    <td width="200" class="bg_gray" align="right" >交易金额：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2" 	align="left">&nbsp;&nbsp;<input type="text" name="amt"  size='30' maxlength = '100' value = '1'/></td>
		  </tr>
		  
		  <tr>
		    <td width="200" class="bg_gray" align="right" >卡号：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2" 	align="left">&nbsp;&nbsp;<input type="text" name="acnt_no"  size='60' maxlength = '100' value = '6222001001127676964'/></td>
		  </tr>
		  
		  <tr>
		    <td width="200" class="bg_gray" align="right" >户名：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2" 	align="left">&nbsp;&nbsp;<input type="text" name="acnt_nm"  size='30' maxlength = '100' value = '李四'/></td>
		  </tr>
		  
		  <tr>
		    <td width="200" class="bg_gray" align="right" >前台地址：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2" 	align="left">&nbsp;&nbsp;<input type="text" name="page_notify_url"  size='300' maxlength = '100' value = 'http://www-1.fuiou.com:8888/pay_test/offline_back_result.jsp'/></td>
		  </tr>
		  
		  <tr>
		    <td width="200" class="bg_gray" align="right" >后台地址：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2" 	align="left">&nbsp;&nbsp;<input type="text" name="back_notify_url"  size='100' maxlength = '200' value = 'http://www-1.fuiou.com:8888/pay_test/offline_back_result.jsp'/></td>
		  </tr>
		  
		  <tr>
		    <td width="200" class="bg_gray" align="right" >备注：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2" 	align="left">&nbsp;&nbsp;<input type="text" name="rem"  size='100' maxlength = '100' value = ''/></td>
		  </tr>
		  
		  <tr>
		    <td width="200" class="bg_gray" align="right" >mchnt_key：&nbsp;&nbsp;</td>
		    <td class="bg_yellow2" 	align="left">&nbsp;&nbsp;<input type="text" name="mchnt_key"  size='30' maxlength = '100' value = '5old71wihg2tqjug9kkpxnhx9hiujoqj'/></td>
		  </tr>
		   
		  <tr>
		    <td height="50">&nbsp;</td>
		    <td><input type="submit" name="Submit" value="确 定" />&nbsp;&nbsp;&nbsp;&nbsp;
		      <input type="reset" name="Submit2" value="重 置" /></td>
		  </tr>
		  </table>
   </td>
  </tr>
</table>
</form>



</body>
</html>
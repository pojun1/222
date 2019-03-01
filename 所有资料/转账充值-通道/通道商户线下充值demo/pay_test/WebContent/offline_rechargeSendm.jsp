<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@page import="org.apache.commons.beanutils.BeanUtils"%>
<%@page import="com.fuiou.pay.client.txn.NewOrderData"%>
<%@page import="com.fuiou.pay.client.util.MD5"%>
<%@page import="com.fuiou.pay.client.util.StringUtils"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>提交到富友交易系统</title>
</head>
<script type="text/javascript">
function submitForm(){
document.getElementById("form").submit();
}
</script>
<%
String xml ="";
try{
request.setCharacterEncoding("UTF-8");
String mchnt_cd = StringUtils.nvl(request.getParameter("mchnt_cd"));
String tran_name = StringUtils.nvl(request.getParameter("tran_name"));
String sys_cd = StringUtils.nvl(request.getParameter("sys_cd"));
String mchnt_txn_ssn = StringUtils.nvl(request.getParameter("mchnt_txn_ssn"));
String mchnt_txn_dt = StringUtils.nvl(request.getParameter("mchnt_txn_dt"));
String in_cust_no = StringUtils.nvl(request.getParameter("in_cust_no"));
String amt = StringUtils.nvl(request.getParameter("amt"));
String page_notify_url = StringUtils.nvl(request.getParameter("page_notify_url"));
String back_notify_url = StringUtils.nvl(request.getParameter("back_notify_url"));
String order_pay_type = StringUtils.nvl(request.getParameter("order_pay_type"));
String rem = StringUtils.nvl(request.getParameter("rem"));
String mchnt_key = StringUtils.nvl(request.getParameter("mchnt_key"));
String acnt_no = StringUtils.nvl(request.getParameter("acnt_no")); 
String acnt_nm = StringUtils.nvl(request.getParameter("acnt_nm"));

String signDataStr =amt+"|"+back_notify_url+"|"+ in_cust_no+"|"+mchnt_cd+"|"+
		    mchnt_txn_dt+ "|"+mchnt_txn_ssn+"|"+order_pay_type+"|"+
			page_notify_url+"|"+rem+"|"+ sys_cd+"|"+tran_name+"|"+mchnt_key;
String signature = MD5.MD5Encode(signDataStr);
System.out.println("page signDataStr==="+signDataStr);
System.out.println("page md5==="+signature);
%>
<body onload="javascript:submitForm();">
<!-- test.fuiou.com:8080    www-1.fuiou.com:8888 pay.fuiou.com   pay.fuiou.com-->
 <!-- <form name="pay" method="post" action="http://www-1.fuiou.com/wg1_run/smpGate.do" id = "form"> -->
 <form name="pay" method="post" action="http://www-1.fuiou.com:8888/wg1_run/payOfflineMGate.do" id = "form">
<input type="hidden" value = '<%=signature%>' name="signature"/>
<input type="hidden" value = '<%=mchnt_cd%>' name="mchnt_cd"/>
<input type="hidden" value = '<%=tran_name%>' name="tran_name"/>
<input type="hidden" value = '<%=sys_cd%>' name="sys_cd"/>
<input type="hidden" value = '<%=mchnt_txn_ssn%>' name="mchnt_txn_ssn"/>
<input type="hidden" value = '<%=mchnt_txn_dt%>' name="mchnt_txn_dt"/>
<%-- <input type="hidden" value = '<%=out_cust_no%>' name="out_cust_no"/> --%>
<input type="hidden" value = '<%=in_cust_no%>' name="in_cust_no"/>
<%-- <input type="hidden" value = '<%=contract_no%>' name="contract_no"/>
<input type="hidden" value = '<%=acnt_no%>' name="acnt_no"/>
<input type="hidden" value = '<%=acnt_nm%>' name="acnt_nm"/> --%>
<input type="hidden" value = '<%=amt%>' name="amt"/>
<%-- <input type="hidden" value = '<%=cnaps%>' name="cnaps"/> --%>
<input type="hidden" value = '<%=page_notify_url%>' name="page_notify_url"/>
<input type="hidden" value = '<%=back_notify_url%>' name="back_notify_url"/>
<input type="hidden" value = '<%=order_pay_type%>' name="order_pay_type"/>
<%-- <input type="hidden" value = '<%=iss_ins_cd%>' name="iss_ins_cd"/> --%>
<input type="hidden" value = '<%=rem%>' name="rem"/>
<input type="hidden" value = '<%=acnt_no%>' name="acnt_no"/>
<input type="hidden" value = '<%=acnt_nm%>' name="acnt_nm"/>
</form>
</body>
<%}catch(Exception e){
	e.printStackTrace();
	out.print(e.getMessage());
} %>
<body>
</body>
</html>
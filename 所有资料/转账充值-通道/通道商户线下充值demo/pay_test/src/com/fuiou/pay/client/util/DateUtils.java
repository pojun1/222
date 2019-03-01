package com.fuiou.pay.client.util;

import java.text.SimpleDateFormat;

public class DateUtils {
    
    public static String getCurrentDate(String aFormat) {
        String tDate = new SimpleDateFormat(aFormat).format(new java.util.Date(System.currentTimeMillis()));
        return tDate;
    }
    
    public static String getCurrentDate() {
        return DateUtils.getCurrentDate("yyyyMMdd");
    }
    public static String getCurrentTime() {
        return DateUtils.getCurrentDate("HHmmss");
    }
    public static String getCurrentDateAndTime() {
        return DateUtils.getCurrentDate("yyyyMMddHHmmss");
    }
    
    public static String getNewRandomCode(int codeLen) {
		//首先定义随机数据源
		//根据需要得到的数据码的长度返回随机字符串
		java.util.Random randomCode = new java.util.Random();
		String strCode = "";
		while (codeLen > 0) {
			int charCode=randomCode.nextInt(9);
			strCode += charCode;
			codeLen--;
		}
		return strCode;
	}
    
    
    public static void main(String[] args) {
		System.out.println(getNewRandomCode(20));
	}
}

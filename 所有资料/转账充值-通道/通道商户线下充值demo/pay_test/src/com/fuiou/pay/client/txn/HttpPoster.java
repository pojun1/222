/*
 * File �� HttpPoster.java
 * 
 * Project: wcmn
 *
 * Modify Information:
 * =============================================================================
 *   Author          Date                      Description
 *   ------------ ---------- ---------------------------------------------------
 *   IBM          2008-10-8          Implement Programming Spec V1.0
 * ============================================================================= 
 */
package com.fuiou.pay.client.txn;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.InputStreamRequestEntity;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;




public class HttpPoster {
	private String responseString = "";
	  public HttpPoster() {
	  }
    /**
     * ʹ��httpЭ�鷢��xmltext��url
     * @param url   ��Ҫ���͵ĵ�ַ
     * @param xmltext  ��Ҫ���͵�����
     * @return   http����
     */
	  public  String post(String url,Map parameters) throws IOException{
	    PostMethod xmlpost;
	    int responseStatCode = 0;
	    HttpClient httpclient = new HttpClient();
	    httpclient.setConnectionTimeout(1000*30);
	    xmlpost = new PostMethod(url);
	    httpclient.getParams().setParameter(
	    		HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");

	    try {
	    	NameValuePair[] nameValuePairs = new NameValuePair[parameters.size()];
	    	Iterator keyIterator = parameters.keySet().iterator();
	    	int i = 0;
			while (keyIterator.hasNext())
			{
				Object key = keyIterator.next();
				String value = (String)parameters.get(key);
				NameValuePair name = new NameValuePair((String)key, value);
				nameValuePairs[i]=name;
				i++;
			}
	    	            
	         xmlpost.setRequestBody(nameValuePairs); 
	    	responseStatCode = httpclient.executeMethod(xmlpost);
	    	this.responseString = xmlpost.getResponseBodyAsString();
	    }
	    catch (IOException ex2) {
	    	System.out.println("���ķ��͵�["+url+"]ʧ��:"+ex2.getMessage());
	    	throw ex2;
	    }
	    System.out.println("HTTP������="+responseStatCode);
	    System.out.println("Ӧ������="+responseString);
	    return responseString;
	    
	  }
	 
	public String getResponseString() {
		return responseString;
	} 
	public static void main(String[] args) {
		Map map = new HashMap();
		map.put("ResMessage", "κ����");
		HttpPoster poster = new HttpPoster();
		try {
			System.out.println(poster.post("http://localhost:8080/paytest/1.jsp",map));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

package com.client;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.Properties;

//import org.apache.commons.io.IOUtils;
//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;

/**
 * 读取properties 文件
 * 请确保该文件位于classpath根目录下
 * @author zhouwei
 */
public class PropertiesUtil {

	//private static Log log = LogFactory.getLog(PropertiesUtil.class);
	/**
	 * 
	 * @param propertyFile properties文件�?
	 * @param propertyKey  键名
	 * @return 键值
	 */
	public static String getPropertyValue(String propertyFile,String propertyKey){
		String propertyValue = "";
		if(!"".equals(propertyFile) && propertyFile!=null){
			 Properties prop = new Properties(); 
		     InputStream in = PropertiesUtil.class.getResourceAsStream("/"+propertyFile); 
		     try {
				prop.load(in);
				propertyValue = prop.getProperty(propertyKey).trim(); 
			} catch (IOException e) {
				//log.error("can not load property file." + propertyFile, e);
				 System.out.println("can not load property file." + propertyFile);
			} finally {   
				//IOUtils.closeQuietly(in);
            }
		}
		return propertyValue;
	}
	/**
	 * 获取属性值
	 * @author luzh
	 * @param properties
	 * @param filePath
	 * @param comments
	 */
	public static Properties getProperties(String filePath){
		//log.info(filePath);
		Properties properties =  new  Properties();   
		InputStream in=null;     
		try {
			in = new BufferedInputStream (new FileInputStream(filePath));  
//			in = PropertiesUtil.class.getResourceAsStream(filePath);
			properties.load(in);
			//log.info(properties);
		} catch (Exception e) {
			//log.error(e.getMessage());
			e.printStackTrace();
		}finally{
//			IOUtils.closeQuietly(inputStream);
		}        
		return properties;
	}
	/**
	 * 设置属性值
	 * @author luzh
	 * @param properties
	 * @param filePath
	 * @param comments
	 */
	public static void setProperties(Properties properties,String filePath,String comments){
		FileOutputStream oFile=null;
		try {
		///保存属性到b.properties文件
		oFile = new FileOutputStream(filePath);//true表示追加打开
		properties.store(oFile, comments);
		} catch (Exception e) {
			//log.error(e.getMessage());
			e.printStackTrace();
		}finally{
			//IOUtils.closeQuietly(oFile);
		}        
	}
	
	/*
	 * 根据绝对路径加载配置文件
	 * Properties:资源
	 * propertyKey:键
	 *  @author 周伟
	 * */
	public static String getProperty(Properties prop,String propertyKey){

		String result= prop.getProperty(propertyKey);
		if(result!=null){
			result = result.trim();
		}
		else
		{
			System.out.println("property key" + propertyKey+" is not Exsit");
			result=propertyKey + " is not Exsit";					
		}
		return result;
	}
}

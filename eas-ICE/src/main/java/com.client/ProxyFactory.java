package com.client;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

//import org.apache.log4j.Logger;


public class ProxyFactory {
	//private static Logger logger=Logger.getLogger(ProxyFactory.class);
	@SuppressWarnings("rawtypes")
	public
	static Map<Class, BaseClient> clientList=
	new HashMap<Class, BaseClient>();
	private ProxyFactory(){}

	@SuppressWarnings("unchecked")
	public synchronized static <T extends BaseClient> T createProxy(Class<T> t,String endoint) throws SecurityException, NoSuchMethodException
	{		
		if (clientList.containsKey(t)&&clientList.get(t)!=null&&((BaseClient) clientList.get(t)).getObjPrx()!=null) {
			return (T) clientList.get(t);
		}
		else {
			T instanceT;
			try {
				Constructor<T> ct=	t.getDeclaredConstructor(new Class[]{String.class});
				ct.setAccessible(true);
				try {
					instanceT = (T)ct.newInstance(endoint);					
					int status= instanceT.init();
					if (status>0) {
						//logger.info("客户端代理:"+t.getName()+" 创建成功");
						System.out.println("客户端代理:"+t.getName()+" 创建成功");
					}
					else
					{
						throw new NullPointerException("创建类:"+t.getName()+" 失败");
					}
					clientList.put(t, instanceT);					
//					if(((BaseClient) instanceT).getObjPrx()==null){
//						return null;
//					}
					return instanceT;
				} catch (IllegalArgumentException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			} catch (InstantiationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	
			return null;
		}		
	}
	
	
	@SuppressWarnings("unchecked")
	public synchronized static <T extends BaseClient> T createProxy(Class<T> t,String endoint,String cfgFile) throws SecurityException, NoSuchMethodException
	{		
		if (clientList.containsKey(t)) {
			return (T) clientList.get(t);
		}
		else {
			T instanceT;
			try {
				Constructor<T> ct=	t.getDeclaredConstructor(String.class,String.class);
				ct.setAccessible(true);
				try {
					instanceT = (T)ct.newInstance(endoint,cfgFile);	
					clientList.put(t, instanceT);					
					int status= instanceT.init();
					if (status>0) {
						//logger.info("客户端代理:"+t.getName()+" 创建成功");
						System.out.println("客户端代理:"+t.getName()+" 创建成功");
					}
					else
					{
						throw new NullPointerException("创建类:"+t.getName()+" 失败");
					}
					return instanceT;
				} catch (IllegalArgumentException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			} catch (InstantiationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	
			return null;
		}		
	}

	
	

	public static void main(String[] args) {
		try {
			/*ExptManagerClient client=ProxyFactory.createProxy(ExptManagerClient.class, "ExptManagerI:tcp -h 192.168.82.99 -p 10000");
			client.joinExpt(159);*/
//			UserRightClient client=ProxyFactory.createProxy(UserRightClient.class, "UserRightServerI:tcp -h 192.168.82.99 -p 10001");
			//DepartmentClient client00=ProxyFactory.createProxy(DepartmentClient.class, "DepartmentServerI:tcp -h 192.168.82.208 -p 10001");
//			client.getPassword("zhouw");
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		} catch (NoSuchMethodException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		System.out.println("1111111111111");
		System.exit(0);
	}
}

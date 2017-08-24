package com.client;

import java.io.File;
import java.util.Properties;

import com.client.PropertiesUtil;
//import org.apache.log4j.Logger;
//
//import com.client.AlarmClient;
//import com.client.DepartmentClient;
//import com.client.ExpClient;
//import com.client.FirewallClient;
//import com.client.HostMonitorClient;
//import com.client.ImageClient;
//import com.client.KLlogClient;
//import com.client.LoadBalanceClient;
//import com.client.MessageClient;
//import com.client.ProxyFactory;
//import com.client.RemoteClient;
//import com.client.RightsClient;
//import com.client.RoleClient;
//import com.client.SceneClient;
//import com.client.SecurityGroupClient;
//import com.client.ServerClient;
//import com.client.ServiceMonitorClient;
//import com.client.SwitchesClient;
//import com.client.TopoClient;
//import com.client.UPRelativeClient;
//import com.client.UserClient;
//import com.client.VolumeClient;
//import com.kl.cloud.exp.web.controller.ExpController;
/**
 * ice客户端工具类
 * @author luzh
 * @date 2015-9-29 17:33:43
 */
public class IceClientUtil {
//	private static final Logger logger = Logger.getLogger(IceClientUtil.class);
//	private static ExpClient expClient = null;
//	private static KLlogClient logClient = null;
	private static ServerClient serverClient = null;
//	private static TopoClient topoClient = null;
//	private static UPRelativeClient upRelativeClient = null;
//	private static VolumeClient volumeClient = null;
//	private static ImageClient imageClient = null;
//	private static AlarmClient alarmClient = null;
//	private static MessageClient messageClient = null;
//	private static UserClient userClient = null;
//	private static HostMonitorClient hostMonitorClient = null;
//	private static ServiceMonitorClient serviceMonitorClient = null;
//	private static SwitchesClient switchesClient = null;
//	private static DepartmentClient departmentClient = null;
//	private static RightsClient rightsClient = null;
//	private static RoleClient roleClient = null;
//	private static FirewallClient firewallClient = null;
//	private static LoadBalanceClient loadBalanceClient = null;
//	private static SecurityGroupClient securityGroupClient = null;
//	private static SceneClient sceneClient = null;
//	private static RemoteClient remoteClient = null;
	private static String  strFile=null;
	private static Properties properties=null;
	static {
        strFile = IceClientUtil.class.getResource("/").getFile();
        strFile += "../../../";
		strFile += "ice.properties";
		File file = new File(strFile);
		String pathString=file.getPath();
		properties = PropertiesUtil.getProperties(pathString);
//		try {
//			/*String str = PropertiesUtil.getProperty(properties,
//					"ExptManager.Proxy");*/
//			String str = PropertiesUtil.getProperty(properties,"ExptManager.Proxy");
//			expClient = ProxyFactory.createProxy(ExpClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,"LoggerManager.Proxy");
//			logClient = ProxyFactory.createProxy(KLlogClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
		try {
			String str = PropertiesUtil.getProperty(properties,
					"ServerClient");
			serverClient = ProxyFactory.createProxy(ServerClient.class, str,strFile);
		} catch (Exception e) {
			//logger.error(e.getMessage());
            System.out.println(e.getMessage());
            e.printStackTrace();
		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"TopoManager.Proxy");
//			topoClient = ProxyFactory.createProxy(TopoClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"UPRelativeManager.Proxy");
//			upRelativeClient = ProxyFactory.createProxy(UPRelativeClient.class,
//					str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"VolumeManager.Proxy");
//			volumeClient = ProxyFactory.createProxy(VolumeClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"ImageManager.Proxy");
//			imageClient = ProxyFactory.createProxy(ImageClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"Alarm.Proxy");
//			alarmClient = ProxyFactory.createProxy(AlarmClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"MessageManager.Proxy");
//			messageClient = ProxyFactory.createProxy(MessageClient.class,
//					str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String strUser = PropertiesUtil.getProperty(properties,
//					"UserManager.Proxy");
//			userClient = ProxyFactory.createProxy(UserClient.class, strUser,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"HostMonitorClient");
//			hostMonitorClient = ProxyFactory.createProxy(
//					HostMonitorClient.class, str,strFile);
//		} catch (Exception e) {
//			//logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"ServerMonitor.Proxy");
//			serviceMonitorClient = ProxyFactory.createProxy(
//					ServiceMonitorClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//
//		try {
//			String strSwitch = PropertiesUtil.getPropertyValue(
//					"ice.properties", "Switch.Proxy");
//			switchesClient = ProxyFactory.createProxy(SwitchesClient.class,
//					strSwitch,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"DepartmentServer.Proxy");
//			departmentClient = ProxyFactory.createProxy(DepartmentClient.class,
//					str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"RightsManager.Proxy");
//			rightsClient = ProxyFactory.createProxy(RightsClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"RoleManager.Proxy");
//			roleClient = ProxyFactory.createProxy(RoleClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"FirewallManager.Proxy");
//			firewallClient = ProxyFactory.createProxy(FirewallClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"LoadBalanceManager.Proxy");
//			loadBalanceClient = ProxyFactory.createProxy(LoadBalanceClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"SecurityGroupManager.Proxy");
//			securityGroupClient = ProxyFactory.createProxy(SecurityGroupClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"SceneManager.Proxy");
//			sceneClient = ProxyFactory.createProxy(SceneClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
//		try {
//			String str = PropertiesUtil.getProperty(properties,
//					"RemoteManager.Proxy");
//			remoteClient = ProxyFactory.createProxy(RemoteClient.class, str,strFile);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//			e.printStackTrace();
//		}
	}

//	public synchronized static ExpClient getExpClient() {
//		if (expClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"ExptManager.Proxy");
//				expClient = ProxyFactory.createProxy(ExpClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//		}
//		return expClient;
//	}
//
//	public synchronized static KLlogClient getLogClient() {
//		if (logClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"LoggerManager.Proxy");
//				logClient = ProxyFactory.createProxy(KLlogClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//		}
//		return logClient;
//	}
//
	public synchronized static ServerClient getServerClient() {
		if (serverClient == null) {
			try {
				String str = PropertiesUtil.getProperty(properties,
						"ServerClient");
				serverClient = ProxyFactory
						.createProxy(ServerClient.class, str,strFile);
			} catch (Exception e) {
				//logger.error(e.getMessage());
				System.out.println(e.getMessage());
				e.printStackTrace();
			}
		}
		return serverClient;
	}
//
//	public synchronized static TopoClient getTopoClient() {
//		if (topoClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"TopoManager.Proxy");
//				topoClient = ProxyFactory.createProxy(TopoClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//		}
//		return topoClient;
//	}
//
//	public synchronized static UPRelativeClient getUpRelativeClient() {
//		if (upRelativeClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"UPRelativeManager.Proxy");
//				upRelativeClient = ProxyFactory.createProxy(
//						UPRelativeClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//		}
//		return upRelativeClient;
//	}
//
//	public synchronized static VolumeClient getVolumeClient() {
//		if (volumeClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"VolumeManager.Proxy");
//				volumeClient = ProxyFactory
//						.createProxy(VolumeClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//
//		}
//		return volumeClient;
//	}
//
//	public synchronized static ImageClient getImageClient() {
//		if (imageClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"ImageManager.Proxy");
//				imageClient = ProxyFactory.createProxy(ImageClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//		}
//		return imageClient;
//	}
//
//	public synchronized static AlarmClient getAlarmClient() {
//		if (alarmClient == null) {
//			try {
//				String strAlarm = PropertiesUtil.getPropertyValue(
//						"ice.properties", "Alarm.Proxy");
//				alarmClient = ProxyFactory.createProxy(AlarmClient.class,
//						strAlarm);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//		}
//		return alarmClient;
//	}
//
//	public synchronized static MessageClient getMessageClient() {
//		if (messageClient == null) {
//			try {
//				String strMsg = PropertiesUtil.getPropertyValue(
//						"ice.properties", "MessageManager.Proxy");
//				messageClient = ProxyFactory.createProxy(MessageClient.class,
//						strMsg);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//
//		}
//		return messageClient;
//	}
//
//	public synchronized static UserClient getUserClient() {
//		if (userClient == null) {
//			try {
//				String strUser = PropertiesUtil.getPropertyValue(
//						"ice.properties", "UserManager.Proxy");
//				userClient = ProxyFactory
//						.createProxy(UserClient.class, strUser);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//
//		}
//		return userClient;
//	}

//	public synchronized static HostMonitorClient getHostMonitorClient() {
//		if (hostMonitorClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"HostMonitor.Proxy");
//				hostMonitorClient = ProxyFactory.createProxy(
//						HostMonitorClient.class, str,strFile);
//			} catch (Exception e) {
//				//logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//
//		}
//		return hostMonitorClient;
//	}

//	public synchronized static ServiceMonitorClient getServiceMonitorClient() {
//		if (serviceMonitorClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"ServerMonitor.Proxy");
//				serviceMonitorClient = ProxyFactory.createProxy(
//						ServiceMonitorClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//
//		}
//		return serviceMonitorClient;
//	}
//
//	public synchronized static SwitchesClient getSwitchesClient() {
//		if (switchesClient == null) {
//			try {
//				String strSwitch = PropertiesUtil.getPropertyValue(
//						"ice.properties", "Switch.Proxy");
//				switchesClient = ProxyFactory.createProxy(SwitchesClient.class,
//						strSwitch);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//
//		}
//		return switchesClient;
//	}
//
//	public synchronized static DepartmentClient getDepartmentClient() {
//		if (departmentClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"DepartmentServer.Proxy");
//				departmentClient = ProxyFactory.createProxy(
//						DepartmentClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//
//		}
//		return departmentClient;
//	}
//
//	public synchronized static RightsClient getRightsClient() {
//		if (rightsClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"RightsManager.Proxy");
//				rightsClient = ProxyFactory
//						.createProxy(RightsClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//
//		}
//		return rightsClient;
//	}
//
//	public synchronized static RoleClient getRoleClient() {
//		if (roleClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"RoleManager.Proxy");
//				roleClient = ProxyFactory.createProxy(RoleClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//		}
//		return roleClient;
//	}
//
//	public synchronized static FirewallClient getFirewallClient() {
//		if (roleClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"FirewallManager.Proxy");
//				firewallClient = ProxyFactory.createProxy(FirewallClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//		}
//		return firewallClient;
//	}
//
//	public synchronized static LoadBalanceClient getLoadBalanceClient() {
//		if (roleClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"LoadBalanceManager.Proxy");
//				loadBalanceClient = ProxyFactory.createProxy(LoadBalanceClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//		}
//		return loadBalanceClient;
//	}
//
//	public synchronized static SecurityGroupClient getSecurityGroupClient() {
//		if (roleClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"SecurityGroupManager.Proxy");
//				securityGroupClient = ProxyFactory.createProxy(SecurityGroupClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//		}
//		return securityGroupClient;
//	}
//
//	public synchronized static SceneClient getSceneClient() {
//		if (sceneClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"SceneManager.Proxy");
//				sceneClient = ProxyFactory.createProxy(SceneClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//		}
//		return sceneClient;
//	}
//
//	public synchronized static RemoteClient getRemoteClient() {
//		if (remoteClient == null) {
//			try {
//				String str = PropertiesUtil.getProperty(properties,
//						"RemoteManager.Proxy");
//				remoteClient = ProxyFactory.createProxy(RemoteClient.class, str,strFile);
//			} catch (Exception e) {
//				logger.error(e.getMessage());
//				e.printStackTrace();
//			}
//		}
//		return remoteClient;
//	}
}

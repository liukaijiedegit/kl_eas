package com.client;

//import org.apache.log4j.Logger;

import com.lib.kun.expt.serverIce.IServerSchedulerPrx;
import com.lib.kun.expt.serverIce.IServerSchedulerPrxHelper;
import org.springframework.stereotype.Service;

@Service
public class ServerClient extends BaseClient {
	//private static Logger logger = Logger.getLogger(ServerClient.class);

    public ServerClient(){
        super("", "");
    }
    protected ServerClient(String _config,String cfgFile) {
		super(_config,cfgFile);
		// TODO Auto-generated constructor stub
	}

	private static IServerSchedulerPrx _proxyServerSchedulerPrx;

	public int run() {
		_proxyServerSchedulerPrx = IServerSchedulerPrxHelper
				.checkedCast(communicator.stringToProxy(endpoint));
		if (_proxyServerSchedulerPrx == null) {
			//logger.error("exptManagerClient 启动失败");
			System.out.println("exptManagerClient 启动失败");
			return -1;
		}
		setObjectPrx(_proxyServerSchedulerPrx);
		return 10;
	}

	/**
	 * 启动
	 * @param json
	 * @return 
	 */
//	public String startServer(String json,Integer expId, String username){
//		logger.info("调用startServer方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.startServer(json,expId, username);
//		}
//		return "0";
//	}
//	/**
//	 * 停止
//	 * @param json
//	 */
//	public String stopServer(String json,Integer expId, String username){
//		logger.info("调用stopServer方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.stopServer(json,expId, username);
//		}
//		return "0";
//	}
//	/**
//	 * 重启
//	 * @param json
//	 */
//	public String restartServer(String json,Integer expId, String username){
//		logger.info("调用restartServer方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.restartServer(json,expId, username);
//		}
//		return "0";
//	}
//
//	/**
//	 * 保存快照
//	 * @param json
//	 */
//	public String holdServer(String json,Integer expId,  String username){
//		logger.info("调用holdServer方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.holdServer(json,expId, username);
//		}
//		return "0";
//	}
//	/**
//	 * 恢复快照
//	 * @param json
//	 */
//	public String restoreServer(String json,Integer expId, String username){
//		logger.info("调用restoreServer方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.restoreServer(json,expId, username);
//		}
//		return "0";
//	}
//
//	/**
//	 * 暂停
//	 * @param json
//	 */
//	public String pauseServer(String json,Integer expId, String username){
//		logger.info("调用pauseServer方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.pauseServer(json,expId, username);
//		}
//		return "0";
//	}
//	/**
//	 * 继续
//	 * @param json
//	 */
//	public String continueServer(String json,Integer expId, String username){
//		logger.info("调用continueServer方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.continueServer(json,expId, username);
//		}
//		return "0";
//	}
//
//	/**
//	 * 挂起
//	 * @param json
//	 */
//	public String suspendServer(String json,Integer expId, String username){
//		logger.info("调用suspendServer方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.suspendServer(json,expId, username);
//		}
//		return "0";
//	}
//	/**
//	 * 唤醒
//	 * @param json
//	 */
//	public String arouseServer(String json,Integer expId, String username){
//		logger.info("调用arouseServer方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.arouseServer(json,expId, username);
//		}
//		return "0";
//	}
//	/**
//	 * 重建云主机
//	 * @param json
//	 */
//	public String rebuild(String json,Integer expId, String username){
//		logger.info("调用rebuild方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.rebuild(json,expId, username);
//		}
//		return "0";
//	}
//	/**
//	 *	进入云桌面
//	 * @param json
//	 */
//	public String cloudDesktop(String json,Integer expId, String username){
//		logger.info("调用cloudDesktop方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.cloudDesktop(json,expId, username);
//		}
//		return "0";
//	}
//
//
//	/**
//	 * 添加网卡
//	 * @author luzh
//	 * @date 2015-7-8 下午6:26:31
//	 * @param json
//	 * @param username
//	 * @return
//	 */
//	public String addInterfaceToServer(String json,Integer expId, String username) {
//		logger.info("调用addInterfaceToServer方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.addInterfaceToServer(json,expId, username);
//		}
//		return "0";
//	}
//	/**
//	 * 删除网卡
//	 * @author luzh
//	 * @date 2015-7-8 下午6:27:22
//	 * @param json
//	 * @param username
//	 * @return
//	 */
//	public String delInterfaceFromServer(String json,Integer expId, String username) {
//		logger.info("调用delInterfaceFromServer方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.delInterfaceFromServer(json,expId, username);
//		}
//		return "0";
//	}
//	/**
//	 * 添加浮动Ip
//	 * @author luzh
//	 * @date 2015-7-8 下午6:27:48
//	 * @param json
//	 * @param username
//	 * @return
//	 */
//	public String addFloatIp(String json,Integer expId, String username) {
//		logger.info("调用addFloatIp方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.addFloatIp(json,expId, username);
//		}
//		return "0";
//	}
//	/**
//	 * 删除浮动Ip
//	 * @author luzh
//	 * @date 2015-7-8 下午6:28:11
//	 * @param json
//	 * @param username
//	 * @return
//	 */
//	public String delFloatIp(String json,Integer expId, String username) {
//		logger.info("调用delFloatIp方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.delFloatIp(json,expId, username);
//		}
//		return "0";
//	}
//	/**
//	 * 修改云主机
//	 * @author luzh
//	 * @date 2015-7-9 上午10:16:21
//	 * @param json
//	 * @param response
//	 * @param request
//	 * @return
//	 * @return
//	 */
//	public String updateServer(String json,Integer expId, String username) {
//		logger.info("调用updateServer方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.updateServer(json,expId, username);
//		}
//		return "0";
//	}
//	/**
//	 * 获取浮动Ip
//	 * @author luzh
//	 * @date 2015-7-9 上午10:16:21
//	 * @param json
//	 * @param response
//	 * @param request
//	 * @return
//	 * @return
//	 */
//	public String getFloatIp(String json,Integer expId, String username) {
//		logger.info("调用getFloatIp方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.getFloatIp(json,expId, username);
//		}
//		return "0";
//	}

//	public String getServerListByExpId(Integer expId, String username) {
//		logger.info("调用getServerListByExpId方法，传入参数："+expId);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.getServerListByExpId(expId, username);
//		}
//		return "";
//	}
//	public String getServerListByPage(String json,Integer expId,String username) {
//		logger.info("调用getServerListByPage方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.getServerList(json,expId,username);
//		}
//		return "";
//	}
//
//	public String deleteSnapshot(String ids, Integer expId, String username) {
//		logger.info("调用deleteSnapshot方法，传入参数："+ids);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.deleteSnapshot(ids,expId,username);
//		}
//		return "0";
//	}
//
//	public String removal(String json, Integer expId, String username) {
//		logger.info("调用removal方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.removal(json,expId,username);
//		}
//		return "0";
//	}
//
//	public String getHostList(String json, Integer expId, String username) {
//		logger.info("调用getHostList方法，传入参数："+json+",expId:"+expId+",username:"+username);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.getHostList(json,expId,username);
//		}
//		return "";
//	}
//
//	public String getServerById(Integer id, Integer expId, String username) {
//		logger.info("调用getServerById方法，传入参数："+id);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.getServerById(id,expId,username);
//		}
//		return "";
//	}
//	/**
//	 * 根据uuid获取云主机详情
//	 * @auther luzh
//	 * @param id
//	 * @param response
//	 * @param request
//	 * @return
//	 */
//	public String getServerByUUId(String uuid, Integer expId, String username) {
//		logger.info("调用getServerByUUId方法，传入参数："+uuid);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.getServerByUUId(uuid,expId,username);
//		}
//		return "{}";
//	}
//	public String delFloatIpByExp(Integer expId, String username) {
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.delFloatIpByExp(expId,username);
//		}
//		return "0";
//	}
//
//	public String getServerBySubNetOpsId(String opsid, Integer expId,
//			String username) {
//		logger.info("调用getServerBySubNetOpsId方法，传入参数："+opsid);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.getServerBySubNetOpsId(opsid,expId,username);
//		}
//		return "";
//	}
//
//	public String updateBandwidthByUUid(String json, Integer expId,
//			String username) {
//		logger.info("调用updateBandwidthByUUid方法，传入参数："+json);
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.updateBandwidthByUUid(json,expId,username);
//		}
//		return "0";
//	}
	
	/**
	 * 
	 * @auther wusj
	 * 创建时间: 2015-8-31 
	 * 描述:获取虚拟机使用率 
	 * 返回值(String):
	 */
	public String getInstanceUsage(String uuid)
	{
		if(_proxyServerSchedulerPrx!=null){
			return _proxyServerSchedulerPrx.getInstanceUsage(uuid);
		}
		return "error";
	}
	
//	/**
//	 *
//	 * @auther wusj
//	 * 创建时间: 2015-8-31
//	 * 描述:获取所有的虚拟机信息
//	 * 返回值(String):
//	 */
	public String getInstanceList()
	{
		if(_proxyServerSchedulerPrx!=null){
			return _proxyServerSchedulerPrx.getServers();
		}
		return "error";
	}
//	/**
//	 * 用户协作云主机列表
//	 * @param expId
//	 * @param username
//	 * @return
//	 */
//	public String getCloudDesktopServers(Integer expId, String username) {
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.getCloudDesktopServers(expId,username);
//		}
//		return "[]";
//	}
//	/**
//	 * 获取某用户对某一实验能访问的云主机列表
//	 * @param uname
//	 * @param response
//	 * @param request
//	 * @return
//	 */
//	public String getCloudDesktopServersByExpId(String uname, Integer expId,
//			String username) {
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.getCloudDesktopServersByExpId(uname,expId,username);
//		}
//		return "[]";
//	}
//	/**
//	 * 验证云主机名称是否存在
//	 * @param servername
//	 * @param expId
//	 * @param username
//	 * @return
//	 */
//	public String serverExists(String servername, Integer expId, String username) {
//		if(_proxyServerSchedulerPrx!=null){
//			return _proxyServerSchedulerPrx.serverExists(servername,expId,username);
//		}
//		return null;
//	}
}

package com.client;
import com.lib.kun.hostMonitor.IHostMonitorPrx;
import com.lib.kun.hostMonitor.IHostMonitorPrxHelper;
import org.springframework.stereotype.Service;

@Service
public class HostMonitorClient extends BaseClient{

    public HostMonitorClient(){
        super("", "");
    }
	
	protected HostMonitorClient(String _endpoint, String _cfgFile) {
		super(_endpoint, _cfgFile);
		// TODO Auto-generated constructor stub
	}

	//private static Logger logger=Logger.getLogger(HostMonitorClient.class);
	
	private static IHostMonitorPrx iHostMonitorPrx;


	@Override
	protected int run() {
		iHostMonitorPrx = IHostMonitorPrxHelper.checkedCast(communicator.stringToProxy(endpoint));
		if(iHostMonitorPrx==null)
		{		
			//logger.error("HostMonitorClient 启动失败");
			System.out.println("HostMonitorClient 启动失败");
			return -1;
		}		
		setObjectPrx(iHostMonitorPrx);
		return 10;
	}

	public String getHostStatus(String hostIp) {
		return iHostMonitorPrx.getHostStatus(hostIp);
	}

	
	
	public String getAllHosts() {
		return iHostMonitorPrx.getAllHosts();
	}
	
	public String getHosts() {
		return iHostMonitorPrx.getHosts();
	}

	public void stopHost(String hostIp) {
		iHostMonitorPrx.stopHost(hostIp);
	}

	public void startHost(String hostIp) {
		iHostMonitorPrx.startHost(hostIp);
	}

	public void restart(String hostIp) {
		iHostMonitorPrx.restart(hostIp);
	}
	
	/**
	 * 获取计算资源统计信息
	 */
	public String getHyperStats() {
		return iHostMonitorPrx.getHyperStats();		
	}

	/**
	 * 获取计算节点下虚拟机列表
	 */
	public String getInstancesInHost(String hostName) {
		
		return iHostMonitorPrx.getInstancesInHost(hostName);		
	}
	
	public String getHyperDetail() {
		return iHostMonitorPrx.getHyperDetail();
	}

	public String getHostUse(String ip) {
		return iHostMonitorPrx.getHostUse(ip);
	}
}

package com.client;

import java.util.HashMap;
import java.util.Map;

import Ice.InitializationData;

public abstract class BaseClient{

	protected String endpoint="";//服务器节点路径配置信息
	protected String cfgFile="";//服务器节点配置信息
	protected Ice.Communicator communicator=null;//当前客户端对应的连接

	private Boolean flag=false;//是否启动心跳，保持长连接
	private Thread heartBeatThread;//心跳线程
	private Ice.ObjectPrx objPrx;//代理对象

	//此客户端自身特有属性
	public Map<String, String> context=new HashMap<String, String>();

	protected BaseClient(String _endpoint,String _cfgFile)
	{
		endpoint=_endpoint;
		cfgFile=_cfgFile;
	}

	
	/*
	 * 创建代理逻辑
	 * */
	protected abstract int run();

	/*
	 * 设置代理对象
	 * */
	protected void setObjectPrx(Ice.ObjectPrx objPrx)
	{
		this.objPrx=objPrx;
	}

	protected Ice.ObjectPrx getObjPrx() {
		return objPrx;
	}

	synchronized protected int init()
	{
		int result =0;
		initCommunicator();

		result=this.run();

		if(result>0)
		{
			heartBeat(true);
		}

		return result;
	}

	/*
	 * 初始化通信参数
	 */
	protected void initCommunicator()
	{
		if(cfgFile!=""){
			Ice.Properties pro=Ice.Util.createProperties();
			pro.load(cfgFile);
			InitializationData initData=new InitializationData();
			initData.properties=pro;
			communicator=Ice.Util.initialize(initData);
		}
		else
		{
			String[] str=new String[]{};			
			communicator=Ice.Util.initialize(str);
		}
	}

	/*
	 * 启动或者停止心跳包
	 * Boolean bl:true表示启动心跳，false表示停止心跳
	 * */
	private void heartBeat(Boolean bl)
	{
		if(heartBeatThread==null)
		{
			heartBeatThread=new Thread(new Runnable() {
				@Override
				public void run() {
					while(flag){
						try {
							Thread.sleep(1000*5);
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						
						try{
							objPrx.ice_ping();
						}
						catch(Exception e)//通信器断开之后重新连接
						{	
							break;
						}						
					}
					if(flag){
						BaseClient.this.init();//重新初始化客户端						
					}
				}
			});
			heartBeatThread.setDaemon(true);//设置线程为后台线程
		}
		if(bl){
			flag=true;
			if(!heartBeatThread.isAlive()){
				heartBeatThread.start();}
		}
		else
		{
			flag=false;
		}
	}

	/*
	 * 断开客户端连接
	 */
	public void close()
	{
		flag=false;	
		if(communicator!=null){
			communicator.destroy();
		}		
	}

	@Override
	protected void finalize()
	{
		close();
	}
}

package cn.kl.eas.ws;

import cn.kl.eas.analyse.AnalyseConfig;
import cn.kl.eas.dao.IDataSourceRepo;
import cn.kl.eas.entity.DataSource;
import cn.kl.rabbitmq.MqUtil;
import cn.kl.rabbitmq.callbackInterface.IKLListener;
import cn.kl.rabbitmq.config.RabbitConfig;
import cn.kl.rabbitmq.enums.RabbitMqExchangeType;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Created by kl272 on 2017/6/20.
 */
@Component
public class MqHeartBeat implements IKLListener, ApplicationListener<ContextRefreshedEvent> {

    public static final Logger LOGGER = LoggerFactory.getLogger(MqHeartBeat.class);

    private static final long DELAY =0;
    private static final long PERIOD =1000*5;

    private static Map<String, Long> timeMap;

    private static Map<String, Boolean> activeMap;

    @Autowired
    private RabbitConfig rabbitConfig;

    @Autowired
    private AnalyseConfig analyseConfig;

    @Autowired
    private IDataSourceRepo iDataSourceRepo;

    @Autowired
    private WsSender wsSender;

    private MqUtil mqUtil;

    /**
     * 初始化该类，创建心跳队列
     */
    private void init() {

        timeMap = new HashMap<String, Long>();
        activeMap = new HashMap<String, Boolean>();

        //建立连接
        mqUtil = new MqUtil(rabbitConfig);
        mqUtil.connect().createChannel();

        //初始化activeMap
        List<DataSource> dataSourceList = iDataSourceRepo.findAll();

        for ( DataSource dataSource : dataSourceList) {
            activeMap.put(dataSource.getToken(), false);
        }


        mqUtil.setListener(this);
        mqUtil.BlockReceive(analyseConfig.getHeartBeatQueue(), "");

        Timer timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            public void run() {
                heartBeat();
            }
        }, DELAY, PERIOD);
    }

    @Override
    public void callback(String s) {
        //LOGGER.info("接收到心跳");
        JSONObject beat_data = JSON.parseObject(s);
        String id = beat_data.getString("ID");
        //本次心跳到达时携带时间
        Long beat_time = beat_data.getLong("Time");

        //上次心跳到达时本地时间
        long local_time = 0;
        //上次心跳与当前心跳时差
        long diff_time = 0;

        // 1. 比对 timeMap 中 list 中的 local_time 和 cur_time 的差值

        //本次心跳到达时本地时间
        long cur_time = System.currentTimeMillis() / 1000;
        synchronized (this) {
            if (timeMap.containsKey(id)) {
                local_time = (long)timeMap.get(id);
                diff_time = Math.abs(cur_time - local_time);

                if (diff_time >= 4 && diff_time <= 6  ) {
                    //这是个正常心跳
                    activeMap.put(id, true);
                }
                else if (diff_time < 4) {
                    //处理时间间隔太短，正常心跳不这样啊
                    activeMap.put(id, false);
                }
                else {
                    //时间间隔太长了， 这就有推送ws的计时器处理了
                    //理论上不会执行到这的
                }
            }
            else {
                timeMap.put(id, cur_time);
                activeMap.put(id, false);
            }

            timeMap.put(id, cur_time);
        }
    }

    private void heartBeat() {
        synchronized (this) {
            for ( Map.Entry<String, Boolean> it : activeMap.entrySet() ) {
                //如果为false则不用处理，直接发送状态
                //false改为true时，由接收rabbitmq心跳的回调函数处理
                Boolean bStatus = false;
                if ( it.getValue() ) {
                    long time = timeMap.get(it.getKey());

                    long cur_time = System.currentTimeMillis() / 1000;
                    if ( (cur_time - time) > 6 ) {
                        activeMap.put(it.getKey(), false);
                    }
                    else {
                        bStatus = true;
                    }
                }

                JSONObject jMsg = new JSONObject();
                jMsg.put("token", it.getKey());
                jMsg.put("status", bStatus);

                try {
                    wsSender.sendMsg("/topic/kl_eas", jMsg.toJSONString());
                }
                catch (Exception e) {
                    LOGGER.error("心跳发送失败:" + jMsg.toJSONString());
                    LOGGER.error("心跳发送失败:" + e.getMessage());
                }
            }
        }

        //LOGGER.info("心跳状态：" + activeMap);
    }



    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (event.getApplicationContext().getParent() == null) {
            System.out.println("=========== init MqHeartBeat ==========");
            MqHeartBeat mqHeartBeat = event.getApplicationContext().getBean(MqHeartBeat.class);
            mqHeartBeat.init();
        }
    }

}

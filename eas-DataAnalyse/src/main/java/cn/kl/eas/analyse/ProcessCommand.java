package cn.kl.eas.analyse;

import cn.kl.rabbitmq.MqUtil;
import cn.kl.rabbitmq.callbackInterface.IKLListener;
import cn.kl.rabbitmq.config.RabbitConfig;
import cn.kl.rabbitmq.enums.RabbitMqExchangeType;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;


import java.util.List;

/**
 * Created by Administrator on 2017/6/7.
 */
@Component
public class ProcessCommand implements IKLListener, ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private RabbitConfig rabbitConfig;

    @Autowired
    private AnalyseConfig  analyseConfig;

    //要解析的事件列表
    @Autowired
    EventList eventList;

    private MqUtil mqUtil;

    public void start() {
        mqUtil = new MqUtil(rabbitConfig);
        mqUtil.connect().createChannel();

        mqUtil.declareExchange(analyseConfig.getCommandExchange(), RabbitMqExchangeType.FANOUT, true);
        mqUtil.declareQueue(analyseConfig.getCommandQueue(), true, false, false, null);
        mqUtil.bindExQueue(analyseConfig.getCommandExchange(), analyseConfig.getCommandQueue(), analyseConfig.getCommandRouting());

        mqUtil.setListener(this);
        mqUtil.BlockReceive(analyseConfig.getCommandQueue(), "");
    }


    @Override
    public void callback(String data) {
        //收到前端发送的开始解析命令

        //解析命令
        JSONObject jData = JSON.parseObject(data);
        String project = jData.getString("Project");
        String cmd = jData.getString("Command");

        if (cmd.equals("START")) {
            //开始命令

            //获取此项目要解析的事件列表
            String jEvents = jData.getString("EventList");
            List<String> events = JSONObject.parseArray(jEvents, String.class);

            //将事件加入到  要解析的事件列表 中
            for (String eventID : events) {
                eventList.add(eventID, project);
            }
        }
        else if (cmd.equals("END")) {
            eventList.delete(project);
        }

        System.out.println(eventList.getEvents().toString());

    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (event.getApplicationContext().getParent() == null) {
            System.out.println("=========== init ProcessCommand ==========");
            ProcessCommand command = event.getApplicationContext().getBean(ProcessCommand.class);
            command.start();
        }
    }
}

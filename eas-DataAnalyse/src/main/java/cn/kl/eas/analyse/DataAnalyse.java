package cn.kl.eas.analyse;

import cn.kl.eas.dao.IDataRepo;
import cn.kl.eas.entity.Data;
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

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

/**
 * Created by Administrator on 2017/6/7.
 */
@Component
public class DataAnalyse implements IKLListener, ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private RabbitConfig rabbitConfig;

    @Autowired
    private AnalyseConfig analyseConfig;

    @Autowired
    IDataRepo iDataRepo;

    private MqUtil mqData;

    @Autowired
    private RuleMap ruleMap;

    //需要匹配的事件--由激活时，系统发送命令生成
    @Autowired
    EventList eventList;

    public void start() {
        mqData = new MqUtil(rabbitConfig);
        mqData.connect().createChannel();

        mqData.declareExchange(analyseConfig.getDataExchange(), RabbitMqExchangeType.FANOUT, true);
        mqData.declareQueue(analyseConfig.getDataQueue(), true, false, false, null);
        mqData.bindExQueue(analyseConfig.getDataExchange(), analyseConfig.getDataQueue(), analyseConfig.getDataRouting());

        mqData.setListener(this);
        mqData.BlockReceive(analyseConfig.getDataQueue(), "");
    }

    private String getOneValue(JSONObject jKey, JSONObject jData) {
        switch (jKey.getInteger("type")) {
            case 0:
            case 1: {
                String expectKey = jKey.getString("key");
                String dataValue = jData.getString(expectKey);
                return dataValue;
            }
            case 2: {
                String expectKey = jKey.getString("key");
                JSONArray jData_arr = jData.getJSONArray(expectKey);
                jKey= jKey.getJSONObject("keys");
                for (Object data_object:jData_arr){
                    String oneValue = getOneValue(jKey,(JSONObject)data_object);
                    if(oneValue!=null){
                        return oneValue;
                    }
                }

            }
        }

        return null;
    }

    private boolean macthData(JSONObject jField, JSONObject jData) throws InvocationTargetException, IllegalAccessException {
        switch (jField.getInteger("type")) {
            case 0:
            case 1:
                String expectKey = jField.getString("key");
                String dataValue = jData.getString(expectKey);
                if (dataValue == null) {
                    return false;
                }
                String expectValue = jField.getString("value");

                Method method = ruleMap.getMethod(jField.getString("MatchRules"));

                if ( method == null ) {
                    System.out.println("规则: " + jField.getString("MatchRules") + "不存在");
                    return false;
                }

                if (  ! (Boolean) method.invoke(null,
                        dataValue,
                        expectValue) ) {
                    return false;
                }
                break;

            case 2:
                for (Object field : jField.getJSONArray("keys")) {
                    JSONObject jTmpField = (JSONObject)field;
                    boolean macthret=false;
                    for(Object objectDate : jData.getJSONArray(jField.getString("key"))){
                        if ( macthData(jTmpField, (JSONObject)objectDate) ) {
                            macthret=true;
                        }
                    }
                    return macthret;

                }
                break;
            default:
                return false;
        }
        return  true;
    }


    @Override
    public void callback(String data) {

        //收到的采集服务发来的数据包--经过自己的处理的数据
        JSONObject jKLData = JSON.parseObject(data);

        //采集agent的数据--第三方采集公司
        JSONObject jData = JSON.parseObject(jKLData.getString("data"));

        //将DataSource加入到数据中
        jData.put("DataSource", jKLData.getString("DataSource"));


        //分析后的数据
        JSONObject msg = null;

        List<String> events = eventList.getEvents();


        //开始匹配所有事件
        for (String event : events) {
            //事件信息
            JSONObject jEvent = JSON.parseObject(event);

            //事件匹配规则
            JSONArray jMC = JSON.parseArray(jEvent.getString("MatchCondition"));

            boolean bFlag = true;

            for (Object obj : jMC) {
                JSONObject jField = (JSONObject) obj;

                try {
                    //匹配失败
                    if ( !macthData(jField, jData) ) {
                        bFlag = false;
                        break;
                    }
                } catch (IllegalAccessException e) {
                    bFlag = false;
                    e.printStackTrace();
                    break;
                } catch (InvocationTargetException e) {
                    bFlag = false;
                    e.printStackTrace();
                    break;
                } catch (Exception e) {
                    bFlag = false;
                    e.printStackTrace();
                    break;
                }
            }

            if (bFlag) {
                //匹配成功 组要发送的数据
                msg = new JSONObject();
                msg.put("EventID", jEvent.getString("EventID"));
                String fromField = jEvent.getString("FromField");
                String from = null;
                if ( !fromField.equals("") ) {
                    JSONObject jFromField = JSON.parseObject(fromField);
                    from = getOneValue(jFromField, jData);
                    if (from == null) {
                        from = "";
                    }
                }

                msg.put("From", from);

                String toField = jEvent.getString("ToField");;
                JSONObject jToField = JSON.parseObject(toField);
                String to = getOneValue(jToField, jData);
                msg.put("To", to);
                msg.put("Time", jKLData.getString("Time"));
                msg.put("Content", jEvent.getString("Content"));
                break;
            }
        }

        //推送数据
        if (msg != null) {
            String eventID = msg.getString("EventID");
            List<String> projects = eventList.getProjects(eventID);

            for (String project : projects) {
                mqData.send(msg.toJSONString(), project, "");
                System.out.println(msg.toJSONString() + "  已发送");
            }
        }

        Data eData = JSONObject.parseObject(data, Data.class);
        iDataRepo.save(eData);
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (event.getApplicationContext().getParent() == null) {
            System.out.println("=========== init DataAnalyse ==========");
            DataAnalyse analyse = event.getApplicationContext().getBean(DataAnalyse.class);
            analyse.start();
        }
    }

}

package cn.kl.eas.ws;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by kl272 on 2017/4/25.
 */
@Component
public class WsSender {

    @Autowired
    //使用SimpMessagingTemplate 向浏览器发送消息
    private SimpMessagingTemplate template;

    /**
     * @param des 目的地址
     * @param msg 广播内容
     * @throws Exception
     */
    public void sendMsg(String des,String msg) {
        //System.out.println("send msg: " + msg);
        template.convertAndSend(des, new WsResponse(msg));
    }

}


package cn.kl.eas.ws;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;


/**
 * Created by kl272 on 2017/4/24.
 * WebSocket相关的
 */
@Controller
public class WsReceiver {


    /**
     * 心跳接收
     */
    @MessageMapping("/topic/kl_eas/heart_beat")
    public WsResponse heartbeat() {
        //TODO
        System.out.println("heart on beating... " + System.currentTimeMillis());
        return null;
    }


    /**
     * 订阅
     */
    @SubscribeMapping("/topic/kl_eas")
    public WsResponse sub() {
        return new WsResponse("Subscribe mapped!");
    }




}

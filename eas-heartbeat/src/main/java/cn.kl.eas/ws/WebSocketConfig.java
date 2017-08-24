package cn.kl.eas.ws;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

/**
 * Created by Administrator on 2017/6/20.
 */

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

    /*
     * 注册协议节点，并映射指定的url
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //注册一个STOMP协议的endpoint，并指定SockJS协议
        registry.addEndpoint("/endpointWisely")
                .withSockJS();
        registry.addEndpoint("/asd");
    }


    /**
     * broker -- 配置消息代理
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        //广播式应配置一个/topic消息代理
        registry.enableSimpleBroker("/topic");

        //应用程序以/app为前缀
        // js.url = "/spring13/app/hello" -> @MessageMapping("/hello") 注释的方法.
//        registry.setApplicationDestinationPrefixes("/app");
    }


}

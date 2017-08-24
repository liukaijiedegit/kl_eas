package cn.kl.eas.analyse;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created by kl272 on 2017/6/9.
 */
@Component
@ConfigurationProperties(prefix = "queueConfig")
public class AnalyseConfig {
    private String commandExchange;
    private String commandQueue;
    private String commandRouting;
    private String dataExchange;
    private String dataQueue;
    private String dataRouting;
    private String heartBeatExchange;
    private String heartBeatQueue;
    private String heartBeatRouting;

    public String getHeartBeatExchange() {
        return heartBeatExchange;
    }

    public void setHeartBeatExchange(String heartBeatExchange) {
        this.heartBeatExchange = heartBeatExchange;
    }

    public String getHeartBeatQueue() {
        return heartBeatQueue;
    }

    public void setHeartBeatQueue(String heartBeatQueue) {
        this.heartBeatQueue = heartBeatQueue;
    }

    public String getHeartBeatRouting() {
        return heartBeatRouting;
    }

    public void setHeartBeatRouting(String heartBeatRouting) {
        this.heartBeatRouting = heartBeatRouting;
    }

    public String getCommandExchange() {
        return commandExchange;
    }

    public void setCommandExchange(String commandExchange) {
        this.commandExchange = commandExchange;
    }

    public String getCommandQueue() {
        return commandQueue;
    }

    public void setCommandQueue(String commandQueue) {
        this.commandQueue = commandQueue;
    }

    public String getCommandRouting() {
        return commandRouting;
    }

    public void setCommandRouting(String commandRouting) {
        this.commandRouting = commandRouting;
    }

    public String getDataExchange() {
        return dataExchange;
    }

    public void setDataExchange(String dataExchange) {
        this.dataExchange = dataExchange;
    }

    public String getDataQueue() {
        return dataQueue;
    }

    public void setDataQueue(String dataQueue) {
        this.dataQueue = dataQueue;
    }

    public String getDataRouting() {
        return dataRouting;
    }

    public void setDataRouting(String dataRouting) {
        this.dataRouting = dataRouting;
    }
}

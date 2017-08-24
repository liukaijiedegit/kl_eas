package cn.kl.eas.ws;

/**
 * Created by kl272 on 2017/4/24.
 * 服务器向浏览器发送的消息类
 */
public class WsResponse {

    private String msg;

    public WsResponse(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}

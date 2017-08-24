package cn.kl.eas.entity.webmsg;

/**
 * Created by kl272 on 2017/4/20.
 * http请求返回的最外层对象
 */
public class Result<T> {

    //请求状态
    private boolean state;

    //提示信息
    private String msg;

    //具体的返回值
    private T data;


    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }
}

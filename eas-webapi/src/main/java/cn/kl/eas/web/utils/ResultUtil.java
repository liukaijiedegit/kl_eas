package cn.kl.eas.web.utils;

import cn.kl.eas.entity.webmsg.Result;

/**
 * Created by kl272 on 2017/4/20.
 */
public class ResultUtil {

    public static Result success() {
        return success(null);
    }

    public static Result success(Object object) {
        Result result = new Result();
        result.setState(true);
        result.setMsg("success");
        result.setData(object);
        return result;
    }

    public static Result error(String msg) {
        Result result = new Result();
        result.setState(false);
        result.setMsg(msg);
        return result;
    }



}
